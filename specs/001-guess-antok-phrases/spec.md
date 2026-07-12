# Feature Specification: Antok Phrases

**Feature branch**: `001-guess-antok-phrases`
**Status**: Draft
**Created**: 2026-07-12

## Overview

Antok Phrases is a browser-only phonetic gibberish party game modeled on the
Host plus shared Display structure used by Emoji Says. Each round shows weird
words such as `WHY SO CEREAL`; teams read them aloud and race to hear the
hidden phrase, `WHY SO SERIOUS`. The Host sees the answer, judges spoken
guesses, and taps which team scored. The Display never receives the raw answer.

Hook: sounds like nonsense. Makes total sense.

## User Stories

### US-1: Set up a game

As a Host, I want to choose language track, categories, teams, hints, timer,
and target score so the session fits my group.

Acceptance criteria:
- The Host chooses one language track before opening a room.
- Switching language resets category selection to every category in that track.
- At least one category is required.
- Team names, Letter Hints, Time per Puzzle, and Target Score are configurable.
- Setup happens before the room opens; no mid-game setup edits.

### US-2: Play phrase cards

As players, we want to read phonetic gibberish aloud and guess what phrase it
sounds like.

Acceptance criteria:
- Display shows the current phonetic gibberish prompt, category, masked answer
  length, both scores, timer when enabled, and target score when enabled.
- Host shows everything the Display shows plus the full answer and controls.
- Letter Hints reveal one random unrevealed answer letter and never reveal
  spaces.
- Host can award Team A, award Team B, or skip.
- Puzzles do not repeat within a game.
- The deck combines puzzles from every selected category and shuffles them
  together; difficulty is mixed throughout, not dealt in easy/medium/hard
  blocks.

### US-2a: Play single-device mode

As a solo player, I want to play locally without opening a room, and I want to
tap Give Hint when I need help.

Acceptance criteria:
- Home includes a Play Single path.
- Single mode uses the same setup options, category deck, timer, target score,
  and Letter Hints setting.
- Single mode does not show the answer by default.
- The player can tap **Give Hint** to reveal one random unrevealed answer
  letter when Letter Hints are enabled.
- The player can tap **Show Answer**, **Got It**, or **Skip**.
- Timer expiry skips the current card and deals the next one paused.

### US-3: Run one Host and one shared Display

As a group, we want one private Host controller and one public Display so
answers stay hidden.

Acceptance criteria:
- Host opens a room and receives a 4-letter code.
- Display joins by code using the same static page.
- Host is authoritative; Display never sends game actions.
- Broadcast state is redacted: prompt and masked answer are allowed, raw
  answer is not.
- If the room service is unreachable, the game explains that a room is
  required.

### US-4: Optional round pressure

As a Host, I want a timer that adds pressure without taking judgment away.

Acceptance criteria:
- If a timer is configured, each new card starts paused at the full duration.
- Host taps Start Timer when the round is ready.
- While paused, the Display blurs the prompt to prevent a head start.
- Time running out auto-skips with no point and deals the next card paused.
- Host can manually award or skip regardless of timer state.
- Auto-start Timer is an optional Host setting: when on, each card's timer
  starts running the instant it's dealt instead of waiting for Start Timer,
  and the Display shows the prompt immediately (no pause to blur).

## Functional Requirements

- **FR-1** Static site only; no backend or build step required.
- **FR-2** Pure rules module in `js/game.js`; no DOM or network reads there.
- **FR-3** Host-authoritative PeerJS room sync.
- **FR-4** Display must never receive the raw answer.
- **FR-5** Mobile-first Host controls and TV-readable Display.
- **FR-6** No ads, analytics, accounts, currency, lives, or elimination.

## Key Entities

- **Puzzle**: `prompt` phonetic gibberish, `answer`, `difficulty`,
  `categoryId`.
- **Category**: `id`, `name`, `language`, `puzzles`.
- **Settings**: language, category ids, hints flag, timer seconds, target
  score, team names.
- **Game**: phase, teams, deck, puzzle index, current puzzle, timer state,
  target score, winner.
- **Room**: Host peer, Display peers, 4-letter code, redacted broadcasts.

## Non-goals

- No typing answers into the app.
- No per-player phones.
- No custom card editor.
