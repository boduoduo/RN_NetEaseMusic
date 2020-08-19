import React, { createContext, useReducer } from 'react'
import { reducer, defaultState } from './reducer'

export const PlayerContext = createContext({})

export const Player = (props) => {
  const [state, dispatch] = useReducer(reducer, defaultState)
  return (
    <PlayerContext.Provider value={{ state, dispatch }}>
      {props.children}
    </PlayerContext.Provider>
  )
}