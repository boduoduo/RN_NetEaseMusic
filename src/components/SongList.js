import React from 'react'
import { 
  View, 
  FlatList, 
  Text, 
  StyleSheet, 
  Dimensions,
  TouchableOpacity,
  Image
} from 'react-native'

export default function SongList(props) {

  const { list } = props

  const renderRow = ({item}) => {
    const { name, picUrl, singer } = item
    return (
      <View style={styles.renderItem}>
        <TouchableOpacity style={styles.wrapper} onPress={()=>{
          props.itemClicked(item)
        }}>
          <Image style={styles.image} source={{ uri: picUrl }} defaultSource={require('../images/loading.png')}/>
          <View style={styles.right}>
          <Text style={styles.title} numberOfLines={1}>{ name }</Text>
          <Text style={styles.desc} numberOfLines={1}>{ singer }</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.topTitle}>最新音乐</Text>
      <FlatList
        scrollEnabled={false}
        style={styles.list}
        data={list}
        renderItem={renderRow}
        keyExtractor={item=>item.id}
        ItemSeparatorComponent={()=><View style={styles.separator}></View>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.width,
    backgroundColor: '#fff'
  },
  topTitle: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 17,
    color: '#666'
  },
  list: {
    width: Dimensions.width,
  },
  renderItem: {
    padding: 10
  },
  wrapper: {
    display: "flex",
    flexDirection: 'row'
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10
  },
  right: {
    flex: 1,
    marginLeft: 15,
    marginRight: 12,
    display: 'flex',
    justifyContent: 'center'
  },
  title: {
    color: '#666',
    fontSize: 17,
    fontWeight: 'bold',
  },
  desc: {
    color: '#666',
    marginTop: 10,
    fontSize: 12,
  },
  separator: {
    marginLeft: 10,
    marginRight: 10,
    height: 0.5,
    backgroundColor: '#ccc'
  }
})
