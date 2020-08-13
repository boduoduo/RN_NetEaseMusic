import React, { useState, useEffect, useRef } from 'react'
import { 
  View,
  Image,
  StyleSheet,
  Dimensions
 } from 'react-native'
import { BlurView } from 'react-native-blur'
import Video from 'react-native-video'
import { getSongDetail } from '../../js/api/index'

 import PlayerHeader from './PlayerHeader'
 import PlayerBottom from './PlayerBottom'
 import PlayerMiddle from './PlayerMiddle'

 export default  function PlayerDetail(props) {

  const [picUrl, setPicUrl] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  // 音频总时长
  const [duration, setDuration] = useState(0)
  // 当前播放时间
  const [currentTime, setCurrentTime] = useState(0)
  const video = useRef(null)
  const { width, height } = Dimensions.get('window')
  const songURL = 'http://m7.music.126.net/20200813161913/241f7f808674e618a2579ebcba010755/ymusic/900c/c2c8/2c61/98f3b38b4accaa32ccc9f7cf149bc067.mp3'

  useEffect(() => {
    getSongDetail({ids: '28949444'}).then((res)=>{
      if (res.code === 200) {
        const song = res.songs[0]
        setPicUrl(song.al.picUrl)
      }
    })
    return () => {
      // 页面销毁
      console.log('dealloc')
      setIsPlaying(false)
    }
  }, [])

  const back = () => {
    props.navigation.pop()
  }

  const onLoad = (data) => {
    console.log('on load')
  }

  const onEnd = () => {
    console.log('play end')
    // 播放结束后，如果是单曲循环则重新播放
    if (video) {
      video.current.seek(0)
    }
  }
  const onError = (error) => {
    console.log(error)
  }
  const onProgress = (e) => {
    // 当前播放时间点
    setCurrentTime(e.currentTime)
    // 总时长
    setDuration(e.playableDuration)
  }

  const slideValueChanged = (value) => {
    let changedTime = duration * value
    setCurrentTime(changedTime)
    if (video) {
      video.current.seek(changedTime)
    }
    console.log(value)
  }

  return (
    <View style={styles.container}>
      {/* 背景图 */}
      <Image
        style={{...styles.bgImage, width: width, height: height}}
        source={{ uri: picUrl }}
        defaultSource={require('../../images/loading.png')}
      />
      {/* 毛玻璃 */}
      <BlurView
        style={{ width: width, height: height, position: 'absolute' }}
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="#fff"
      />
      <PlayerHeader back={back} />
      <View style={styles.content}>
        <PlayerMiddle rotateImage={picUrl} isPlaying={isPlaying} />
        {/* 播放控制+进度条 */}
        <PlayerBottom 
          currentTime={currentTime}
          duration={duration}
          isPlaying={isPlaying}
          playClicked={()=>(setIsPlaying(!isPlaying))}
          slideValueChanged={slideValueChanged}
        />
      </View>
      {/* 音乐播放器 */}
      <Video
        ref={video}
        source={{ uri: songURL }}
        paused={!isPlaying}							
        onLoad={onLoad}			
        volume={1.0}
        onEnd={onEnd}
        playInBackground={true}
        onProgress={onProgress}
        playWhenInactive={true}
        onError={onError}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  bgImage: {
    position: 'absolute',
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    position: 'relative'
  }
})

// let instance = null

// class Player {
//   constructor() {
//     if (instance === null) {
//       instance = PlayerDetail()
//     }
//     return instance
//   }

//   static shareInstance() {
//     let instance = new Player()
//     return instance
//   }
// }

// export default Player.shareInstance()