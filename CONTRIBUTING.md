# Contributing to TEHI

TEHI welcomes focused contributions that improve the research MVP, documentation, testing, safety, or reproducibility.

## Before opening a change

1. Search existing issues before creating a new one.
2. Open or reference an issue for substantial work.
3. Keep changes narrow and explain the user or research need.
4. Do not submit patient data, protected health information, credentials, model weights without documented rights, or datasets without clear licensing.

## Development workflow

```bash
git switch -c type/short-description
npm test
```

Use a descriptive branch prefix such as `feat/`, `fix/`, `docs/`, or `test/`. Pull requests should describe:

- what changed and why
- how the change was tested
- any safety, privacy, data, or model-performance implications
- screenshots for visible interface changes

## Medical-AI standards

- Do not present unvalidated output as clinical evidence.
- State dataset provenance, license, and limitations.
- Use patient-level data separation to prevent leakage.
- Report negative and subgroup results alongside headline metrics.
- Keep model artifacts tied to versioned preprocessing and label definitions.
- Preserve clinician oversight and explicit intended-use boundaries.

## Commit quality

Prefer small, meaningful commits with messages that explain the change. Never manufacture activity, backdate work, or split one trivial change into multiple commits for contribution counts.
