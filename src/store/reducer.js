import { SET_MODE_TYPE, SET_IS_PLAYING, SET_SONG_LYRIC } from './actionTypes'
import mode from './mode'
import { parseLyric } from '../js/utils/utils'

export const defaultState = {
  songs: [],
  // 当前播放状态
  isPlaying: false,
  // 当前播放模式
  playMode: mode.loop,
  // 当前歌词
  songLyric: {},
  // 当前播放音乐索引
  currentIndex: 0,
  // 喜欢列表
  favoriteList: [],
  // 历史播放列表
  favoriteList: []
}

export const reducer = (state = defaultState, action) => {
  // console.log(state, 'action');
  if (action.type === SET_MODE_TYPE) {
    // 修改播放模式
    let newState = JSON.parse(JSON.stringify(state))
    newState.playMode = action.mode
    return newState

  } else if (action.type === SET_IS_PLAYING) {
    // 修改播放状态
    let newState = JSON.parse(JSON.stringify(state))
    newState.isPlaying = action.isPlaying
    return newState

  } else if (action.type === SET_SONG_LYRIC) {
    // 当前播放的歌词
    let result = action.result
    let obj = {}
    if (result && result.lrc ) {
      obj = parseLyric(result.lrc.lyric || {})
    } 
    let newState = JSON.parse(JSON.stringify(state))
    newState.songLyric = obj
    return newState
  }
  return state
}