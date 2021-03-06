import React, { useState, useEffect } from 'react'
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
import { getSearchList, getSearchHot } from '../js/api/index'
import { insertSearchWords, querySearchList, deleteSearchWords } from '../js/utils/realm'

export default function Search(props) {
  const [historyList, setHistoryList] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const [hotSearchs, setHotSearchs] = useState([])
  const [keywords, setKeywords] = useState(null)

  useEffect(() => {
    // 热门搜索
    getSearchHot().then((res)=>{
      if (res.code === 200) {
        setHotSearchs((res.result || {}).hots || [])
      }
    })
    // 历史搜索
    setHistoryList(querySearchList())
    return () => {}
  }, [])

  useEffect(() => {
    if (keywords == '') {
      setSuggestions([])
      return
    }
    let valid = true
    if (!valid) {
      return
    }
    valid = false
    setTimeout(() => {
      getSearchList({ 'keywords': keywords }).then((res)=>{
        if (res.code === 200) {
          setSuggestions((res.result || {}).songs || [])
        }
      })
      valid = true
    }, 800)
    return () => {}
  }, [keywords])

  const valueChanged = (e) => {
    setKeywords(e)
  }

  const hotItemClicked = (item) => {
    setKeywords(item.first || '')
  }

  const suggestionClicked = (item) => {
    props.gotoPlayDetail(item)
    insertSearchWords(keywords)
  }

  const deleteSearchWord = (word) => {
    deleteSearchWords(word)
    setTimeout(() => {
      setHistoryList(querySearchList())
    }, 500)
  }

  const fillKeywordToInput = (word) => {
    setKeywords(word)
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <Image style={styles.leftImage} source={require('../images/search_icon.png')}/>
        <TextInput 
          style={styles.input}
          placeholder='搜索歌曲、歌手、专题'
          maxLength={100}
          onChangeText={valueChanged}
          value={keywords}
          clearButtonMode="while-editing"
        />
      </View>
      {
        suggestions.length > 0 && keywords !== '' ?
        // 搜索得到的
        <SearchSuggestion suggestions={suggestions} suggestionClicked={suggestionClicked} />
        :
        <View>
          {/* 热门搜索 */}
          <HotSearch 
            hotSearchs={hotSearchs} 
            hotItemClicked={hotItemClicked}
          />
          <SearchHistory 
            historyList={historyList} 
            deleteSearchWord={deleteSearchWord}
            fillKeywordToInput={fillKeywordToInput}
          />
        </View>
      }
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
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