# WORKFLOW.md — FE-03 AI-Assisted Workflow Drill
 
## Setup
 
Feature: an account settings form (display name, email, bio, theme,
notifications, password change).
 
- **Round 1:** one-sentence prompt, "Build me a settings form," no
  follow-up, no fixes accepted as-is.
- **Round 2:** a structured prompt with explicit fields, validation
  rules, accessibility requirements, and edge cases to handle,
  followed by a request to write and run tests.
## Correctness
 
Round 1 produced a form with **no validation logic whatsoever** — the
email field uses `type="email"`, which only gives loose browser-native
checking, but nothing enforces required fields, password matching, or
length limits. The submit button has no handler at all, so the form
does nothing when clicked. Round 2's output ties every field to a
schema (`required`, `minLength`, `maxLength`, a regex for email, and a
custom rule pairing new-password strength with a confirm-password
match check), and re-validates on blur and on change once a field has
been touched.
 
## Accessibility
 
Both rounds correctly paired every `<label>` with its input via
`for`/`htmlFor`, which was a pleasant surprise for a "lazy" prompt.
Where they diverge is error handling: Round 1 has no errors to
announce, so this doesn't apply. Round 2 renders error text visually
under each field, but **does not wire that error text to the input
with `aria-describedby`, nor does it use `aria-live` to announce new
errors** — meaning a screen reader user gets no notification when
validation fails. This is a real miss even in the "careful" round,
and is the specific AI mistake I caught and would fix before shipping
this component.
 
## Edge Cases
 
Round 1 silently accepts empty submissions, mismatched passwords, and
malformed emails — there is nothing stopping any of it. Round 2
explicitly rejects empty required fields, enforces name length bounds,
validates email format via regex, requires 8+ character passwords with
at least one digit, and blocks submission if password confirmation
doesn't match.
 
Round 1 also added an unrequested "Danger zone" section (delete
account, export data) that wasn't part of the prompt at all — a sign
that an underspecified prompt leaves the model free to fill gaps with
its own assumptions about what a settings page "should" have, for
better or worse.
 
## Review Effort
 
Round 1 took under a minute to prompt and produced something that
*looks* presentable at a glance, but every piece of actual validation
logic — the entire point of the brief — would need to be written from
scratch afterward. Round 2 took longer to write the prompt itself
(several minutes to spell out fields, rules, and edge cases), but
arrived nearly submission-ready; my review time was mostly spent
checking the schema against my own requirements and catching the
missing `aria-live`/`aria-describedby` wiring, not writing missing
logic. Counting total time including fixes, Round 2 was faster
end-to-end despite the slower start.
 
## Conclusion
 
The clearest lesson: a vague prompt to a modern assistant doesn't
produce broken code, it produces code that *looks* finished but is
missing the substance the task actually needed (validation, edge-case
handling). A precise prompt front-loads the thinking, and the payoff
is less review/fixing time later — even when, as here, the careful
round still had its own gap that only close review caught.
 