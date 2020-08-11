import React, { useState } from 'react'
import {
  FlatList,
  Text, 
  View, 
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image
} from 'react-native'
import PropTypes from 'prop-types'

export default function Personalized(props) {

  const { title, list, type } = props

  const renderRow = ({item, index}) => {
    const { name, picUrl } = item
    return (
      <View style={styles.renderItem}>
        <TouchableOpacity style={styles.renderBtn} onPress={()=>{
          props.itemClicked({...item, sourceType: type })
        }}>
          <Image style={styles.image} source={{ uri: picUrl }} defaultSource={require('../images/loading.png')}></Image>
          <Text style={styles.desc} numberOfLines={2}>{ name }</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{ title }</Text>
      <FlatList
        scrollEnabled={false}
        style={styles.listContainer}
        numColumns={3}
        data={list}
        renderItem={renderRow}
        keyExtractor={(item)=>item.id}
      />
    </View>
  )
}

Personalized.prototype = {
  title: PropTypes.string,
  list: PropTypes.array
}

Personalized.defaultProps = {
  title: '推荐歌单'
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    width: Dimensions.width,
    backgroundColor: '#fff'
  },
  title: {
    marginTop: 10,
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 17,
    color: '#666'
  },
  listContainer: {
    width: Dimensions.width,
    paddingTop: 10,
    paddingBottom: 10
  },  
  renderItem: {
    flex: 1,
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: "center"
  },
  image: {
    marginTop: 5,
    width: 100,
    height: 100,
    borderRadius: 10
  },
  desc: {
    width: 100,
    textAlign: 'center',
    color: '#666',
    marginTop: 5,
    fontSize: 12,
    lineHeight: 14
  },
  renderBtn: {
    flex: 1,
  }
})
