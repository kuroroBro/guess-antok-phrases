# Tasks: Antok Phrases

## Phase 1 - Scaffold

- [x] Copy the proven static Host/Display structure from Emoji Says.
- [x] Keep PeerJS room sync and host-authoritative state.
- [x] Keep pure rules engine and node test harness.

## Phase 2 - Phrase Game Conversion

- [x] Rename user-facing title, hook, meta description, README, and SDD docs.
- [x] Replace icon clues with large phonetic gibberish cards.
- [x] Redact Display broadcasts to send `prompt` plus masked answer only.
- [x] Replace built-in categories with sound-alike phonetic prompts.
- [x] Update tests to use `{ prompt, answer, difficulty }` puzzle fixtures.

## Phase 3 - Gameplay

- [x] Preserve category selection, team names, Letter Hints, timer, and target
      score setup.
- [x] Add single-device mode that starts without a room.
- [x] Add single-mode `Give Hint` wired to the shared `revealLetter()` rule.
- [x] Keep single-mode answers hidden by default, with an explicit Show Answer
      control.
- [x] Preserve easy -> medium -> hard deck ordering across selected
      categories.
- [x] Preserve random letter reveal that excludes spaces.
- [x] Preserve award, skip, timer auto-skip, and game-over behavior.
- [x] Blur the Display phrase while a configured timer is paused.

## Phase 4 - Documentation

- [x] Add SDD spec for the phonetic gibberish game.
- [x] Add implementation plan describing prompt/answer data and redaction.
- [x] Add task checklist documenting completed conversion work.
- [x] Update README with local dev and SDD links.

## Phase 5 - Validation

- [x] Run `node --test tests/game.test.mjs`.
- [x] Run a local static server smoke test.
- [x] Check Host and Display screens at default browser viewport.

## Phase 6 - Content quality pass + home background (post-launch)

- [x] Audit all 72 phrase cards across all 6 categories by reading each
      prompt aloud against its answer; fix invented/ambiguous spellings and
      the handful of real prompt/answer mismatches found (see plan.md
      Changelog v2 for the full list).
- [x] Verify structurally: A-Z-plus-space only, 4/4/4 easy/medium/hard split
      preserved per category, 72 total puzzles unchanged.
- [x] Verify visually via Playwright through Single mode (spot-checked
      Pinoy Lines and Pinoy Party entries, including the two fixed
      mismatches).
- [x] Generate `images/home-bg.jpg` via the `image-gen` skill and wire it
      into `#screen-home`'s background in `css/styles.css`.
