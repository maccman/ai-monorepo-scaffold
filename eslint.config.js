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
  {
    // Prevent importing server-side code in client-side code
    files: [
      'apps/web/src/components/**/*.{ts,tsx}',
      'apps/web/src/hooks/**/*.{ts,tsx}',
      'apps/web/src/lib/**/*.{ts,tsx}',
    ],
    ignores: [
      // These files legitimately need to import from @app/api
      'apps/web/src/components/providers/trpc-provider.tsx',
      'apps/web/src/client/trpc.ts',
    ],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@app/api', '@app/api/*'],
              message:
                'Do not import from @app/api in client-side code. Use @app/utils for shared constants and types, or use TRPC hooks for data fetching.',
              allowTypeImports: true, // Allow type-only imports
            },
            {
              group: ['@app/db', '@app/db/*'],
              message:
                'Do not import from @app/db in client-side code. Use TRPC for database access.',
              allowTypeImports: true, // Allow type-only imports
            },
          ],
        },
      ],
    },
  },
)
