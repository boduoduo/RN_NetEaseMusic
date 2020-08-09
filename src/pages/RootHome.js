import React from 'react'
import { Text } from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'
import Recommend from './Recommend'
import Singer from './Singer'
import Rank from './Rank'
import Search from './Search'

export default function RootHome() {
  return (
    <ScrollableTabView
      tabBarActiveTextColor="#d43c33" // 选中的文本颜色
      tabBarInactiveTextColor="#666"
      tabBarBackgroundColor="#f5f5f5"
      tabBarUnderlineStyle={{backgroundColor: '#d43c33', height: 2}}
      initialPage={0} // 默认定位到哪个Tab
      renderTabBar={()=><ScrollableTabBar style={{
          height: 44,
          borderWidth:0,
          elevation:2,
        }} 
        tabStyle={{height: 43 }}/>}
      >
        <Recommend tabLabel='推荐'/>
        <Singer tabLabel='歌手'/>
        <Rank tabLabel='排行'/>
        <Search tabLabel='搜索'/>
    </ScrollableTabView>
  )
}
