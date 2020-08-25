import React, { useState, useEffect } from 'react'
import { 
  View, 
  Text,
  Image,
  SectionList,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import { getAllArtists } from '../js/api/index'

export default function Singer(props) {
  const [list, setList] = useState([])

  useEffect(() => {
    getAllArtists().then((res) => {
      let tempArr = res.keys.map((item, index) => {
        let tempData = {}
        tempData.key = item
        tempData.data = res.list[index]
        return tempData
      })
      setList(tempArr)
    })
    return () => {}
  }, [])

  return (
    <View style={styles.container}>
      <SectionList
        style={styles.list}
        sections={list}
        keyExtractor={(item, index) => item + index }
        renderItem={({ item })=>{
          return (
            <TouchableOpacity style={styles.item} onPress={()=>{
              props.navigation.navigate("detail", {...item, sourceType: 'singer'})
            }}>
              <Image style={styles.avatar} source={{ uri: item.img1v1Url }} defaultSource={require('../images/loading.png')}/>
              <Text style={styles.singer}>{ item.name }</Text>
            </TouchableOpacity>
          )
        }}
        renderSectionHeader={({ section: { key } })=>{
          return (
            <View style={styles.section}>
              <Text style={styles.title}>{ key }</Text>
            </View>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {

  },
  item: {
    display: "flex",
    flexDirection: 'row',
    alignItems: "center",
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5
  },
  avatar: {
    width: 40, 
    height: 40,
    borderRadius: 20
  },
  singer: {
    marginLeft: 10,
    color: '#666',
    fontSize: 13
  },
  section: {
    backgroundColor: '#d43c33',
    height: 30,
  },
  title: {
    marginLeft: 12,
    fontSize: 15,
    color: '#fff',
    lineHeight: 30,
    fontWeight: "bold"
  }

})