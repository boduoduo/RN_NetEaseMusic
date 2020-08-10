import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native'

import {
  getMyBanner,
  getNewestAlbum,
  getPersonalized,
  getNewestSong
} from '../js/api/index'

import Banner from '../components/Banner'
import Personalized from '../components/Personalized'
import SongList from '../components/SongList'

export default function Recommend(props) {
  const [banner, setBanner] = useState([])
  const [personalize, setPersonalize] = useState([])
  const [albums, setAlbums] = useState([])
  const [songs, setSongs] = useState([])
  
  useEffect(() => {
    // 获取banner
    getMyBanner().then((res) => {
      if (res.code === 200) {
        setBanner(res.banners || [])
      }
    })
    // 获取推荐歌单
    getPersonalized().then((res) => {
      if (res.code === 200) {
        setPersonalize(res.result || [])
      }
    })
    // 获取最新专辑
    getNewestAlbum().then((res) => {
      if (res.code === 200) {
        setAlbums(res.albums || [])
      }
    })
    // 获取最新歌单
    getNewestSong().then((res) => {
      if (res.code === 200) {
        let list = []
        res.result.forEach(value => {
          let obj = {}
          obj.id = value.id
          obj.name = value.name
          obj.picUrl = value.picUrl
          let singer = ''
          for (let i = 0; i < value.song['artists'].length; i++) {
            if (i === 0) {
              singer = value.song['artists'][i].name
            } else {
              singer += '-' + value.song['artists'][i].name
            }
          }
          obj.singer = singer
          list.push(obj)
        })
        setSongs(list)
      }
    })
    return () => {
      
    }
  }, [])

  const personalizeClicked = (item) => {
    props.gotoDetail(item)
  }

  return (
    <ScrollView>
      <Banner banner={banner}/>
      <Personalized list={personalize} itemClicked={personalizeClicked}/>
      <Personalized list={albums} title={'最新专辑'} itemClicked={personalizeClicked}/>
      <SongList list={songs}/>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 100,
  }
})