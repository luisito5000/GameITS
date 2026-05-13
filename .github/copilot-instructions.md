# Copilot Instructions for Whack-a-Mole Project

These instructions apply to all Copilot interactions in this repository.

## Project context
- This is a vanilla web project in a single-page format.
- Main file is Game.html with embedded HTML, CSS, and JavaScript.
- Keep gameplay readable and deterministic.

## Coding style
- Use plain HTML, CSS, and JavaScript only.
- Do not add frameworks or build tools unless explicitly requested.
- Prefer clear function names and short, focused functions.
- Use constants for gameplay tuning values (timings, points, probabilities).
- Preserve existing UI style and class naming patterns.

## Gameplay and architecture preferences
- Any new feature must keep score, timer, and board behavior stable.
- Avoid changing public behavior unless requested.
- Keep game-loop logic separated from DOM updates when possible.
- Handle edge cases such as double-click scoring and stale timers.
- If adding special entities (for example bonus moles), define explicit spawn chance and points.

## Quality expectations
- After code edits, verify there are no syntax errors.
- Avoid large refactors for small tasks.
- Explain changes with concise before/after summaries when asked.
- Suggest manual test steps for gameplay changes.
