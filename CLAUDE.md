# CLAUDE.md

This file provides guidance to AI assistants when working in this repository.

## Project
<Your capstone name> — a frontend project for the AI Engineering track.

## Stack
- Language: JavaScript/TypeScript (update once decided)
- Framework: TBD
- Package manager: npm

## Conventions
- Commits follow Conventional Commits (feat, fix, docs, chore, refactor, test).
- Code style: (e.g. Prettier defaults, 2-space indent — update once decided).
- Branching: work on feature branches, merge to main via PR.

## Notes for AI assistants
- Prefer explaining changes before applying them for anything non-trivial.
- Do not commit directly to main without confirmation.

## Rules learned from FE-03 workflow drill
- Every form field with validation rules must have its error message
  wired to the input via `aria-describedby`, and error containers must
  use `aria-live="polite"` so screen reader users are notified when
  validation fails — a visible error message alone is not enough.
- Forms must define an explicit validation schema (required, length
  bounds, pattern, custom rules) before writing any UI — never rely on
  native input types (e.g. `type="email"`) as the only validation.
- Do not let the model invent unrequested features (e.g. extra
  sections/buttons) when a prompt is underspecified — a settings form
  prompt should be scoped explicitly to the fields needed, or the
  output will include assumptions that weren't asked for.