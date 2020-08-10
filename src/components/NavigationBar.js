import React from 'react'
import { 
  View, 
  Text, 
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native'
import PropTypes from 'prop-types'

export default function NavigationBar(props) {

  const clickedTitle = () => {
    Alert.alert('clicked title')
  }

  const clickedLeftImage = () => {
    Alert.alert('clicked left image')
  }

  const clickedRightImage = () => {
    Alert.alert('clicked right image')
  }

  let { title } = props

  return (
    <View style={styles.container}>
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={clickedLeftImage}>
          <Image
            style={styles.leftImage} 
            source={require('../images/logo_163.png')}
          />
        </TouchableOpacity>
        <Text style={styles.title} onPress={clickedTitle}>{title}</Text>
        <TouchableOpacity onPress={clickedRightImage}>
          <Image
            style={styles.rightImage} 
            source={require('../images/account_163.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

NavigationBar.propTypes = {
  title: PropTypes.string
}

NavigationBar.defaultProps = {
  title: '网易云音乐'
}

const styles = StyleSheet.create({
  container: {
    left: 0,
    right: 0,
    height: 64,
    backgroundColor: '#d43c33',
    paddingTop: 20,
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
    marginLeft: 0,
    width: 44,
    height: 44,
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
    marginRight: 0,
    width: 44,
    height: 44
  }
})