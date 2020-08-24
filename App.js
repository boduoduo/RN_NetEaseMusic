/** 
 * 根控制器入口
 */

import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import RootHome from './src/pages/RootHome'
import Detail from './src/pages/Detail'
import PlayerDetail from './src/pages/player/PlayerDetail'
import Account from './src/pages/account/Account'
import { Player } from './src/store/store'

const AppNavigator = createStackNavigator(
  {
    home: RootHome,
    detail: Detail,
    playerDetail: PlayerDetail,
    account: Account
  },
  {
    initialRouteName: 'home',
    defaultNavigationOptions: {
      // 隐藏导航栏
      headerShown: false
    }
  }
)

const AppContainer = createAppContainer(AppNavigator)

const App = () => {
  return (
    <Player>
      <AppContainer/>
    </Player>
  )
}

export default App;
