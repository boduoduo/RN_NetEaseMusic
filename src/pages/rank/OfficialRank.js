import React, { useState } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
 } from 'react-native'

export default function OfficialRank(props) {
  const { list } = props

  return (
    <View>
      <Text style={styles.title}>官方榜</Text>
      {
        list.map((item, index) => {
          return (
            <TouchableOpacity style={styles.item} onPress={()=>props.itemClicked(item)}>
              <View style={styles.left}>
                <Image source={{ uri: item.rank.coverImgUrl }} style={styles.image} defaultSource={require('../../images/loading.png')} />
                <Text style={styles.tip}>{ item.rank.updateFrequency }</Text>
              </View>
              <View style={styles.right}>
                {
                  (item.rank.tracks || []).map((song, idx) => {
                    return (
                      <Text style={styles.righTxt}>{ idx + 1 }.{song.first}-{song.second}</Text>
                    )
                  })
                }
              </View>
            </TouchableOpacity>
          )
        })
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  },
  title: {
    fontSize: 17,
    color: '#666',
    margin: 12,
    fontWeight: 'bold',
    marginBottom: 6
  },
  item: {
    paddingLeft: 12,
    paddingRight: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: "center",
    paddingTop: 6,
    paddingBottom: 6
  },
  left: {
    position: "relative"
  },
  image: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
    borderRadius: 8,
  },
  tip: {
    position: "absolute",
    bottom: 5,
    left: 0,
    right: 0,
    color: '#fff',
    textAlign: "center",
    fontSize: 12
  },
  right: {
    marginLeft: 10
  },
  righTxt: {
    color: '#666',
    fontSize: 13,
    paddingTop: 5,
    paddingBottom: 5
  }
})
