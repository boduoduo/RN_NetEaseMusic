import React, { useState } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
 } from 'react-native'

export default function OtherRank(props) {
  const { list, name } = props

  return (
    <View>
      <Text style={styles.title}>{name}</Text>
      <View style={styles.pullBox}>
        {
          list.map((item, index) => {
            let { rank } = item
            return (
              <TouchableOpacity style={styles.item} onPress={()=>props.itemClicked(item)}>
                <View style={styles.imageBox}>
                  <Image source={{ uri: rank.coverImgUrl }} style={styles.image} defaultSource={require('../../images/loading.png')}/>
                  <Text style={styles.tip}>{ rank.updateFrequency }</Text>
                </View>
              <Text style={styles.desc}>{ rank.name }</Text>
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

  },
  title: {
    fontSize: 17,
    color: '#666',
    margin: 12,
    fontWeight: 'bold',
    marginBottom: 6
  },
  pullBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-around',
    flexWrap: "wrap"
  },
  item: {
    // width: 100,
    paddingTop: 6,
    paddingBottom: 6,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  imageBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8
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
  desc: {
    marginTop: 10,
    color: '#666',
    fontSize: 12
  }
})
