import React from 'react'
import { 
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
 } from 'react-native'

export default function PlayerHeader(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>{
        props.back()
      }}>
        <Image source={require('../../images/down_163.png')} style={styles.closeImage} />
      </TouchableOpacity>
      <View style={styles.titleView}>
        <Text style={styles.songName}>烟火里的尘埃</Text>
        <Text style={styles.singer}>化成雨</Text>
      </View>
      <View style={styles.right}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 64,
    paddingTop: 20,
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  closeImage: {
    marginLeft: 4.5,
    marginTop: 4.5,
    width: 35,
    height: 35,
  },
  titleView: {
    fontSize: 18,
    height: 44,
    lineHeight: 44,
    display: "flex",
    justifyContent: "center",
  },
  songName: {
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: "center",
    color: '#fff',
  },
  singer: {
    marginTop: 5,
    fontSize: 12,
    textAlign: "center",
    color: '#fff',
  },
  right: {
    marginRight: 4.5,
    marginTop: 4.5,
    width: 35,
    height: 35,
  }
})
