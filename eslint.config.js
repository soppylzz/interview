import eslint from '@eslint/js';
import globals from 'globals';
import tslint from 'typescript-eslint';
import prettierRecommend from 'eslint-plugin-prettier/recommended';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  eslint.configs.recommended,
  ...tslint.configs.recommended,
  prettierRecommend,

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.es2025,
        ...globals.node,
      },
    },
  },

  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-unused-vars': 'off',
      'prettier/prettier': 'warn',
    },
  },
  {
    ignores: ['node_modules/', 'dist/'],
  },
]);
