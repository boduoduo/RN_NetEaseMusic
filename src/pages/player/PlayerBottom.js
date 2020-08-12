import React, { useState, useEffect, useMemo } from 'react'
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

export default function PlayerBottom(props) {
  const { currentTime, duration, isPlaying } = props
  const [playIcon, setPlayIcon] = useState(require('../../images/pause_163.png'))
  // 喜欢状态
  const [favoriteStatus, setFavoriteStatus] = useState(false)
  const [favoriteImage, setFavoriteImage] = useState(require('../../images/un_favorite_163.png'))
  // 播放模式
  const [playMode, setPlayMode] = useState(mode.loop)
  // 模式图片
  const [modeIcon, setModeIcon] = useState(require('../../images/loop_163.png'))
  
  const formartDuration = useMemo(() => {
    let { minute, second } = formartTime(duration)
    return minute + ':' + second
  }, [duration])
  const formartCurrentTime = useMemo(() => {
    let { minute, second } = formartTime(currentTime)
    return minute + ':' + second
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

  // 切换播放模式
  const modeChange = () => {
    if (playMode === mode.loop) {
      setPlayMode(mode.one)
    } else if (playMode === mode.one) {
      setPlayMode(mode.random)
    } else if (playMode === mode.random) {
      setPlayMode(mode.loop)
    }
  }

  return (
    <View style={styles.container}>
      {/* 进度条 */}
      <View style={styles.progressBar}>
        <Text style={styles.time}>{formartCurrentTime}</Text>
        <Slider
          style={ styles.slide } 
          minimumTrackTintColor="#fff" 
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#fff"
          thumbStyle={{ width: 10, height: 10 }}
          minimumValue={0}
          maximumValue={1}
          value={0.3}
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
        <TouchableOpacity>
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
