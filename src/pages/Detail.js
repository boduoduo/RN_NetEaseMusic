import React, { useState, useEffect } from 'react'
import { 
  View, 
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions
 } from 'react-native'

import { getPlayList, getAlbumDetail, getArtistsDetail, getTopList } from '../js/api/index'

import SubHeader from '../components/SubHeader'


export default function Detail(props) {

  const [playlist, setPlaylist] = useState([])
  const [coverImgUrl, setCoverImgUrl] = useState(null)
  const [title, setTitle] = useState(null)

  const params = props.navigation.state.params
  const { id, sourceType } = params

  const back = () => {
    props.navigation.pop()
  }

  const { width } = Dimensions.get('window')

  useEffect(() => {
    if (sourceType === 'personalize') {
      getSubPlayList()
    } else if (sourceType === 'album') {
      getSubAlbumDetail()
    }
    
    return () => {}
  }, [])

  // 获取歌单详情
  const getSubPlayList = () => {
    getPlayList({ id: id }).then((res) => {
      if (res.code === 200) {
        const playlist = res.playlist || {}
        setPlaylist(playlist.tracks || [])
        setCoverImgUrl(playlist.coverImgUrl || '')
        setTitle(playlist.name || '')
      }
    })
  }
  // 获取专辑详情
  const getSubAlbumDetail = () => {
    getAlbumDetail({ id: id }).then((res)=>{
      if (res.code === 200) {
        const album = res.album || {}
        setPlaylist(res.songs || [])
        setCoverImgUrl(album.picUrl || '')
        setTitle(album.name || '')
      }
    })
  }
  // 歌手歌单详情
  const getSubArtistsDetail = () => {

  }
  // 排行榜歌单详情
  const getSubTopList = () => {

  }

  const header = () => {
    return (
      <View>
        <Image style={{ width: width, height: width }}  source={{uri: coverImgUrl}} defaultSource={require('../images/loading.png')}/>
        <View style={styles.playAll}>
          <TouchableOpacity>
            <Image style={styles.playIcon} source={require('../images/small_play_163.png')}/>
          </TouchableOpacity>
          <Text style={styles.playTxt}>播放全部</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <SubHeader back={back} title={title}/>
      <FlatList
        style={styles.listContainer}
        data={playlist}
        renderItem={({item})=>{
          return (
            <TouchableOpacity style={styles.renderItem} onPress={()=>{
              props.navigation.navigate("playerDetail", item)
            }}>
              <Text style={styles.title} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.desc} numberOfLines={1}>{item.al.name}--{item.ar[0].name}</Text>
            </TouchableOpacity>
          )
        }}
        keyExtractor={(item)=>item.id.toString()}
        ItemSeparatorComponent={()=><View style={styles.separator}></View>}
        ListHeaderComponent={header}
        ListHeaderComponentStyle={{ position: 'relative', width: width, height: width }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
  },
  renderItem: {
    padding: 10,
    display: 'flex',
    justifyContent: 'center'
  },
  title: {
    fontSize: 15,
    color: '#666',
    fontWeight: 'bold'
  },
  desc: {
    marginTop: 10,
    fontSize: 12,
    color: '#666'
  },
  separator: {
    height: 0.5,
    backgroundColor: '#ccc'
  },
  playAll: {
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    height: 44,
    right: 0,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc'
  },
  playIcon: {
    marginLeft: 10,
    width: 25,
    height: 25
  },
  playTxt: {
    marginLeft: 10,
    color: '#666',
    fontSize: 17
  }
})
