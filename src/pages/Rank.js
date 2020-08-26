import React, { useEffect, useState } from 'react'
import { 
  View,
  StyleSheet,
  ScrollView
} from 'react-native'

import OfficialRank from './rank/OfficialRank'
import OtherRank from './rank/OtherRank'

import { getTopListDetail } from '../js/api/index'

export default function Rank(props) {

  const [officialList, setOfficialList] = useState([])
  const [allList, setAllList] = useState([])

  useEffect(() => {
    getTopListDetail().then((res) => {
      if (res.officialList) {
        setOfficialList(res.officialList)
      }
      setAllList(res)
    })
    return () => {}
  }, [])

  const itemClicked = (item) => {
    props.navigation.navigate("detail", {...item, sourceType: 'rank'})
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <OfficialRank list={officialList} itemClicked={itemClicked}/>
        {
          Object.keys(allList).map((key, index) => {
            const itemList = allList[key]
            const name = allList.titles[key]
            // globalList 的rank对象解析有问题
            if (key !== 'officialList' && key !== 'titles') {
              return <OtherRank list={itemList} name={name} itemClicked={itemClicked}/> 
            }
          })
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})