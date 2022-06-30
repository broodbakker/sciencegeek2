import * as React from 'react'

type Action = { type: 'open' } | { type: 'close' }
type Dispatch = (action: Action) => void
type State = { isMenuOpen: boolean }
type isMenuOpenProviderProps = { children: React.ReactNode }

const IsMenuOpenStateContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined)

function isMenuOpenReducer(state: State, action: Action) {
  switch (action.type) {
    case 'open': {
      return { isMenuOpen: true }
    }
    case 'close': {
      return { isMenuOpen: false }
    }
    default: {
      throw new Error(`Unhandled action type: ${action}`)
    }
  }
}

function IsMenuOpenProvider({ children }: isMenuOpenProviderProps) {
  const [state, dispatch] = React.useReducer(isMenuOpenReducer, {
    isMenuOpen: false,
  })
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch }
  return (
    <IsMenuOpenStateContext.Provider value={value}>
      {children}
    </IsMenuOpenStateContext.Provider>
  )
}

function useIsMenuOpen() {
  const context = React.useContext(IsMenuOpenStateContext)
  if (context === undefined) {
    throw new Error('IsMenuOpen must be used within a IsMenuOpenProvider')
  }
  return context
}

export { IsMenuOpenProvider, useIsMenuOpen }
