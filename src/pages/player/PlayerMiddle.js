import React, { useState, useEffect, useRef, useContext } from 'react'
import { 
  Text,
  View,
  FlatList,
  StyleSheet,
  Animated,
  Easing
 } from 'react-native'

import Swiper from 'react-native-swiper'
import * as Animatable from 'react-native-animatable'
import { PlayerContext } from '../../store/store'

export default function PlayerMiddle(props) {
  const { state, dispatch } = useContext(PlayerContext)
  const { songLyric } = state
  const { rotateImage, isPlaying, currentTime } = props
  const [currentIdx, setCurrentIdx] = useState(0)
  const lyricList = useRef(null)
  const animateImage = useRef(null)
  // 第一句歌词
  const [songDesc, setSongDesc] = useState(null)
  // 歌词列表
  const [list, setList] = useState([])

  useEffect(() => {
    let lyrics = []
    for (const key in songLyric) {
      if (songLyric[key]) {
        lyrics.push({ id: key, key, lyric: songLyric[key]})
      }
    }
    // 第一句歌词
    if (lyrics.length > 0) {
      setSongDesc(lyrics[0].lyric || '')
    }
    setList(lyrics)
    return () => {}
  }, [songLyric])

  useEffect(() => {
    if (isPlaying) {
      rotateAnim()
    } else {
      spinValue.stopAnimation()
    }
    return () => {}
  }, [isPlaying])

  // 歌词滚动同步
  useEffect(() => {
    if (list.length < 0) {
      return
    }
    for (let index = list.length-1; index >= 0; index--) {
      let time = parseFloat(list[index].key)
      if (time < currentTime) {
        setCurrentIdx(index)
        break
      }
    }
    return () => {}
  }, [currentTime])

  useEffect(() => {
    if (lyricList && list.length > 0) {
      setSongDesc(list[currentIdx].lyric || '')
      lyricList.current.scrollToIndex({ viewPosition: 0.5, index: currentIdx })
    }
    return () => {}
  }, [currentIdx])

  const spinValue = useRef(new Animated.Value(0)).current;

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  const rotateAnim = () => {
    // Animated.loop(
    //   Animated.timing(
    //     spinValue,
    //     {
    //       toValue: 1,
    //       duration: 10000,
    //       easing: Easing.linear,
    //       useNativeDriver: true
    //     }
    //   )
    // ).start()
    spinValue.setValue(0)
    Animated.timing(
      spinValue,
      {
        toValue: 1,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: false
      }
    ).start((e) => {
      if (e.finished) {
        rotateAnim()
      }
    })
  }

  const rotate = {
    from: {
      rotate: '0deg',
    },
    to: {
      rotate: '360deg',
    }
  }

  return (
    <View style={styles.container}>
      <Swiper style={styles.wrapper} loop={false}>
        <View style={styles.slide1}>
          {/* <Animatable.Image
            ref={animateImage}
            animation={rotate}
            delay={1000}
            duration={8000}
            direction="normal"
            iterationCount="infinite"
            easing="linear"
            useNativeDriver
            style={styles.poster}
            source={{ uri: rotateImage }}
          /> */}
          <Animated.Image
            style={[styles.poster, 
              {
                transform: [{rotate: spin}] 
              }
            ]}
            source={{ uri: rotateImage }}
          />
          <Text style={styles.songDesc}>{ songDesc }</Text>
        </View>
        <View style={styles.slide2}>
          {
            list.length > 0 ?
            <FlatList
              ref={lyricList}
              data={list}
              style={{ paddingLeft: 30, paddingRight: 30 }}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index})=>{
                return (
                  <Text
                    style={{
                      ...styles.lyric, 
                      color: index === currentIdx ? '#fff':'#666', 
                      paddingBottom: index === list.length-1 ? 250:10 }}
                    >{item.lyric}
                  </Text>
                )
              }}
            />
            :
            <Text style={styles.noLyric}>该歌曲暂无歌词</Text>
          }
        </View>
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 120,
  },
  wrapper: {
  },
  slide1: {
    flex: 1,
    alignItems: 'center',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  },
  poster: {
    marginTop: 30,
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 5,
    borderColor: '#fff'
  },
  songDesc: {
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    color: '#fff',
    fontSize: 17,
  },
  lyric: {
    marginTop: 5,
    marginBottom: 5,
    color: '#666',
    fontSize: 15,
    height: 18,
    textAlign: "center"
  },
  noLyric: {
    color: '#fff',
    fontSize: 18
  }
})
