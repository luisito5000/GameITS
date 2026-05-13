# Whac-A-Mole (Vanilla HTML/CSS/JS)

This project is a single-page browser game built in `Game.html`.

## Gameplay Summary

- 3x3 board with one active mole at a time.
- 30-second round timer.
- Normal mole: +1 point.
- Golden mole (20% chance): +3 points.
- Streak counter increments on valid hits and resets when moles are missed.

## Test Coverage

The automated suite is in `tests/game.test.js` and covers:

- Board creation: verifies 9 holes render.
- Start/reset behavior: validates score, timer, streak, and button states.
- Double-click guard: ensures one mole cannot be scored twice.
- Golden mole scoring: verifies +3 points and status messaging.
- Timer edge case: confirms game stops when countdown reaches zero.

## Run Locally

Install dependencies:

```bash
npm install
```

Run lint:

```bash
npm run lint
```

Run tests:

```bash
npm test
```

Run full local CI check:

```bash
npm run ci
```

## CI Pipeline

GitHub Actions workflow file: `.github/workflows/ci.yml`

On each push and pull request, the workflow:

1. Installs dependencies with `npm ci`
2. Lints `Game.html`
3. Runs automated test cases

This keeps gameplay behavior stable and catches regressions early.
