import { createContext, useContext, useEffect, useState } from 'react'

// Smart polling configuration
export const SMART_POLLING_INTERVALS = {
  active: 15 * 1000, // 15 seconds when active
  inactive: 60 * 1000, // 1 minute when inactive
  background: 2 * 60 * 1000, // 2 minutes when in background
} as const

export type PollingState = 'active' | 'inactive' | 'background'

export interface SmartPollingContextValue {
  pollingState: PollingState
  refetchInterval: number
  isActive: boolean
}

export const SmartPollingContext =
  createContext<SmartPollingContextValue | null>(null)

/**
 * Hook to track user activity and determine polling state
 */
function useActivityState() {
  const [isVisible, setIsVisible] = useState(() =>
    typeof window !== 'undefined' ? !document.hidden : true,
  )
  const [isFocused, setIsFocused] = useState(() =>
    typeof window !== 'undefined' ? document.hasFocus() : true,
  )

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden)
    }

    const handleFocus = () => {
      setIsFocused(true)
    }

    const handleBlur = () => {
      setIsFocused(false)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('focus', handleFocus)
    window.addEventListener('blur', handleBlur)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('focus', handleFocus)
      window.removeEventListener('blur', handleBlur)
    }
  }, [])

  return { isVisible, isFocused }
}

/**
 * Hook that provides smart polling context value
 */
export function useSmartPollingProvider(): SmartPollingContextValue {
  const { isVisible, isFocused } = useActivityState()

  const pollingState: PollingState = (() => {
    if (!isVisible) {
      return 'background'
    }
    if (isVisible && isFocused) {
      return 'active'
    }
    return 'inactive'
  })()

  const refetchInterval = SMART_POLLING_INTERVALS[pollingState]
  const isActive = pollingState === 'active'

  return {
    pollingState,
    refetchInterval,
    isActive,
  }
}

/**
 * Hook to access the global smart polling state
 */
export function useSmartPolling(): SmartPollingContextValue {
  const context = useContext(SmartPollingContext)

  if (!context) {
    // Fallback for when used outside provider
    console.warn(
      'useSmartPolling used outside SmartPollingProvider, using fallback values',
    )
    return {
      pollingState: 'inactive',
      refetchInterval: SMART_POLLING_INTERVALS.inactive,
      isActive: false,
    }
  }

  return context
}

/**
 * Hook for components that need custom polling behavior
 * This provides the standard query options with smart polling applied
 */
export function useSmartPollingOptions(overrides?: {
  activeInterval?: number
  inactiveInterval?: number
  backgroundInterval?: number
}) {
  const { pollingState, isActive } = useSmartPolling()

  const getInterval = () => {
    switch (pollingState) {
      case 'active':
        return overrides?.activeInterval ?? SMART_POLLING_INTERVALS.active
      case 'background':
        return (
          overrides?.backgroundInterval ?? SMART_POLLING_INTERVALS.background
        )
      default:
        return overrides?.inactiveInterval ?? SMART_POLLING_INTERVALS.inactive
    }
  }

  return {
    refetchInterval: getInterval(),
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    // Reduce stale time when active for more responsive updates
    staleTime: isActive ? 15 * 1000 : 30 * 1000,
  }
}
