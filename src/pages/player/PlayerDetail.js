import React, { useState, useEffect, useRef } from 'react'
import { 
  View,
  Image,
  StyleSheet,
  Dimensions
 } from 'react-native'
// import { BlurView } from 'react-native-blur'
// import Video from 'react-native-video'
import { getSongDetail } from '../../js/api/index'

 import PlayerHeader from './PlayerHeader'
 import PlayerBottom from './PlayerBottom'
 import PlayerMiddle from './PlayerMiddle'

export default function PlayerDetail(props) {

  const [picUrl, setPicUrl] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  // 音频总时长
  const [duration, setDuration] = useState(180)
  // 当前播放时间
  const [currentTime, setCurrentTime] = useState(0)
  const video = useRef(null)
  const { width, height } = Dimensions.get('window')
  const songURL = 'http://m8.music.126.net/20200812155709/cfcea20d2487bd2cefff0aae16406b73/ymusic/900c/c2c8/2c61/98f3b38b4accaa32ccc9f7cf149bc067.mp3'

  useEffect(() => {
    getSongDetail({ids: '28949444'}).then((res)=>{
      if (res.code === 200) {
        const song = res.songs[0]
        setPicUrl(song.al.picUrl)
      }
    })
    return () => {}
  }, [])

  const back = () => {
    props.navigation.pop()
  }

  const onLoad = (data) => {
    console.log('on load')
  }

  const onEnd = () => {
    console.log('play end')
  }

  const onProgress = (e) => {
    console.log(e)
    setCurrentTime(e.currentTime)
  }

  return (
    <View style={styles.container}>
      <Image
        style={{...styles.bgImage, width: width, height: height}}
        source={{ uri: picUrl }}
        defaultSource={require('../../images/loading.png')}
      />
      {/* <BlurView
        style={styles.bgImage}
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      /> */}
      <PlayerHeader back={back} />
      <View style={styles.content}>
        <PlayerMiddle/>
        {/* 播放控制+进度条 */}
        <PlayerBottom 
          currentTime={currentTime}
          duration={duration}
          isPlaying={isPlaying}
          playClicked={()=>(setIsPlaying(!isPlaying))}
        />
      </View>
      {/* <Video
        ref={video}
        source={{ uri: songURL }}
        paused={!isPlaying}							
        onLoad={onLoad}			
        volume={1.0}
        onEnd={onEnd}
        playInBackground={true}
        onProgress={onProgress}
        playWhenInactive={true}
      /> */}
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
    // opacity: 0.6
  },
  content: {
    flex: 1,
    position: 'relative'
  }
})