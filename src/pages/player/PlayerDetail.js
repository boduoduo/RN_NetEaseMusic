import React, { useState, useEffect, useRef, useContext } from 'react'
import { 
  View,
  Image,
  StyleSheet,
  Dimensions
 } from 'react-native'
import { BlurView } from 'react-native-blur'
import Video from 'react-native-video'
import { getSongDetail, getSongURL, getSongLyric } from '../../js/api/index'
import { PlayerContext } from '../../store/store'

import PlayerHeader from './PlayerHeader'
import PlayerBottom from './PlayerBottom'
import PlayerMiddle from './PlayerMiddle'
import { SET_IS_PLAYING, SET_SONG_LYRIC } from '../../store/actionTypes'

 export default  function PlayerDetail(props) {

  const params = props.navigation.state.params
  const { id } = params

  const { state, dispatch } = useContext(PlayerContext)

  const [picUrl, setPicUrl] = useState(null)
  const [songName, setSongName] = useState(null)
  const [singer, setSinger] = useState(null)

  const [isPlaying, setIsPlaying] = useState(false)
  // 音频总时长
  const [duration, setDuration] = useState(0)
  // 当前播放时间
  const [currentTime, setCurrentTime] = useState(0)
  const video = useRef(null)
  const { width, height } = Dimensions.get('window')
  const [songURL, setSongURL] = useState(null)
  const [ids, setIds] = useState(id)

  useEffect(() => {
    // 获取歌曲图片
    getSongDetail({ids: ids}).then((res)=>{
      if (res.code === 200) {
        const song = res.songs[0]
        setSongName(song.name)
        setPicUrl(song.al.picUrl)
        let singer = ''
        song['ar'].forEach((item, index) => {
          if (index == 0) {
            singer = item.name
          }else {
            singer += '-' + item.name
          }
        })
        // obj.singer = singer
        setSinger(singer)
      }
    })
    // 获取歌曲播放URL
    getSongURL({id: ids}).then((res)=>{
      if (res.code === 200) {
        for (let j = 0; j < res.data.length; j++) {
          const item = res.data[j]
          if (item.id == ids) {
              // obj.url = item.url
              setSongURL(item.url)
              break;
          }
        }
      }
    })
    // 获取歌词
    getSongLyric({ id: ids }).then((res)=>{
      if (res.code === 200) {
        dispatch({ type: SET_SONG_LYRIC, result: res})
      } else {
        dispatch({ type: SET_SONG_LYRIC, result: null})
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
    console.log('on load', data)
    setDuration(data.duration || 0)
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
    // setDuration(e.playableDuration)
  }

  const slideValueChanged = (value) => {
    let changedTime = duration * value
    setCurrentTime(changedTime)
    if (video) {
      video.current.seek(changedTime)
    }
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
        blurType="dark"
        blurAmount={10}
        reducedTransparencyFallbackColor="#fff"
      />
      <PlayerHeader back={back} songName={songName} singer={singer}/>
      <View style={styles.content}>
        <PlayerMiddle rotateImage={picUrl} isPlaying={isPlaying} currentTime={currentTime} />
        {/* 播放控制+进度条 */}
        <PlayerBottom
          currentTime={currentTime}
          duration={duration}
          isPlaying={isPlaying}
          playClicked={()=>{
            dispatch({type: SET_IS_PLAYING, isPlaying: !isPlaying})
            setIsPlaying(!isPlaying)
          }}
          slideValueChanged={slideValueChanged}
        />
      </View>
      {/* 音乐播放器 */}
      {
        songURL ? 
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
        :
        null
      }
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