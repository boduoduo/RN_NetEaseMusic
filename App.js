/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet
} from 'react-native';
import NavigationBar from './src/components/NavigationBar'
// import { createStackNavigator } from 'react-navigation-stack'
// import { createAppContainer } from 'react-navigation'
import RootHome from './src/pages/RootHome'
import Detail from './src/pages/Detail'

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

// const AppNavigator = createStackNavigator(
//   {
//     home: RootHome,
//     detail: Detail
//   },
//   {
//     initialRouteName: 'home'
//   }
// )

// const AppContainer = createAppContainer(AppNavigator)

const App = () => {
  return (
    <>
      <NavigationBar/>
      <RootHome/>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.red,
  }
});

export default App;
