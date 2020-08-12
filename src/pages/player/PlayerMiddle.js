import React, { useState, useEffect, useRef } from 'react'
import { 
  Text,
  View,
  Image,
  FlatList,
  StyleSheet
 } from 'react-native'

import Swiper from 'react-native-swiper'
import * as Animatable from 'react-native-animatable'

export default function PlayerMiddle() {

  const [currentIdx, setCurrentIdx] = useState(0)
  const lyricList = useRef(null)

  const [list, setList] = useState([
    { id: 1, lyric: '麦克奎格软件感染' },
    { id: 2, lyric: '麦克奎格软件感染感染可容纳抗感染感染' },
    { id: 3, lyric: '麦克奎格软件感染感染可容纳抗感染感染' },
    { id: 4, lyric: '麦克奎格软件感染感染可容纳抗感染感染' },
    { id: 5, lyric: '麦克奎格软件感染感染可容纳抗感染感染' },
    { id: 6, lyric: '麦克奎格软件感' },
    { id: 7, lyric: '麦克奎格软件感染感染可容纳抗感染感染' },
    { id: 8, lyric: '麦克奎格软件感染感染可' },
    { id: 9, lyric: '麦克奎格软件感染感染可容纳抗感染感染' },
    { id: 10, lyric: '麦克奎' },
    { id: 11, lyric: '麦克奎格软件感染感染可容纳抗感' },
    { id: 12, lyric: '麦克奎格软件感染感染可容纳抗感染感染' },
    { id: 13, lyric: '麦克奎格软件感染感染' },
    { id: 14, lyric: '麦克奎格软件感染感染可容纳抗感染感染' },
    { id: 25, lyric: '麦克奎格软件感染感染染' },
    { id: 36, lyric: '麦克奎格软件感染感染可容感染' },
    { id: 41, lyric: '麦克奎格软件感染感染可容' },
    { id: 51, lyric: '麦克奎格软件' },
    { id: 61, lyric: '麦克奎格软件感染感染可容纳抗感染感染' },
    { id: 71, lyric: '麦克奎格软件感染感染可容纳抗' },
    { id: 81, lyric: '麦克奎格软件' },
    { id: 91, lyric: '麦克奎格软件感染感染可容纳抗感染感染' },
    { id: 101, lyric: '麦克奎格软件感染感染可容纳染' },
    { id: 111, lyric: '麦克奎格软件感染感染可容纳抗感染感' },
    { id: 121, lyric: '麦克奎格软件感染感染可' },
    { id: 131, lyric: '麦克奎格软件感染感染' },
  ])

  const itemClicked = (item, index) => {
    setCurrentIdx(index)
    lyricList.current.scrollToIndex({ viewPosition: 0.5, index: index })
  }

  const rotate = {
    from: {
      opacity: 0
    },
    to: {
      opacity: 1
    }
  }

  return (
    <View style={styles.container}>
      <Swiper style={styles.wrapper} loop={false}>
        <View style={styles.slide1}>
          <Animatable.View animation={rotate} duration={2}>
            <Image style={styles.poster} source={{ uri: 'https://p1.music.126.net/JOJvZc_7SqQjKf8TktQ_bw==/29686813951246.jpg' }}/>
          </Animatable.View>
          <Text style={styles.songDesc}>作词：黄家驹</Text>
        </View>
        <View style={styles.slide2}>
          <FlatList
            ref={lyricList}
            data={list}
            style={{ paddingLeft: 30, paddingRight: 30 }}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index})=>{
              return (
                <Text 
                  onPress={()=>{
                    itemClicked(item, index)
                  }}
                  style={{...styles.lyric, 
                    color: index === currentIdx ? '#fff':'#666', 
                    marginBottom: index === list.length-1 ? 250:10 }}
                  >{item.lyric}
                </Text>
              )
            }}
          />
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
    color: '#fff',
    fontSize: 17,
  },
  lyric: {
    marginTop: 10,
    marginBottom: 10,
    color: '#666',
    fontSize: 15,
    height: 16,
    textAlign: "center"
  }
})
