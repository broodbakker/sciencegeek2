import * as React from 'react'

type Action = { type: 'open' } | { type: 'close' }
type Dispatch = (action: Action) => void
type State = { isSearchMenuOpen: boolean }
type isSearchMenuOpenProviderProps = { children: React.ReactNode }

const IsSearchMenuOpenStateContext = React.createContext<
  { state: State; dispatchMenu: Dispatch } | undefined
>(undefined)

function isSearchMenuOpenReducer(state: State, action: Action) {
  switch (action.type) {
    case 'open': {
      return { isSearchMenuOpen: true }
    }
    case 'close': {
      return { isSearchMenuOpen: false }
    }
    default: {
      throw new Error(`Unhandled action type: ${action}`)
    }
  }
}

function IsSearchMenuOpenProvider({ children }: isSearchMenuOpenProviderProps) {
  const [state, dispatchMenu] = React.useReducer(isSearchMenuOpenReducer, {
    isSearchMenuOpen: false,
  })
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatchMenu }
  return (
    <IsSearchMenuOpenStateContext.Provider value={value}>
      {children}
    </IsSearchMenuOpenStateContext.Provider>
  )
}

function useIsSearchMenuOpen() {
  const context = React.useContext(IsSearchMenuOpenStateContext)
  if (context === undefined) {
    throw new Error('IsSearchMenuOpen must be used within a IsSearchMenuOpenProvider')
  }
  return context
}

export { IsSearchMenuOpenProvider, useIsSearchMenuOpen }
