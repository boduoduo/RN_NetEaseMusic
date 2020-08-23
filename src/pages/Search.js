import React, { useState } from 'react'
import { 
  View,
  Text,
  TextInput,
  Image,
  StyleSheet 
} from 'react-native'
import HotSearch from './search/HotSearch'
import SearchSuggestion from './search/SearchSuggestion'
import SearchHistory from './search/SearchHistory'

export default function Search() {

  return (
    <View>
      <View style={styles.searchBox}>
        <Image style={styles.leftImage} source={require('../images/search_icon.png')}/>
        <TextInput 
          style={styles.input}
          placeholder='搜索歌曲、歌手、专题'
          maxLength={100}
        />
      </View>
      <HotSearch/>
      {/* <SearchSuggestion/> */}
      <SearchHistory/>
    </View>
  )
}


const styles = StyleSheet.create({
  searchBox: {
    margin: 15,
    backgroundColor: '#ebecec',
    borderRadius: 20,
    height: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  leftImage: {
    width: 20,
    height: 20,
    marginLeft: 10
  },
  input: {
    flex: 1,
    marginLeft: 5,
    marginRight: 20,
    height: 40,
  }
})