import React, { createContext, useReducer } from 'react'
import mode from './mode'
import { reducer } from './reducer'

export const PlayerContext = createContext({})

export const Player = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    songs: ['大田在', '2'],
    // 当前播放状态
    isPlaying: false,
    // 当前播放模式
    playMode: mode.loop,
    // 当前歌词
    SongLyric: [],
    // 当前播放音乐索引
    currentIndex: 0,
    // 喜欢列表
    favoriteList: [],
    // 历史播放列表
    favoriteList: []
  })
  return (
    <PlayerContext.Provider value={{ state, dispatch }}>
      {props.children}
    </PlayerContext.Provider>
  )
}