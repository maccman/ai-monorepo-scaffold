---
description: 
globs: **/*.tsx
alwaysApply: false
---

React Naming Conventions:

- Use kebab-case for files and directories.

Components:

- DO not use 'use client' or 'use server' statements
- Favor named exports for components
- Ensure components are modular, reusable, and maintain a clear separation of concerns.
- Always split React components out so there is only ever one per file
- Keep logic as low as possible. For example a PostItem should handling its own deletion, rather than passing the logic up in a property callback.
- Rather than have a large function, like a TRPC mutation handler, inside the component, refactor and split it out into a generic helper or hooks lib.
- DO NOT `import * as React from 'react'`, import each React function specifically
- `zod` and `react-hook-form` packages are installed - use them.
- Always use `cn` from `@/lib/utils` for class name merging.

UI and Styling:

- Use Shadcn UI, Radix, and Tailwind Aria for components and styling
- Prefer using Shadcn components for anything UI related
- Implement responsive design with Tailwind CSS; use a mobile-first approach
