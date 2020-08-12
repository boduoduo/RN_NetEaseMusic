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

export default function PlayerDetail(props) {

  const [picUrl, setPicUrl] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  // 音频总时长
  const [duration, setDuration] = useState(0)
  // 当前播放时间
  const [currentTime, setCurrentTime] = useState(0)
  const video = useRef(null)
  const { width, height } = Dimensions.get('window')
  const songURL = 'http://m7.music.126.net/20200812210457/4db29a430492b96a1b47bdd90f2f654a/ymusic/e7c5/84f9/897e/a897fda63f7e9f788eac7abbc0bf8602.mp3'

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
    // 当前播放时间点
    setCurrentTime(e.currentTime)
    // 总时长
    setDuration(e.playableDuration)
  }

  return (
    <View style={styles.container}>
      <Image
        style={{...styles.bgImage, width: width, height: height}}
        source={{ uri: picUrl }}
        defaultSource={require('../../images/loading.png')}
      />
      <BlurView
        style={styles.bgImage}
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      />
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
    // opacity: 0.6
  },
  content: {
    flex: 1,
    position: 'relative'
  }
})