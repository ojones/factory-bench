# Intake

Source: https://github.com/ojones/ai-factory/issues/140
Cost cap: $1.50 (override)

## Spec

A bench app used to test the Factory itself. It is the Starter Template's todo API unchanged, plus one change: GET /api/version answers 200 with the JSON {"version": "1"}. The change is user-visible, so it ships behind a feature flag; with the flag off the route answers 404 like any unknown route. Nothing else changes.
