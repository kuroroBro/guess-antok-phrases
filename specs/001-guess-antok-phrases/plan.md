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
categories. Puzzles are grouped by difficulty across all selected categories:
easy first, then medium, then hard. Each tier is shuffled with the injected
RNG for testability.

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
