import React from 'react'
import { View, StyleSheet } from 'react-native'
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'

import Recommend from './Recommend'
import Singer from './Singer'
import Rank from './Rank'
import Search from './Search'
import NavigationBar from '../components/NavigationBar'

export default function RootHome(props) {

  const gotoDetail = (params) => {
    props.navigation.navigate("detail", params)
  }

  return (
    <View style={styles.container}>
      <NavigationBar/>
      <ScrollableTabView
        tabBarActiveTextColor="#d43c33" // 选中的文本颜色
        tabBarInactiveTextColor="#666"
        tabBarBackgroundColor="#f5f5f5"
        tabBarUnderlineStyle={{ backgroundColor: '#d43c33', height: 2 }}
        initialPage={0} // 默认定位到哪个Tab
        renderTabBar={()=><ScrollableTabBar style={{
            height: 44,
            borderWidth:0,
            elevation:2,
          }}
          tabStyle={{height: 43, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}/>}
        >
          <Recommend tabLabel='推荐' gotoDetail={gotoDetail}/>
          <Singer tabLabel='歌手'/>
          <Rank tabLabel='排行'/>
          <Search tabLabel='搜索'/>
      </ScrollableTabView>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})