# Backend Test Guide

This test setup is intentionally minimal and CI/CD-friendly.

## Test Types

- Functional tests: use mocked DB and validate important API behavior quickly.
- Integration tests: use real DB and validate key end-to-end API/database flow.

## Commands

From `backend/`:

- `npm test` -> runs all tests
- `npm run test:functional` -> mocked functional tests only
- `npm run test:integration` -> real DB integration tests (only if enabled)

## Integration Test Controls

Integration tests only run when:

- `RUN_INTEGRATION_TESTS=true`

Recommended optional variables:

- `TEST_LOGIN_USER_ID` (default: `U000001`)
- `TEST_LOGIN_PASSWORD` (default: `admin123`)

The integration tests use DB values from `.env`:

- `DB_HOST`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`

## CI/CD Recommendation

- Run `npm run test:functional` on every PR.
- Run integration tests in a pipeline stage that provisions DB and loads seed SQL.
- Keep integration credentials in CI secret storage, not in source control.
