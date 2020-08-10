import React from 'react'
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet,
  Dimensions
 } from 'react-native'
 import PropTypes from 'prop-types'

export default function SubHeader(props) {

  const back = () => {
    props.back()
  }

  const clickedRight = () => {

  }

  const { title } = props

  return (
    <View style={styles.container}>
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={back}>
          <Image
            style={styles.leftImage} 
            source={require('../images/back_163.png')}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={clickedRight}>
          <Image
            style={styles.rightImage} 
            source={require('../images/more_163.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

SubHeader.propTypes = {
  title: PropTypes.string
}

SubHeader.defaultProps = {
  title: '网易云音乐'
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.width,
    height: 64,
    backgroundColor: '#d43c33',
    paddingTop: 20
  },
  bottomContainer: {
    position: 'relative',
    flex: 1,
    height: 44,
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  leftImage: {
    marginLeft: 5,
    marginTop: 7,
    width: 30,
    height: 30,
  },
  title: {
    position: 'absolute',
    left: 44,
    right: 44,
    color: '#fff',
    fontSize: 18,
    height: 44,
    lineHeight: 44,
    textAlign: "center",
  },
  rightImage: {
    marginRight: 7,
    marginTop: 7,
    width: 30,
    height: 30
  }
})
