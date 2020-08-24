import React, {useState} from 'react'
import { 
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

export default function HotSearch(props) {
  const { hotSearchs } = props

  return (
    <View style={styles.container}>
      <Text style={styles.tip}>热门搜索</Text>
      <View style={styles.songs}>
        {
          hotSearchs.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={()=>(props.hotItemClicked(item))}>
                <Text style={styles.songItem}>{ item.first }</Text>
              </TouchableOpacity>
            )
          })
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: 'blue'
  },
  tip: {
    marginLeft: 12,
    color: '#666',
    fontSize: 12
  },
  songs: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 12,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  songItem: {
    height: 30,
    color: '#666',
    fontSize: 12,
    lineHeight: 30,
    borderRadius: 15,
    borderColor: '#666',
    borderWidth: 0.5,
    paddingLeft: 12,
    paddingRight: 12,
    marginRight: 15,
    marginBottom: 12
  }
})