// Test-only ambient types.
// - `vitest/globals` enables global test APIs (describe/it/expect) without importing
//   them in every test file (matches vitest.config `globals: true`).
// - `@testing-library/jest-dom` augments Vitest's `expect` with DOM matchers.
/// <reference types="vitest/globals" />
import "@testing-library/jest-dom";
