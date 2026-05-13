---
applyTo: "Game.html"
description: "Use when editing gameplay in Game.html: keep score/timer stable, prevent double-count scoring bugs, and preserve deterministic loop behavior."
---

# Gameplay Guardrails

When editing gameplay logic in this project:

- Keep score, timer, and board update flow backward compatible unless the user asks for behavior changes.
- Use constants for tunable values (spawn rate, points, durations).
- Prevent double-award scenarios from repeated clicks or stale timeouts.
- Separate state updates from DOM updates when practical.
- End with a short manual test checklist focused on score, timer, and spawn correctness.
