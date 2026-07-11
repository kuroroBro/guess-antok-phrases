import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PHASE, TIMER_STATUS, createGame, startGame, revealLetter, awardPoint, skipPuzzle,
  maskedAnswer, startTimer, checkTimerExpired, timerRemainingMs,
} from '../js/game.js';

const rng = () => 0.5; // deterministic shuffles

const POOL = [
  {
    id: 'food',
    name: 'Food & Local Brands',
    puzzles: [
      { prompt: 'AWE LIVE VIEW', answer: 'I LOVE YOU', difficulty: 'easy' },
      { prompt: 'ILL BEE BACH', answer: 'ILL BE BACK', difficulty: 'easy' },
      { prompt: 'WONCE UPON A THYME', answer: 'ONCE UPON A TIME', difficulty: 'medium' },
    ],
  },
  {
    id: 'landmarks',
    name: 'Historical Landmarks',
    puzzles: [
      { prompt: 'TOO BEE OAR KNOT TOO BEE', answer: 'TO BE OR NOT TO BE', difficulty: 'hard' },
    ],
  },
];

function freshGame(overrides = {}) {
  return createGame(
    { categoryIds: ['food', 'landmarks'], hintsEnabled: true, ...overrides },
    POOL,
    rng,
  );
}

test('createGame builds one shuffled deck from every selected category, difficulty mixed throughout', () => {
  const state = freshGame();
  assert.equal(state.phase, PHASE.LOBBY);
  assert.equal(state.deck.length, 4);
  const difficulties = state.deck.map((p) => p.difficulty).sort();
  assert.deepEqual(difficulties, ['easy', 'easy', 'hard', 'medium']);
});

test('createGame only includes puzzles from selected categories', () => {
  const state = freshGame({ categoryIds: ['landmarks'] });
  assert.equal(state.deck.length, 1);
  assert.equal(state.deck[0].answer, 'TO BE OR NOT TO BE');
});

test('startGame requires the lobby phase and a non-empty deck', () => {
  const empty = freshGame({ categoryIds: [] });
  assert.equal(startGame(empty), false);

  const state = freshGame();
  assert.equal(startGame(state), true);
  assert.equal(state.phase, PHASE.PLAYING);
  assert.ok(state.puzzle);
  assert.equal(startGame(state), false); // no longer in lobby
});

test('revealLetter is a no-op when hints are disabled', () => {
  const state = freshGame({ hintsEnabled: false });
  startGame(state);
  assert.equal(revealLetter(state), false);
  assert.equal(state.puzzle.revealedIndexes.length, 0);
});

test('revealLetter picks a random blank via the provided rng, never a space', () => {
  const state = freshGame();
  startGame(state);
  // Deck order isn't fixed anymore (difficulty is mixed throughout), so skip
  // to the puzzle this test actually needs rather than assuming a position.
  while (state.puzzle.answer !== 'ONCE UPON A TIME') skipPuzzle(state);
  // blank candidates exclude spaces; the final candidate is the last E.
  const rng = () => 0.999; // always picks the last candidate in the list
  assert.equal(revealLetter(state, rng), true);
  assert.deepEqual(state.puzzle.revealedIndexes, [15]); // last letter, 'E'
  assert.equal(revealLetter(state, rng), true);
  assert.deepEqual(state.puzzle.revealedIndexes, [15, 14]); // next remaining candidate, 'M'
});

test('revealLetter (default rng) never reveals a space and eventually reveals every letter once', () => {
  const state = freshGame();
  startGame(state);
  while (state.puzzle.answer !== 'ONCE UPON A TIME') skipPuzzle(state);
  const letterIndexes = [0, 1, 2, 3, 5, 6, 7, 8, 10, 12, 13, 14, 15];
  for (let i = 0; i < letterIndexes.length; i++) {
    assert.equal(revealLetter(state), true);
  }
  const sorted = [...state.puzzle.revealedIndexes].sort((a, b) => a - b);
  assert.deepEqual(sorted, letterIndexes);
  assert.equal(revealLetter(state), false); // fully revealed
});

test('revealLetter stops (returns false) once the word is fully revealed', () => {
  const state = freshGame({ categoryIds: ['landmarks'] });
  startGame(state);
  for (let i = 0; i < 'TO BE OR NOT TO BE'.replaceAll(' ', '').length; i++) {
    assert.equal(revealLetter(state), true);
  }
  assert.equal(revealLetter(state), false);
});

test('maskedAnswer hides unrevealed letters, always shows spaces', () => {
  const state = freshGame();
  startGame(state);
  while (state.puzzle.answer !== 'ONCE UPON A TIME') skipPuzzle(state);
  revealLetter(state, () => 0); // deterministic: picks the first blank candidate, index 0 ('O')
  const masked = maskedAnswer(state.puzzle);
  assert.equal(masked[0].char, 'O');
  assert.equal(masked[1].char, null);
  assert.equal(masked[4].isSpace, true);
  assert.equal(masked[4].char, ' ');
});

test('awardPoint scores a team and deals the next puzzle', () => {
  const state = freshGame();
  startGame(state);
  const first = state.puzzle.answer;
  assert.equal(awardPoint(state, 'a'), true);
  assert.equal(state.teams.a.score, 1);
  assert.notEqual(state.puzzle.answer, first);
});

test('awardPoint rejects an unknown team id', () => {
  const state = freshGame();
  startGame(state);
  assert.equal(awardPoint(state, 'c'), false);
  assert.equal(state.teams.a.score, 0);
  assert.equal(state.teams.b.score, 0);
});

test('skipPuzzle deals the next puzzle with no score change', () => {
  const state = freshGame();
  startGame(state);
  assert.equal(skipPuzzle(state), true);
  assert.equal(state.teams.a.score, 0);
  assert.equal(state.teams.b.score, 0);
  assert.equal(state.puzzleIndex, 1);
});

test('deck exhaustion ends the game and picks a winner by score', () => {
  const state = freshGame({ categoryIds: ['landmarks'] }); // 1-puzzle deck
  startGame(state);
  assert.equal(awardPoint(state, 'a'), true);
  assert.equal(state.phase, PHASE.GAMEOVER);
  assert.equal(state.winner, 'a');
  assert.equal(state.puzzle, null);
  // further actions are rejected once the game is over
  assert.equal(awardPoint(state, 'a'), false);
  assert.equal(revealLetter(state), false);
  assert.equal(skipPuzzle(state), false);
});

test('deck exhaustion is a draw when scores are tied', () => {
  const state = freshGame({ categoryIds: ['landmarks'] });
  startGame(state);
  skipPuzzle(state); // no score change, deck now exhausted
  assert.equal(state.phase, PHASE.GAMEOVER);
  assert.equal(state.winner, null);
});

test('puzzles are never repeated within a game', () => {
  const state = freshGame();
  startGame(state);
  const seen = new Set();
  while (state.phase === PHASE.PLAYING) {
    const answer = state.puzzle.answer;
    assert.equal(seen.has(answer), false);
    seen.add(answer);
    skipPuzzle(state);
  }
  assert.equal(seen.size, 4);
});

test('timer is disabled by default (no timerSeconds) and stays paused', () => {
  const state = freshGame();
  startGame(state);
  assert.equal(state.timerSeconds, null);
  assert.equal(startTimer(state, 0), false);
  assert.equal(state.timerStatus, TIMER_STATUS.PAUSED);
  assert.equal(timerRemainingMs(state, 0), 0);
});

test('startTimer sets an absolute deadline and can only be started once', () => {
  const state = freshGame({ timerSeconds: 30 });
  startGame(state);
  assert.equal(startTimer(state, 1000), true);
  assert.equal(state.timerStatus, TIMER_STATUS.RUNNING);
  assert.equal(state.timerDeadline, 31_000);
  assert.equal(startTimer(state, 2000), false); // already running
  assert.equal(timerRemainingMs(state, 11_000), 20_000);
});

test('timerRemainingMs shows the full duration while paused', () => {
  const state = freshGame({ timerSeconds: 45 });
  startGame(state);
  assert.equal(state.timerStatus, TIMER_STATUS.PAUSED);
  assert.equal(timerRemainingMs(state, 999_999), 45_000);
});

test('checkTimerExpired auto-skips (no score change) and leaves the next puzzle paused', () => {
  const state = freshGame({ timerSeconds: 30 });
  startGame(state);
  const firstAnswer = state.puzzle.answer;
  startTimer(state, 0);
  assert.equal(checkTimerExpired(state, 29_000), false); // not yet
  assert.equal(checkTimerExpired(state, 30_000), true); // due
  assert.notEqual(state.puzzle.answer, firstAnswer);
  assert.equal(state.teams.a.score, 0);
  assert.equal(state.teams.b.score, 0);
  assert.equal(state.timerStatus, TIMER_STATUS.PAUSED); // waiting for the Host again
  assert.equal(state.timerDeadline, null);
});

test('awardPoint and skipPuzzle also reset the next puzzle to a paused timer', () => {
  const state = freshGame({ timerSeconds: 30 });
  startGame(state);
  startTimer(state, 0);
  awardPoint(state, 'a');
  assert.equal(state.timerStatus, TIMER_STATUS.PAUSED);
  startTimer(state, 5000);
  skipPuzzle(state);
  assert.equal(state.timerStatus, TIMER_STATUS.PAUSED);
});

test('timer expiring right at deck exhaustion still ends the game', () => {
  const state = freshGame({ categoryIds: ['landmarks'], timerSeconds: 10 });
  startGame(state);
  startTimer(state, 0);
  assert.equal(checkTimerExpired(state, 10_000), true);
  assert.equal(state.phase, PHASE.GAMEOVER);
});

test('no targetScore by default — plays through the whole deck', () => {
  const state = freshGame();
  assert.equal(state.targetScore, null);
});

test('reaching targetScore ends the game instantly with that team as winner', () => {
  const state = freshGame({ targetScore: 2 });
  startGame(state);
  assert.equal(awardPoint(state, 'a'), true);
  assert.equal(state.phase, PHASE.PLAYING); // 1 point, not there yet
  assert.equal(awardPoint(state, 'a'), true);
  assert.equal(state.phase, PHASE.GAMEOVER); // hit the target
  assert.equal(state.winner, 'a');
  assert.equal(state.teams.a.score, 2);
});

test('targetScore win never leaves it a draw, even if reached exactly', () => {
  const state = freshGame({ targetScore: 1 });
  startGame(state);
  awardPoint(state, 'b');
  assert.equal(state.phase, PHASE.GAMEOVER);
  assert.equal(state.winner, 'b'); // not null/draw, despite a.score === 0 !== b.score being the only difference
});

test('targetScore does not fire early and deck exhaustion still works when nobody reaches it', () => {
  const state = freshGame({ categoryIds: ['landmarks'], targetScore: 99 });
  startGame(state);
  assert.equal(awardPoint(state, 'a'), true); // only 1 puzzle in this deck
  assert.equal(state.phase, PHASE.GAMEOVER); // deck exhausted, not target reached
  assert.equal(state.teams.a.score, 1);
  assert.equal(state.winner, 'a'); // decided by score comparison, not the target
});
