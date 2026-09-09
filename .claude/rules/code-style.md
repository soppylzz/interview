# Code Style: Comments & Naming

Applies to every source file in the repository (`.js`, `.ts`, etc.).

## Comments must be in English

Never write Chinese inside code comments.

## Comment forms

- Single-line comments: `// ...`
- Multi-line block comments: `/** ... */`
- Use section dividers only to separate distinct semantic blocks — never per statement — and only in these two levels:

  ```js
  /* ==================== LEVEL ONE ==================== */
  /* =============== level two =============== */
  ```

## Prefer no comment over a comment

- Express intent through self-explanatory function/variable names instead of comments; a reader should understand how to call or use something from its name alone.
- Write a comment only where the code cannot make a constraint obvious by itself.
- In runnable examples, annotate a statement's expected output with a trailing single-line comment, e.g. `console.log(typeof str1); // string` (see `javascript/code-output/1.typeof.js`).
