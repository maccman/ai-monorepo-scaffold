# Vibe Coding: AI-Assisted Development

## What is Vibe Coding?

AI-assisted development where you describe what you want in natural language and AI generates working code. Instead of writing code line-by-line, you focus on high-level design while AI handles implementation.

**The breakthrough:** Code is no longer expensive. What took weeks now takes hours. A full SaaS app? Maybe 10 days.

## Why Senior Engineers Excel

Vibe coding amplifies expertise. Senior engineers bring:

- **Architectural judgment** for design decisions
- **Prompt design expertise** for effective AI communication
- **Scaffold setup knowledge** for optimal environments
- **Taste** for code quality and maintainability

Junior engineers can use vibe coding, but seniors turn it into a superpower.

## Cursor Commands

### `reflect` - Critical Analysis

```markdown
> reflect
```

Makes AI review its own work and identify improvements. Use after implementing features to catch issues early.

**Example output:**

- "Should have used a more modular approach"
- "Error handling could be more robust"
- "This would be more efficient with a different data structure"

### `review-plan` - Strategic Planning

```markdown
> review-plan
```

Breaks complex problems into manageable steps before implementation. Identifies pitfalls, edge cases, and scalability concerns.

### `technical-proposal` - Documentation

```markdown
> technical-proposal
```

Generates comprehensive documentation for complex features or architectural decisions.

## Model Selection

### Claude Sonnet 4.5 - Quality Champion

**Best for:** Complex problem-solving, architecture, refactoring, documentation

**Strengths:**

- High-quality, maintainable code
- Excellent context retention
- Comprehensive documentation
- Error prevention

### Cheetah - Speed Demon

**Best for:** Fast, standard implementations

**Strengths:**

- Extremely fast responses
- Perfect for common tasks
- Quick feedback loops
- Cost-effective

## Essential Setup

### 1. Great Scaffold

Start with a monorepo including migrations, routes, Zod schemas, React Hook Form setups. AI learns from rich examples.

### 2. Strong Rules

Use `.cursor/rules` to codify conventions:

**Development Cycle Rule:**

1. Create plan, get user approval before coding
2. After execution: run `pnpm typecheck` and `pnpm lint`
3. Run tests: `pnpm test --filter @app/<web/api/db>`
4. Never start dev servers or curl local endpoints

### 3. Perfect Context

AI needs explicit context. Open every relevant file (including `.d.ts` types) and use **Add All Open Files to Context**.

Don't be stingy with context. Your time > token costs.

### 4. Smart Editor

Use **Cursor** for:

- Fast linting and type checking
- Cursor rules integration
- Vector code-search
- Small iteration cycles

### 5. Audio Prompts

Use SuperWhisper or Spokenly to ramble out prompts. Audio is often more natural and effective than text.

## Development Cycle: Code, Test, Lint, Build, Repeat

### The Loop

1. **Code** - Generate or write code
2. **Test** - Verify functionality
3. **Lint** - Check quality and style
4. **Type Check** - Ensure type safety
5. **Build** - Verify build process
6. **Repeat** - Iterate on results

### Close the Loop: Let AI Do Everything

Get AI to handle as much as possible. Avoid copy-pasting.

**Database operations:**

```markdown
> Use psql to check users table structure and show first 5 records
> Find all users created in last 24 hours
```

**Local commands:**

```markdown
> Run test suite and show failures
> Check git status and changed files
> Run linter and fix issues automatically
```

**Build and deploy:**

```markdown
> Build project, run tests, deploy to staging if all passes
```

**File operations:**

```markdown
> Create migration for user preferences and run it
> Update package.json with new dependency and install
```

### Benefits

1. No copy-paste errors
2. Faster iteration
3. Better context for AI
4. Reduced friction
5. Real-time feedback

## Writing Good Prompts

### 1. Always Start with a Plan

**Bad:**

> "Add login"

**Good:**

> "Before writing code, propose a step-by-step plan for implementing email/password login using Clerk, tRPC, and Postgres. Include routes, mutations, and schema updates. Wait for my approval."

### 2. Be Specific

**Bad:**

> "Add a toast to the app"

**Good:**

> "In `@layout.tsx`, add a shadcn `Toaster` component"

### 3. Give Examples and Context

**Example:**

> "Follow the `createUserInput` Zod schema format in `schemas/user.ts`"

### 4. Use Constraints

- "Do not create new libraries"
- "Avoid `any`; use explicit types or infer from Zod"
- "Never test against real DB—use mocks"

### 5. Keep Tight Scope

**Bad:**

> "Add Stripe billing to the app"

**Good:**

> "Add POST `/api/billing/checkout` endpoint that creates Stripe Checkout session for current user (see `@user.tsx`). Use `stripe-node`."

### 6. When in Doubt, Ramble

Longer prompts often work better:

> "So here's what I'm trying to do. I've got this React form, and I want to submit it to a tRPC endpoint, but I need to validate it with Zod first. We're using React Hook Form and shadcn components."

## The Compounding Problem

AI mistakes compound because AI uses flawed code as context for future changes.

### Prevention

1. **Regular Reflection** - Use `reflect` frequently
2. **Code Reviews** - Check for anti-patterns
3. **Incremental Validation** - Test after each change
4. **Reset Context** - Start fresh when errors compound

### Warning Signs

- Inconsistent explanations
- Contradictory statements
- Overly complex solutions for simple problems
- Ignoring previous context

### Intervention Techniques

```markdown
> Pause. Tell me what you've learned and what the next steps should be.
> Before continuing, summarize what we're trying to achieve and why.
> I think we're off track. Let's step back and reconsider.
```

## Visual Design with ASCII

Use ASCII art for design visualization:

```
┌─────────────────────────────────────┐
│  Dashboard Layout                   │
├─────────────────────────────────────┤
│  Header: Logo | Nav | User Menu     │
├─────────────────────────────────────┤
│  Sidebar │ Main Content Area        │
│  - Home   │ ┌─────────────────────┐ │
│  - Users  │ │   Content Cards    │ │
│           │ │   ┌─────┐ ┌─────┐ │ │
│           │ │   │Card1│ │Card2│ │ │
│           │ └─────────────────────┘ │
└─────────────────────────────────────┘
```

## Database Integration

Use psql for local development:

```sql
-- Quick lookup
SELECT * FROM users WHERE email = 'user@example.com';

-- Table structure
\d users

-- Monitor queries
SELECT * FROM pg_stat_activity WHERE state = 'active';
```

Benefits: immediate feedback, quick debugging, real-time validation.

## HTTP Requests

Get AI to handle HTTP requests properly:

```bash
curl -H "Authorization: Bearer $TOKEN" \
     -H "Content-Type: application/json" \
     -v https://api.example.com/users

curl -I https://api.example.com/data  # Check cache headers
```

## Cloud Infrastructure

Let AI manage cloud resources:

```bash
# Create instance
gcloud compute instances create my-instance \
    --zone=us-central1-a \
    --machine-type=e2-medium

# Deploy
gcloud app deploy

# Create database
gcloud sql instances create my-db \
    --database-version=POSTGRES_14
```

## What AI Is Bad At

### Automatic Context Management

AI doesn't gather context automatically. You must explicitly open files and add them to context.

### TypeScript Types

AI often gives up on types and uses `as any`. This is likely a tooling issue—Cursor may not expose npm module types properly.

### Automatic Planning

AI jumps straight into coding. Always request a plan upfront.

### Taste & Architecture

AI lacks design pattern sense and modularity. That's your job.

## Best Practices

1. **Start with Planning** - Use `review-plan` for complex features
2. **Use Reflection Regularly** - Make `reflect` a habit
3. **Provide Complete Context** - Give AI everything it needs
4. **Monitor and Intervene** - Watch for compounding errors
5. **Document Decisions** - Use `technical-proposal` for important choices
6. **Close the Loop** - Let AI execute commands directly
7. **Iterate Quickly** - Small changes, frequent validation

## Advanced Techniques

### Iterative Refinement

1. Initial implementation
2. Use `reflect` to identify improvements
3. Implement changes
4. Validate
5. Repeat

### Context Management

- Maintain relevant context in conversation
- Reset when context becomes cluttered
- Document decisions with technical proposals

### ASCII Architecture

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Client    │───▶│   Gateway   │───▶│   Service   │
└─────────────┘    └─────────────┘    └─────────────┘
                           │
                           ▼
                   ┌─────────────┐
                   │  Database   │
                   └─────────────┘
```

## Key Takeaways

- Set up strong scaffolding and type-safe context
- Codify conventions in `.cursor/rules`
- Load all relevant files into Cursor's context
- Use planning mode on top-tier models
- Lint, typecheck, and test after each execution
- Embrace audio-first prompting
- Close the loop—let AI do everything

## Conclusion

Vibe coding shifts focus from implementation to design. Success requires:

- **Strategic Planning** - Use `review-plan` and planning features
- **Regular Reflection** - Use `reflect` to catch issues early
- **Comprehensive Documentation** - Use `technical-proposal` for decisions
- **Vigilant Monitoring** - Watch for compounding errors
- **Proper Setup** - Strong scaffolds, rules, context management
- **Effective Prompting** - Clear, specific, well-structured communication
