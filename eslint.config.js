import { defineESLintConfig } from '@ocavue/eslint-config'

export default defineESLintConfig(
  {
    react: true,
    markdown: false,
  },
  {
    ignores: [
      '**/*.md',
      '**/*.json',
      '**/dist/**',
      '**/node_modules/**',
      'docs/**',
      'packages/**/*.md',
      // Additional ignores for memory optimization
      '**/*.d.ts',
      '**/*.min.js',
      '**/coverage/**',
      '**/.turbo/**',
      '**/.astro/**',
    ],
  },
  {
    rules: {
      // Require curly braces for all control statements
      curly: ['error', 'all'],
      // Ignore import ordering
      'import/order': 'off',
      'sort-imports': 'off',
      // Disable unicorn explicit length check rule
      'unicorn/explicit-length-check': 'off',
    },
  },
)
