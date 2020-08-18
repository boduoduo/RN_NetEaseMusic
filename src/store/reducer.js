import { SET_MODE_TYPE, SET_IS_PLAYING } from './actionTypes'

export const reducer = (state, action) => {
  console.log(state, 'action');
  if (action.type === SET_MODE_TYPE) {
    // 修改播放模式
    let newState = JSON.parse(JSON.stringify(state))
    newState.playMode = action.mode
    return newState

  } else if (action.type === SET_IS_PLAYING) {
    // 修改播放状态
    console.log(state, 'action');
    let newState = JSON.parse(JSON.stringify(state))
    newState.isPlaying = action.isPlaying
    return newState
  }
  return state
}