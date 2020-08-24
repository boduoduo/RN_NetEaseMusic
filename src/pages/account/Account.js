import React from 'react'
import { 
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native'

import AccountHeader from './AccountHeader'

export default function Account(props) {

  const topBarSelected = (index) => {
    console.log(index)
  }

  return (
    <View style={styles.container}>
      <AccountHeader {...props} topBarSelected={topBarSelected}/>
      <View style={styles.playAll}>
        <Image source={require('../../images/small_play_163.png')}/>
        <Text>播放全部</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center"
  },
  playAll: {
    display: "flex",
    flexDirection: "row"
  }
})