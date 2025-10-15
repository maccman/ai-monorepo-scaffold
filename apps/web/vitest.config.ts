import path from 'node:path'

import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [],
  test: {
    include: ['./tests/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    environment: 'node',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    testTimeout: 30000,
    hookTimeout: 30000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
