# Implementation Plan: Antok Phrases

## Technical Context

| Area | Choice | Notes |
| --- | --- | --- |
| Runtime | Vanilla ES modules, HTML, CSS | Static GitHub Pages compatible. |
| Sync | PeerJS over WebRTC | Same Host/Display structure as Emoji Says. |
| State | Host-authoritative in memory | Display receives redacted snapshots only. |
| Tests | `node --test` | Pure rules engine tests in `tests/game.test.mjs`. |

## File Structure

```text
index.html             screens for Home, Setup, Host, Display, Game Over
css/styles.css         mobile Host and TV Display styling
js/game.js             pure rules engine
js/categories.js       built-in phonetic prompt/answer phrase cards
js/main.js             DOM rendering, setup, single play, Host actions, redacted sync
js/room.js             PeerJS wrapper
js/storage.js          localStorage setup defaults
tests/game.test.mjs    engine behavior tests
specs/001-...          SDD spec, plan, tasks
vendor/peerjs.min.js   vendored PeerJS client
```

## Data Model

Each puzzle is:

```js
{ prompt: 'WHY SO CEREAL', answer: 'WHY SO SERIOUS', difficulty: 'easy' }
```

The prompt is public phonetic gibberish. Players solve it by reading it aloud
and listening to what it sounds like, not by parsing its written meaning. The
answer is Host-only. Answer strings are restricted to A-Z plus spaces because
`maskedAnswer()` renders one tile per non-space character and spaces as word
breaks.

## Rules Engine

`createGame(settings, categoryPool, rng)` builds one deck from selected
categories: every puzzle from every selected category is pooled together and
shuffled as a whole with the injected RNG for testability, so difficulty is
mixed throughout instead of dealt in easy/medium/hard blocks.

The game phases are `lobby`, `playing`, and `gameover`. Every puzzle
transition goes through the same deal path so timer state always resets to
paused and no card repeats.

Letter hints reveal a random unrevealed non-space index. Awarding a point can
end the game immediately when Target Score is reached; otherwise it deals the
next card. Skipping and timer expiry never award points.

## Networking

The Host owns the full game state. Display clients only render snapshots:

```js
{
  phase,
  timerSeconds,
  timerStatus,
  timerDeadline,
  targetScore,
  teams,
  winner,
  puzzle: { prompt, categoryId, masked }
}
```

The raw answer is omitted from broadcasts. `masked` contains only revealed
letters and spaces.

## UI

Single mode is a one-device local play path: the answer stays hidden by
default, `Give Hint` calls the same `revealLetter()` rule as hosted play, and
`Got It` increments the solved score.

Host is optimized for a phone in the emcee's hand: setup cards, answer card,
phonetic prompt, masked tiles, timer, and large scoring controls.

Display is optimized for a shared screen: fixed score plaques, category,
timer, large phrase card, and answer-length tiles. When a timer is configured
but paused, the Display blurs the phrase card until the Host starts the timer.

## Validation

- `node --test tests/game.test.mjs`
- Manual static smoke test from a local HTTP server:
  - home screen loads without missing required assets
  - single mode starts without a room and Give Hint reveals a tile
  - Host setup opens a room
  - Display joins by code
  - prompt, masked tiles, scoring, skip, timer, and game over render correctly

## Changelog

- **v2** (2026-07-12): Content quality pass over all 72 phrase cards across
  all 6 categories. The prior version leaned on invented, ambiguous
  spellings (`SEER E US`, `FOURSS`, `CHALK LETS`, `MITE HEAR`) that don't
  map cleanly to a sound a Host can read aloud correctly, plus a handful of
  outright defects: `party-chaos-en`'s first entry (`WE DYNAMIC CUP PULL`
  for `WIN A MATCHING COUPLE`) didn't phonetically match its answer at all;
  `pinoy-party`'s `PAH KYN NAH` had an extra fragment not accounted for in
  its 2-word answer `KAIN NA`; `music-pop-en`'s "Dancing Queen" and
  `party-chaos-en`'s "Think Fast" entries had a prompt word that didn't
  correspond to any word in the answer (`QUEUE IN` vs `QUEEN`, `BLANK` vs
  `BLINK`); `pinoy-lines`' `TUBBY TUBBY POH` used the wrong vowel sound for
  `TABI TABI PO`. Rewrote every prompt to use real, plain words (or the
  game's own small set of established filler syllables — `duh`, `uh`, `ee`)
  so the Host can read each one aloud correctly on the first try; verified
  structurally (A-Z-plus-space only, 4/4/4 easy/medium/hard split preserved
  per category, 72 total unchanged) and visually via a Playwright run
  through Single mode. Also added a home-screen background image
  (`images/home-bg.jpg`, generated via the `image-gen` skill — two friends
  at a night table, one reading a gibberish card aloud with sound-wave
  lines, the other sleepy-eyed with a lightbulb moment, playing on "antok" =
  sleepy) wired into `#screen-home` in `css/styles.css` with a dark gradient
  overlay for text legibility. Intended to be reused as-is for this game's
  future `gondoit.work` portfolio card, same pattern as Emoji Says and Word
  Scramble.
- **v3** (2026-07-12): Owner feedback after v2: "some words were used as is" —
  several prompts still left more than one meaningful content word copied
  verbatim from the answer (not just short function words like `a`/`the`/`is`),
  which reads as lazy gibberish rather than a real phonetic disguise. Worst
  offenders: `LIFE IS LIKE A BOX OF CHOCOLATES` left `LIFE`, `BOX` both
  untouched; `HOUSTON WE HAVE A PROBLEM` left `HAVE`, `PROBLEM` both
  untouched; `THINK FAST DONT BLINK` was still 100% identical to its own
  answer even after v2 (an oversight — the v2 changelog claimed this entry
  was fixed, but the mismatched word was swapped without adding any actual
  disguise). Audited all 48 English-track entries with a script
  counting literal content-word overlap (excluding short function words —
  articles, prepositions, basic pronouns, negation) and fixed every entry
  down to at most one unavoidable "anchor" word, using real-word homophones
  throughout (`PLAICE` for "place", `GUESSED` for "guest", `SOARED` for
  "sword", `GOALED` for "gold", `SIGHED` for "side", `SUITE` for "sweet",
  `AN SIR`/`RITE` for "answer"/"right", `BEE OX` for "box", `PROBE LUM` for
  "problem", `AIRS` for "ears", `MOOR`/`WONT` for "more"/"want"). Re-verified
  structurally (still 4/4/4 per category, 72 total, A-Z-plus-space only) and
  visually via a 20-card Playwright run through Single mode's English track.
  The Tagalog track was not touched — its few nonzero-overlap entries are
  genuine Taglish blending (e.g. "MA REACH" in `HINDI KITA MA REACH`, a real
  colloquial phrase), not laziness.
- **v4** (2026-07-12): Owner feedback after v3: no word should be used as-is
  in the answer, full stop — including the short function words (`a`, `the`,
  `is`, `it`, `of`, `and`...) and single "anchor" words that v3's audit
  deliberately left alone. Wrote a script checking literal word overlap
  (any prompt token exactly matching any answer token, regardless of
  position) across all 72 puzzles in all 6 categories: 43 still had at least
  one shared word. Respelled every flagged word using the same homophone
  style already established in the file (`DUH`=the, `UH`=a, `IZ`=is, `ITT`=it,
  `UV`=of, `N`=and, `MEE`=me, `YER`=your, `KWEEN`=queen, `AYE`=eye, etc.),
  including the two Tagalog entries (`MA`/`REACH`→`MAH`/`REETSH`,
  `NANG`→`NAHNG`). Re-verified with the same script: 0/72 overlaps remain.
  Structure unchanged (72 total, 4/4/4 easy/medium/hard per category,
  A-Z-plus-space answers only); `node --test tests/game.test.mjs` still
  passes (24/24, unaffected since it uses its own fixture data, not
  `categories.js`).
- **v5** (2026-07-12): Owner content update: reworded `RED IT OUT LOUD`
  (answer `READ IT OUT LOUD`) to `READY AWE LAW` and `PASS DUH MY CRO PHONE`
  (answer `PASS THE MICROPHONE`) to `PUSH DONT MY CHIFFON`; removed 6 cards
  (`BITE THE BULLET`, `HIT THE SACK`, `HERES LOOKING AT YOU KID`,
  `ELEMENTARY MY DEAR WATSON`, `NASAAN KA MARUJA`, `LAGOT KA KAY HOST`);
  added a new `pop-culture-en` category ("Pop Culture Mashup", 22 cards
  covering movies/shows/brands/memes like Parasite, Hereditary, Train to
  Busan, Spongebob Squarepants, IKEA meatball, Keeping Up with the
  Kardashians). All new/edited prompts re-verified with the v4 overlap
  script at 0/88 hits, no duplicate answers, valid A-Z-plus-space answers.
  Categories no longer need an even 4/4/4 easy/medium/hard split (the
  removals left some at 10-11 cards, unevenly split) — that was only ever
  an artifact of how the original 6 categories were authored, never a
  hard rule.
  Also fixed a reported "cards feel unrandomized" bug: `buildDeck()` in
  `js/game.js` dealt puzzles in fixed easy→medium→hard blocks (per the
  original spec), shuffling only within each tier — so a small category's
  first few cards were always the same difficulty tier, just reordered.
  Verified live via a Playwright script driving Single mode through
  `chromium` (no `chromium-cli` available, so scripted directly against
  the `playwright` package) across 3 consecutive "Play Again" runs: the
  shuffle itself was already correct (different order each run), but the
  same 4 "easy" answers always led every run. Changed `buildDeck()` to pool
  every selected category's puzzles and shuffle the whole deck together, so
  difficulty is mixed throughout instead of dealt in blocks; updated
  `spec.md`'s US-2 acceptance criteria and this file's "Rules Engine"
  section to match, and rewrote the one test
  (`tests/game.test.mjs`) that asserted the old block order — plus 3 tests
  that assumed a specific puzzle would land at a fixed deck index, which
  no longer holds now that difficulty isn't grouped; they now advance with
  `skipPuzzle` until reaching the specific puzzle they need instead of
  relying on position. All 24 tests pass; re-ran the same live Playwright
  check afterward and confirmed difficulty is now mixed within each run.
- **v6** (2026-07-12): Added a new `salitang-pinoy` category ("Salitang
  Pinoy", 10 cards) for single Filipino vocabulary words — Tubig, Tulog,
  Halo Halo, Pila, Sampu, Pasaway, Bumbay, Kadete, Alibata, Lodi. Flagged
  "Bumbay" to the owner beforehand since it's Filipino slang for Indian/South
  Asian people that can read as derogatory; owner confirmed it's meant as
  neutral local slang and to include it as-is. Re-verified with the overlap
  script (0/98 hits across all 8 categories), no duplicate answers.
