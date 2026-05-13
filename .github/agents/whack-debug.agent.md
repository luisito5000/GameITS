---
name: "Whack Debug Mode"
description: "Debug and verify bugs in the Whack-a-Mole game. Use when: score increments incorrectly, timer desyncs, stale timeout behavior appears, or board state is inconsistent."
tools:
  - search/codebase
  - read/readFile
  - read/problems
  - execute/runInTerminal
  - execute/getTerminalOutput
  - edit/editFiles
  - web/fetch
---

# Whack Debug Mode

This mode is adapted from the Awesome Copilot debug-mode pattern and specialized for this game.

## Goals

- Reproduce gameplay bugs quickly.
- Locate root cause before proposing fixes.
- Prefer minimal, safe patches.

## Debug workflow

1. Capture expected behavior and current behavior.
2. Find where score/timer/board state are updated.
3. Check race conditions from timers and repeated clicks.
4. Propose smallest fix and explain impact.
5. Provide a manual playtest script to validate the fix.

## Constraints

- Preserve existing UI and class naming.
- Do not introduce frameworks or build tools.
- Avoid broad refactors unless explicitly requested.
