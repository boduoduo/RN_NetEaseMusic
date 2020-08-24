import React, { useState } from 'react'
import { 
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native'

export default function AccountHeader(props) {
  const [selectIndex, setSelectIndex] = useState(0)

  const back = () => {
    props.navigation.pop()
  }

  const topSelected = (index) => {
    if (index === selectIndex) {
      return
    }
    setSelectIndex(index)
    props.topBarSelected(index)
  }

  return (
    <View style={styles.container}>
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={back}>
          <Image
            style={styles.leftImage} 
            source={require('../../images/back_163.png')}
          />
        </TouchableOpacity>
        <View style={styles.middle}>
          <TouchableOpacity 
            style={{ backgroundColor: selectIndex === 0 ? 'rgba(255, 255, 255, 0.3)' : null }}
            onPress={()=>topSelected(0)}
          >
            <Text style={styles.topTxt}>我喜欢的</Text>
          </TouchableOpacity>
          <View style={styles.separator}></View>
          <TouchableOpacity 
            style={{ backgroundColor: selectIndex === 1 ? 'rgba(255, 255, 255, 0.3)' : null }}
            onPress={()=>topSelected(1)}
          >
            <Text style={styles.topTxt}>最近听的</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Image
            style={styles.rightImage} 
            source={require('../../images/more_163.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
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
    justifyContent: 'space-between',
    alignItems: "center"
  },
  middle: {
    display: "flex",
    flexDirection: "row",
    height: 30,
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#fff'
  },
  topTxt: {
    flex: 1,
    lineHeight: 30,
    color: '#fff',
    fontSize: 15,
    fontWeight: "bold",
    paddingLeft: 10,
    paddingRight: 10,
  },
  separator: {
    height: 30,
    width: 0.5,
    backgroundColor: '#fff'
  },
  leftImage: {
    marginLeft: 5,
    width: 30,
    height: 30,
  },
  rightImage: {
    marginRight: 7,
    width: 30,
    height: 30
  }
})
