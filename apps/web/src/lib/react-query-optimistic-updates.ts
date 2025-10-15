/**
 * # Optimistic Updates Library with Local State Management
 *
 * This library provides a generic solution for implementing optimistic updates with React Query (TanStack Query) in TypeScript.
 * It uses local React state for instant UI updates, eliminating the lag associated with setQueryData.
 *
 * ## Overview
 *
 * Optimistic updates allow the UI to reflect changes immediately before the server confirms them,
 * providing a more responsive user experience. If the server request fails, the changes are rolled back automatically.
 *
 * ## How It Works
 *
 * 1. **Local State**: Maintains a local state of optimistic updates that are instantly applied
 * 2. **Merge Strategy**: Merges server data with optimistic updates in real-time
 * 3. **Automatic Cleanup**: Removes optimistic updates once server confirms the changes
 * 4. **Error Handling**: Rolls back optimistic updates if mutations fail
 *
 * ## Benefits
 *
 * - **Instant Updates**: No lag from React Query's setQueryData
 * - **Type-safe**: Full TypeScript support with proper type inference
 * - **Generic**: Works with any data structure
 * - **Automatic rollback**: Handles errors gracefully
 * - **Simple API**: Easy to integrate with existing mutations
 */

import type { QueryClient, QueryKey } from '@tanstack/react-query'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

interface OptimisticUpdate<TItem> {
  id: string
  type: 'create' | 'update' | 'delete'
  data?: TItem
  itemId?: string // For update/delete operations
  timestamp: number
}

interface UseOptimisticItemsOptions<TItem> {
  queryKey: QueryKey
  queryFn?: () => Promise<TItem[]>
  enabled?: boolean
}

interface OptimisticHandlers<TVariables, TContext = unknown> {
  onMutate: (variables: TVariables) => Promise<TContext> | TContext
  onSuccess: (data: any, variables: TVariables, context: TContext) => void
  onError: (
    error: unknown,
    variables: TVariables,
    context: TContext | undefined,
  ) => void
}

/**
 * Hook for managing optimistic updates with local state
 *
 * @param options Configuration for the optimistic updates
 * @returns Object with items (merged data), query state, and mutation handlers
 *
 * @example
 * ```typescript
 * const { items, isLoading, createHandlers, updateHandlers, deleteHandlers } = useOptimisticItems({
 *   queryKey: ['todos'],
 *   queryFn: fetchTodos,
 * })
 *
 * const createMutation = useMutation({
 *   mutationFn: api.createTodo,
 *   ...createHandlers((variables) => ({
 *     id: `temp-${Date.now()}`,
 *     ...variables,
 *     createdAt: new Date(),
 *   })),
 * })
 * ```
 */
export function useOptimisticItems<TItem extends { id: string }>(
  options: UseOptimisticItemsOptions<TItem>,
) {
  const { queryKey, queryFn, enabled = true } = options
  const queryClient = useQueryClient()

  // Query for server data
  const query = useQuery({
    queryKey,
    queryFn,
    enabled,
  })

  // Local state for optimistic updates
  const [optimisticUpdates, setOptimisticUpdates] = useState<
    OptimisticUpdate<TItem>[]
  >([])

  // Track which updates are being processed
  const processingUpdates = useRef<Set<string>>(new Set())

  // Merge server data with optimistic updates
  const items = useMemo(() => {
    const serverItems = query.data ?? []
    let result = [...serverItems]

    // Apply each optimistic update in order
    for (const update of optimisticUpdates) {
      switch (update.type) {
        case 'create':
          if (update.data) {
            // Only add if not already in the list
            const exists = result.some((item) => item.id === update.data!.id)
            if (!exists) {
              result.push(update.data)
            }
          }
          break
        case 'update':
          if (update.data && update.itemId) {
            const index = result.findIndex((item) => item.id === update.itemId)
            if (index !== -1) {
              result[index] = update.data
            }
          }
          break
        case 'delete':
          if (update.itemId) {
            result = result.filter((item) => item.id !== update.itemId)
          }
          break
      }
    }

    return result
  }, [query.data, optimisticUpdates])

  // Clean up confirmed updates when server data changes
  useEffect(() => {
    if (query.data) {
      setOptimisticUpdates((prev) =>
        prev.filter((update) => processingUpdates.current.has(update.id)),
      )
    }
  }, [query.data])

  // Create handlers for create mutations
  const createHandlers = useCallback(
    <TVariables>(
      createItem: (variables: TVariables) => TItem,
      generateId?: () => string,
    ): OptimisticHandlers<TVariables, { optimisticId: string }> => ({
      onMutate: (variables) => {
        const optimisticId = generateId
          ? generateId()
          : `optimistic-${Date.now()}-${Math.random()}`
        const optimisticItem = createItem(variables)

        processingUpdates.current.add(optimisticId)

        setOptimisticUpdates((prev) => [
          ...prev,
          {
            id: optimisticId,
            type: 'create',
            data: optimisticItem,
            timestamp: Date.now(),
          },
        ])

        return { optimisticId }
      },
      onSuccess: (data, variables, context) => {
        if (context?.optimisticId) {
          processingUpdates.current.delete(context.optimisticId)
        }
        void queryClient.invalidateQueries({ queryKey })
      },
      onError: (error, variables, context) => {
        if (context?.optimisticId) {
          processingUpdates.current.delete(context.optimisticId)
          setOptimisticUpdates((prev) =>
            prev.filter((update) => update.id !== context.optimisticId),
          )
        }
      },
    }),
    [queryClient, queryKey],
  )

  // Create handlers for update mutations
  const updateHandlers = useCallback(
    <TVariables extends { id: string }>(
      updateItem: (existingItem: TItem, variables: TVariables) => TItem,
    ): OptimisticHandlers<
      TVariables,
      { updateId: string; previousItem: TItem }
    > => ({
      onMutate: (variables) => {
        const updateId = `update-${Date.now()}-${Math.random()}`
        const currentItem = items.find((item) => item.id === variables.id)

        if (!currentItem) {
          throw new Error('Item not found')
        }

        const optimisticItem = updateItem(currentItem, variables)

        processingUpdates.current.add(updateId)

        setOptimisticUpdates((prev) => [
          ...prev,
          {
            id: updateId,
            type: 'update',
            data: optimisticItem,
            itemId: variables.id,
            timestamp: Date.now(),
          },
        ])

        return { updateId, previousItem: currentItem }
      },
      onSuccess: (data, variables, context) => {
        if (context?.updateId) {
          processingUpdates.current.delete(context.updateId)
        }
        void queryClient.invalidateQueries({ queryKey })
      },
      onError: (error, variables, context) => {
        if (context?.updateId) {
          processingUpdates.current.delete(context.updateId)
          setOptimisticUpdates((prev) =>
            prev.filter((update) => update.id !== context.updateId),
          )
        }
      },
    }),
    [items, queryClient, queryKey],
  )

  // Create handlers for delete mutations
  const deleteHandlers = useCallback(
    <TVariables extends { id: string }>(): OptimisticHandlers<
      TVariables,
      { deleteId: string; deletedId: string }
    > => ({
      onMutate: (variables) => {
        const deleteId = `delete-${Date.now()}-${Math.random()}`

        processingUpdates.current.add(deleteId)

        setOptimisticUpdates((prev) => [
          ...prev,
          {
            id: deleteId,
            type: 'delete',
            itemId: variables.id,
            timestamp: Date.now(),
          },
        ])

        return { deleteId, deletedId: variables.id }
      },
      onSuccess: (data, variables, context) => {
        if (context?.deleteId) {
          processingUpdates.current.delete(context.deleteId)
        }
        void queryClient.invalidateQueries({ queryKey })
      },
      onError: (error, variables, context) => {
        if (context?.deleteId) {
          processingUpdates.current.delete(context.deleteId)
          setOptimisticUpdates((prev) =>
            prev.filter((update) => update.id !== context.deleteId),
          )
        }
      },
    }),
    [queryClient, queryKey],
  )

  return {
    items,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    createHandlers,
    updateHandlers,
    deleteHandlers,
  }
}

/**
 * Hook for managing a single optimistic item
 *
 * @param options Configuration for the optimistic update
 * @returns Object with item data, query state, and update handlers
 *
 * @example
 * ```typescript
 * const { item, isLoading, updateHandlers } = useOptimisticItem({
 *   queryKey: ['user', userId],
 *   queryFn: () => fetchUser(userId),
 * })
 *
 * const updateMutation = useMutation({
 *   mutationFn: api.updateUser,
 *   ...updateHandlers((oldItem, updates) => ({ ...oldItem, ...updates })),
 * })
 * ```
 */
export function useOptimisticItem<TItem>(options: {
  queryKey: QueryKey
  queryFn?: () => Promise<TItem>
  enabled?: boolean
}) {
  const { queryKey, queryFn, enabled = true } = options
  const queryClient = useQueryClient()

  // Query for server data
  const query = useQuery({
    queryKey,
    queryFn,
    enabled,
  })

  // Local state for optimistic update
  const [optimisticData, setOptimisticData] = useState<TItem | null>(null)
  const [isOptimistic, setIsOptimistic] = useState(false)

  // Use optimistic data if available, otherwise use server data
  const item =
    isOptimistic && optimisticData !== null ? optimisticData : query.data

  // Clear optimistic data when server data changes
  useEffect(() => {
    if (query.data && isOptimistic) {
      // Use setTimeout to avoid synchronous state updates in effect
      setTimeout(() => {
        setIsOptimistic(false)
        setOptimisticData(null)
      }, 0)
    }
  }, [query.data, isOptimistic])

  // Create handlers for update mutations
  const updateHandlers = useCallback(
    <TVariables>(
      updateItem: (oldItem: TItem | undefined, variables: TVariables) => TItem,
    ): OptimisticHandlers<TVariables, { previousItem: TItem | undefined }> => ({
      onMutate: (variables) => {
        const previousItem = item
        const newItem = updateItem(previousItem, variables)

        setOptimisticData(newItem)
        setIsOptimistic(true)

        return { previousItem }
      },
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey })
      },
      onError: (error, variables, context) => {
        if (context?.previousItem !== undefined) {
          setOptimisticData(context.previousItem)
        } else {
          setIsOptimistic(false)
          setOptimisticData(null)
        }
      },
    }),
    [item, queryClient, queryKey],
  )

  return {
    item,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    updateHandlers,
  }
}

/**
 * Hook for managing optimistic updates with an existing query
 *
 * @param query Existing query result from React Query
 * @param queryKey Query key for invalidation
 * @returns Object with items (merged data), and mutation handlers
 *
 * @example
 * ```typescript
 * const query = trpc.todos.list.useQuery()
 * const { items, createHandlers } = useOptimisticItemsWithQuery(query, ['todos'])
 *
 * const createMutation = useMutation({
 *   mutationFn: api.createTodo,
 *   ...createHandlers((variables) => ({
 *     id: `temp-${Date.now()}`,
 *     ...variables,
 *   })),
 * })
 * ```
 */
export function useOptimisticItemsWithQuery<TItem extends { id: string }>(
  query: {
    data?: TItem[]
    isLoading: boolean
    isError: boolean
    error: unknown
    refetch: () => void
  },
  queryKey: QueryKey,
) {
  const queryClient = useQueryClient()

  // Local state for optimistic updates
  const [optimisticUpdates, setOptimisticUpdates] = useState<
    OptimisticUpdate<TItem>[]
  >([])

  // Track which updates are being processed
  const processingUpdates = useRef<Set<string>>(new Set())

  // Merge server data with optimistic updates
  const items = useMemo(() => {
    const serverItems = query.data ?? []
    let result = [...serverItems]

    // Apply each optimistic update in order
    for (const update of optimisticUpdates) {
      switch (update.type) {
        case 'create':
          if (update.data) {
            // Only add if not already in the list
            const exists = result.some((item) => item.id === update.data!.id)
            if (!exists) {
              result.push(update.data)
            }
          }
          break
        case 'update':
          if (update.data && update.itemId) {
            const index = result.findIndex((item) => item.id === update.itemId)
            if (index !== -1) {
              result[index] = update.data
            }
          }
          break
        case 'delete':
          if (update.itemId) {
            result = result.filter((item) => item.id !== update.itemId)
          }
          break
      }
    }

    return result
  }, [query.data, optimisticUpdates])

  // Clean up confirmed updates when server data changes
  useEffect(() => {
    if (query.data) {
      setOptimisticUpdates((prev) =>
        prev.filter((update) => processingUpdates.current.has(update.id)),
      )
    }
  }, [query.data])

  // Create handlers for create mutations
  const createHandlers = useCallback(
    <TVariables>(
      createItem: (variables: TVariables) => TItem,
      generateId?: () => string,
    ): OptimisticHandlers<TVariables, { optimisticId: string }> => ({
      onMutate: (variables) => {
        const optimisticId = generateId
          ? generateId()
          : `optimistic-${Date.now()}-${Math.random()}`
        const optimisticItem = createItem(variables)

        processingUpdates.current.add(optimisticId)

        setOptimisticUpdates((prev) => [
          ...prev,
          {
            id: optimisticId,
            type: 'create',
            data: optimisticItem,
            timestamp: Date.now(),
          },
        ])

        return { optimisticId }
      },
      onSuccess: (data, variables, context) => {
        if (context?.optimisticId) {
          processingUpdates.current.delete(context.optimisticId)
        }
        void queryClient.invalidateQueries({ queryKey })
      },
      onError: (error, variables, context) => {
        if (context?.optimisticId) {
          processingUpdates.current.delete(context.optimisticId)
          setOptimisticUpdates((prev) =>
            prev.filter((update) => update.id !== context.optimisticId),
          )
        }
      },
    }),
    [queryClient, queryKey],
  )

  // Create handlers for update mutations
  const updateHandlers = useCallback(
    <TVariables extends { id: string }>(
      updateItem: (existingItem: TItem, variables: TVariables) => TItem,
    ): OptimisticHandlers<
      TVariables,
      { updateId: string; previousItem: TItem }
    > => ({
      onMutate: (variables) => {
        const updateId = `update-${Date.now()}-${Math.random()}`
        const currentItem = items.find((item) => item.id === variables.id)

        if (!currentItem) {
          throw new Error('Item not found')
        }

        const optimisticItem = updateItem(currentItem, variables)

        processingUpdates.current.add(updateId)

        setOptimisticUpdates((prev) => [
          ...prev,
          {
            id: updateId,
            type: 'update',
            data: optimisticItem,
            itemId: variables.id,
            timestamp: Date.now(),
          },
        ])

        return { updateId, previousItem: currentItem }
      },
      onSuccess: (data, variables, context) => {
        if (context?.updateId) {
          processingUpdates.current.delete(context.updateId)
        }
        void queryClient.invalidateQueries({ queryKey })
      },
      onError: (error, variables, context) => {
        if (context?.updateId) {
          processingUpdates.current.delete(context.updateId)
          setOptimisticUpdates((prev) =>
            prev.filter((update) => update.id !== context.updateId),
          )
        }
      },
    }),
    [items, queryClient, queryKey],
  )

  // Create handlers for delete mutations
  const deleteHandlers = useCallback(
    <TVariables extends { id: string }>(): OptimisticHandlers<
      TVariables,
      { deleteId: string; deletedId: string }
    > => ({
      onMutate: (variables) => {
        const deleteId = `delete-${Date.now()}-${Math.random()}`

        processingUpdates.current.add(deleteId)

        setOptimisticUpdates((prev) => [
          ...prev,
          {
            id: deleteId,
            type: 'delete',
            itemId: variables.id,
            timestamp: Date.now(),
          },
        ])

        return { deleteId, deletedId: variables.id }
      },
      onSuccess: (data, variables, context) => {
        if (context?.deleteId) {
          processingUpdates.current.delete(context.deleteId)
        }
        void queryClient.invalidateQueries({ queryKey })
      },
      onError: (error, variables, context) => {
        if (context?.deleteId) {
          processingUpdates.current.delete(context.deleteId)
          setOptimisticUpdates((prev) =>
            prev.filter((update) => update.id !== context.deleteId),
          )
        }
      },
    }),
    [queryClient, queryKey],
  )

  return {
    items,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    createHandlers,
    updateHandlers,
    deleteHandlers,
  }
}

/**
 * Legacy functions for backward compatibility
 * These use setQueryData approach which may have slight lag
 */

// Define a base context interface that includes previousData
interface OptimisticContext<TData> {
  previousData: TData | undefined
}

export interface OptimisticUpdateOptions<
  TData,
  TVariables,
  TContext = OptimisticContext<TData>,
> {
  queryClient: QueryClient
  queryKey: QueryKey
  updateFn: (oldData: TData | undefined, variables: TVariables) => TData
  createContext?: (
    oldData: TData | undefined,
    variables: TVariables,
  ) => TContext
}

export interface OptimisticUpdateHandlers<TContext = unknown> {
  onMutate: (variables: any) => Promise<TContext>
  onError: (
    error: unknown,
    variables: any,
    context: TContext | undefined,
  ) => void
  onSettled: () => void
}

function hasPreviousData<TData>(
  context: unknown,
): context is OptimisticContext<TData> {
  return (
    context !== null && typeof context === 'object' && 'previousData' in context
  )
}

export function createOptimisticUpdateHandlers<
  TData,
  TVariables,
  TContext = OptimisticContext<TData>,
>(
  options: OptimisticUpdateOptions<TData, TVariables, TContext>,
): OptimisticUpdateHandlers<TContext> {
  const { queryClient, queryKey, updateFn, createContext } = options

  return {
    onMutate: async (variables: TVariables) => {
      await queryClient.cancelQueries({ queryKey })
      const previousData = queryClient.getQueryData<TData>(queryKey)
      queryClient.setQueryData<TData>(queryKey, (old) =>
        updateFn(old, variables),
      )

      if (createContext) {
        return createContext(previousData, variables)
      }

      return { previousData } as TContext
    },

    onError: (
      error: unknown,
      variables: TVariables,
      context: TContext | undefined,
    ) => {
      if (context && hasPreviousData<TData>(context)) {
        queryClient.setQueryData(queryKey, context.previousData)
      }
    },

    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey })
    },
  }
}

export function createOptimisticAddHandlers<
  TItem,
  TVariables extends Partial<TItem>,
>(
  queryClient: QueryClient,
  queryKey: QueryKey,
  createItem: (variables: TVariables) => TItem,
) {
  return createOptimisticUpdateHandlers<TItem[], TVariables>({
    queryClient,
    queryKey,
    updateFn: (oldData, variables) => {
      if (!oldData) {
        return [createItem(variables)]
      }
      return [...oldData, createItem(variables)]
    },
  })
}

export function createOptimisticUpdateItemHandlers<
  TItem extends { id: string },
  TVariables extends { id: string },
>(
  queryClient: QueryClient,
  queryKey: QueryKey,
  updateItem: (existingItem: TItem, variables: TVariables) => TItem,
) {
  return createOptimisticUpdateHandlers<TItem[], TVariables>({
    queryClient,
    queryKey,
    updateFn: (oldData, variables) => {
      if (!oldData) {
        return []
      }
      return oldData.map((item) =>
        item.id === variables.id ? updateItem(item, variables) : item,
      )
    },
  })
}

export function createOptimisticSingleItemHandlers<TItem, TVariables>(
  queryClient: QueryClient,
  queryKey: QueryKey,
  updateItem: (oldItem: TItem | undefined, variables: TVariables) => TItem,
) {
  return createOptimisticUpdateHandlers<TItem, TVariables>({
    queryClient,
    queryKey,
    updateFn: updateItem,
  })
}
