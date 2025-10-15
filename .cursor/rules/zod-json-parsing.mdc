---
alwaysApply: true
description: Requires Zod validation for all JSON parsing operations
---

# JSON Parsing - MANDATORY Zod Validation

## NEVER USE TYPE ASSERTIONS FOR JSON

**VIOLATION EXAMPLES (DO NOT DO THIS):**

```typescript
// ❌ WRONG: Type assertion
const result = (await response.json()) as SomeType

// ❌ WRONG: Unsafe parsing
const body = await request.json()
const { field } = body

// ❌ WRONG: Any type
const data: any = await response.json()
```

**CORRECT APPROACH - ALWAYS USE ZOD:**

```typescript
// ✅ CORRECT: Zod schema validation
const resultSchema = z.object({
  success: z.boolean(),
  data: z.string(),
})

const result = resultSchema.parse(await response.json())

// ✅ CORRECT: Request body parsing
const requestSchema = z.object({
  retailerId: z.string().uuid(),
  force: z.boolean().optional(),
})

const body = requestSchema.parse(await request.json())
```

## MANDATORY PATTERNS

### 1. Define Zod Schema First

```typescript
// Always define the schema before parsing
const apiResponseSchema = z.object({
  message: z.string(),
  data: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    }),
  ),
})

type ApiResponse = z.infer<typeof apiResponseSchema>
```

### 2. Parse with Error Handling

```typescript
// Handle Zod validation errors gracefully
try {
  const parsed = schema.parse(rawData)
  return parsed
} catch (error) {
  console.error('Validation failed:', error)
  throw new Error('Invalid data format')
}
```

### 3. API Endpoint Pattern

```typescript
export const POST: APIRoute = async ({ request }) => {
  try {
    // Define schema for request body
    const requestSchema = z.object({
      field1: z.string(),
      field2: z.number().optional(),
    })

    // Parse with Zod (never type assertion)
    const body = requestSchema.parse(await request.json())

    // Use the validated data
    const result = await businessLogic(body)

    return new Response(JSON.stringify(result))
  } catch (error) {
    // Handle Zod validation errors
    return new Response('Invalid request', { status: 400 })
  }
}
```

### 4. External API Response Pattern

```typescript
// Always validate external API responses
const externalApiSchema = z.object({
  data: z
    .object({
      field: z.string(),
    })
    .optional(),
  errors: z
    .array(
      z.object({
        message: z.string(),
      }),
    )
    .optional(),
})

const response = await fetch(externalApi)
const validated = externalApiSchema.parse(await response.json())
```

## COMMON LOCATIONS REQUIRING ZOD

### ✅ API Route Handlers

- `await request.json()` → Always use Zod schema
- Request body parsing
- Query parameter validation

### ✅ External API Calls

- Third-party API responses (Browserless, OpenAI, etc.)
- Webhook payloads
- Configuration files

### ✅ Inter-Service Communication

- Worker function payloads
- tRPC procedure inputs (already handled by tRPC)
- Message queue payloads

## BENEFITS OF ZOD VALIDATION

- ✅ **Runtime Type Safety**: Catches invalid data at runtime
- ✅ **Clear Error Messages**: Descriptive validation errors
- ✅ **Documentation**: Schema serves as API documentation
- ✅ **TypeScript Integration**: Automatic type inference
- ✅ **Transformation**: Built-in data coercion and defaults

## COST OF VIOLATIONS

Using type assertions or unsafe JSON parsing leads to:

- ❌ Runtime errors from invalid data
- ❌ Security vulnerabilities
- ❌ Difficult-to-debug issues
- ❌ Linting warnings/errors
- ❌ Loss of type safety benefits

**REMEMBER: If you're parsing JSON, you MUST use Zod. No exceptions.**
