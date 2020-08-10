import React from 'react'
import { View, Text } from 'react-native'

import SubHeader from '../components/SubHeader'

export default function Detail(props) {

  const params = props.navigation.state.params
  console.log(params)

  const back = () => {
    props.navigation.pop()
  }

  return (
    <View>
      <SubHeader back={back}/>
      <Text>OFDOFD</Text>
    </View>
  )
}
