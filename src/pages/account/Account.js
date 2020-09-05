import React, { useState, useEffect } from 'react'
import { 
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native'

import AccountHeader from './AccountHeader'
// import { queryFavoriteList } from '../../js/utils/storage'
import { queryFavoriteList, queryHistoryList } from '../../js/utils/realm'

export default function Account(props) {

  const [favoriteList, setFavoriteList] = useState([])
  const [historyList, setHistoryList] = useState([])
  const [selectIndex, setSelectIndex] = useState(0)

  useEffect(() => {
    setFavoriteList(queryFavoriteList())
    setHistoryList(queryHistoryList())
    return () => {}
  }, [])

  const topBarSelected = (index) => {
    setSelectIndex(index)
  }

  const gotoPlayDetail = (item) => {
    props.navigation.navigate("playerDetail", item)
  }

  return (
    <View style={styles.container}>
      <AccountHeader {...props} topBarSelected={topBarSelected}/>
      <View style={styles.playAllBox}>
        <TouchableOpacity style={styles.playAll}>
          <Image style={styles.playIcon} source={require('../../images/small_play_163.png')}/>
          <Text style={styles.playTxt}>播放全部</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.list}
        keyExtractor={(item)=>item.id.toString()}
        data={ selectIndex === 1 ? historyList : favoriteList }
        renderItem={({ item })=>{
          const { picUrl, name, singer } = item
          return (
            <View style={styles.renderItem}>
              <TouchableOpacity style={styles.wrapper} onPress={()=>(gotoPlayDetail(item))}>
                <Image style={styles.image} source={{ uri: picUrl }} defaultSource={require('../../images/loading.png')}/>
                <View style={styles.right}>
                  <Text style={styles.title} numberOfLines={1}>{ name }</Text>
                  <Text style={styles.desc} numberOfLines={1}>{ singer }</Text>
                </View>
              </TouchableOpacity>
            </View>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center"
  },
  playAllBox: {
    height: 60,
    display: "flex",
    alignItems: "center"
  },
  playAll: {
    marginTop: 10,
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderWidth: 0.5,
    borderColor: '#ff0000',
    borderRadius: 20
  },
  playIcon: {
    width: 20,
    height: 20
  },
  playTxt: {
    marginLeft: 8,
    color: '#666'
  },
  list: {
    flex: 1
  },
  renderItem: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5
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