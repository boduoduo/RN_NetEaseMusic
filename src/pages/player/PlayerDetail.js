import React, { useState, useEffect } from 'react'
import { 
  View,
  Image,
  StyleSheet,
  Dimensions
 } from 'react-native'

import { getSongDetail } from '../../js/api/index'

 import PlayerHeader from './PlayerHeader.js'

export default function PlayerDetail(props) {

  const [picUrl, setPicUrl] = useState(null)
  const { width, height } = Dimensions.get('window')

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

  return (
    <View style={styles.container}>
      <Image
        style={{...styles.bgImage, width: width, height: height}}
        source={{ uri: picUrl }}
        defaultSource={require('../../images/loading.png')} 
      />
      <PlayerHeader back={back} />
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
  }
})