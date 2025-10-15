export function isError(value: unknown): value is Error {
  return Error.isError?.(value) ?? value instanceof Error
}
