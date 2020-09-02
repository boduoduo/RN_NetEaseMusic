import React, { useState, useEffect, useMemo, useContext } from 'react'
import { 
  View, 
  Image,
  Text,
  TouchableOpacity, 
  StyleSheet
} from 'react-native'

import Slider from 'react-native-slider'
import { formartTime } from '../../js/utils/utils'
import mode from '../../store/mode'
import { PlayerContext } from '../../store/store'
import { SET_MODE_TYPE } from '../../store/actionTypes'
import { isFavorited } from '../../js/utils/realm'

export default function PlayerBottom(props) {
  const { state, dispatch } = useContext(PlayerContext)
  // 播放模式
  const { playMode } = state

  const { currentTime, duration, isPlaying, id } = props
  const [playIcon, setPlayIcon] = useState(require('../../images/pause_163.png'))
  // 喜欢状态
  const [favoriteStatus, setFavoriteStatus] = useState(isFavorited(id))
  const [favoriteImage, setFavoriteImage] = useState(require('../../images/un_favorite_163.png'))
  // 模式图片
  const [modeIcon, setModeIcon] = useState(require('../../images/loop_163.png'))
  
  const formartDuration = useMemo(() => {
    let { minute, second } = formartTime(duration)
    console.log(minute, second)
    return minute + ':' + second
  }, [duration])
  const formartCurrentTime = useMemo(() => {
    let { minute, second } = formartTime(currentTime)
    let progress = 0
    if (duration === 0) {
      progress = 0
    } else {
      progress = currentTime / duration
    }
    return {
      time: minute + ':' + second,
      progress
    }
  }, [currentTime])

  useEffect(() => {
    setPlayIcon(isPlaying ? require('../../images/pause_163.png') : require('../../images/play_163.png'))
    return () => {}
  }, [isPlaying])

  useEffect(() => {
    setFavoriteImage(favoriteStatus ? require('../../images/favorite_163.png') : require('../../images/un_favorite_163.png'))
    return () => {}
  }, [favoriteStatus])

  useEffect(() => {
    if (playMode === mode.loop) {
      setModeIcon(require('../../images/loop_163.png'))
    } else if (playMode === mode.one) {
      setModeIcon(require('../../images/one_163.png'))
    } else if (playMode === mode.random) {
      setModeIcon(require('../../images/shuffle_163.png'))
    }
    return () => {}
  }, [playMode])

  useEffect(() => {
    
    return () => {}
  }, [])

  // 切换播放模式
  const modeChange = () => {
    let play_mode = mode.loop
    if (playMode === mode.loop) {
      play_mode = mode.one
    } else if (playMode === mode.one) {
      play_mode = mode.random
    } else if (playMode === mode.random) {
      play_mode = mode.loop
    }
    dispatch({type: SET_MODE_TYPE, mode: play_mode})
  }

  const valueChanged = (value) => {
    props.slideValueChanged(value)
  }

  return (
    <View style={styles.container}>
      {/* 进度条 */}
      <View style={styles.progressBar}>
        <Text style={styles.time}>{formartCurrentTime.time}</Text>
        <Slider
          style={ styles.slide } 
          minimumTrackTintColor="#fff" 
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#fff"
          thumbStyle={{ width: 10, height: 10 }}
          minimumValue={0}
          maximumValue={1}
          value={formartCurrentTime.progress}
          onValueChange={valueChanged}
        />
        <Text style={styles.time}>{formartDuration}</Text>
      </View>
      {/* 播放控制 */}
      <View style={styles.controll}>
        {/* 播放模式 */}
        <TouchableOpacity onPress={modeChange}>
          <Image style={styles.item} source={modeIcon}/>
        </TouchableOpacity>
        {/* 上一首 */}
        <TouchableOpacity onPress={()=>(console.log('pre song'))}>
          <Image style={styles.item} source={require('../../images/prev_163.png')}/>
        </TouchableOpacity>
        {/* 播放/暂停 */}
        <TouchableOpacity onPress={()=>{
          props.playClicked()
        }}>
          <Image style={styles.item} source={playIcon}/>
        </TouchableOpacity>
        {/* 下一首 */}
        <TouchableOpacity>
          <Image style={styles.item} source={require('../../images/next_163.png')}/>
        </TouchableOpacity>
        {/* 喜欢 */}
        <TouchableOpacity onPress={()=>{
          setFavoriteStatus(!favoriteStatus)
          props.favoriteBtnClicked(!favoriteStatus)
        }}>
          <Image style={styles.item} source={favoriteImage}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  controll: {
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 10,
    paddingBottom: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    width: 40,
    height: 40
  },
  progressBar: {
    flex: 1,
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center"
  },
  slide: {
    marginLeft: 5,
    marginRight: 5,
    width: 200,
  },
  time: {
    fontSize: 12,
    color: '#fff'
  }
})
