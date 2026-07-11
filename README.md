# Antok Phrases

Sounds like nonsense. Makes total sense.

Antok Phrases is a free, ad-free phonetic gibberish party game that runs
entirely in the browser. Each card shows weird words that are not meant to
make sense on the page. Read them out loud, listen to the sounds, and decode
the hidden phrase before time runs out. Two teams shout answers; the Host taps
who got it. No typing, no accounts, no in-game currency.

## How to play

1. **Play Single** - pick a language track, categories, Letter Hints, Time
   per Puzzle, and optional Target Score. Read the gibberish aloud and use
   **Give Hint** when you want one letter revealed.
2. **Host a Game** - pick a language track, categories, team names, Letter
   Hints, Time per Puzzle, and optional Target Score. Tap **Start Room** to
   get a 4-letter room code.
3. **Join as Display** - on the TV or laptop everyone can see, open this same
   page and enter the Host's room code.
4. **Start Game** - the Host taps Start once the Display is connected. Every
   puzzle shows phonetic gibberish and blank letter tiles for the answer.
5. **Play** - teams read the gibberish aloud and shout what it sounds like.
   The Host taps **Team A got it** or **Team B got it** to award the point,
   or **Skip** if nobody gets it. If Letter Hints are on, the Host can reveal
   one random answer letter at a time.
6. If a timer is set, every new card starts paused. The Host taps **Start
   Timer** when the round is ready. Time running out auto-skips the card and
   deals the next one paused.
7. The game ends when the deck runs out, or immediately when a team reaches
   the selected Target Score.

Single mode works on one device. Hosted party mode still needs a second
Display device because the Host screen shows the answer.

## Categories

Two independent tracks are included. A game session picks one track and never
mixes the two.

- **Tagalog**: Pinoy Lines, Pinoy Party
- **English**: Movie Lines, Famous Sayings, Songs & Pop, Party Chaos

Cards are dealt easy to hard across the selected categories, shuffled within
each difficulty tier.

## Local development

```bash
python3 -m http.server 8000
# open http://localhost:8000
node --test tests/game.test.mjs
```

## Design docs (SDD)

This project was built spec-first. See
[`specs/001-guess-antok-phrases/`](specs/001-guess-antok-phrases/):
[spec.md](specs/001-guess-antok-phrases/spec.md),
[plan.md](specs/001-guess-antok-phrases/plan.md), and
[tasks.md](specs/001-guess-antok-phrases/tasks.md).
