/** 
 * 根控制器入口
 */

import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import RootHome from './src/pages/RootHome'
import Detail from './src/pages/Detail'

const AppNavigator = createStackNavigator(
  {
    home: RootHome,
    detail: Detail
  },
  {
    initialRouteName: 'home',
    defaultNavigationOptions: {
      header: null
    }
  }
)

const AppContainer = createAppContainer(AppNavigator)

const App = () => {
  return <AppContainer/>
}

export default App;
