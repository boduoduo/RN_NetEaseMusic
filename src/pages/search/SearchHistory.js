import React, { useState } from 'react'
import { 
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native'


export default function SearchHistory() {
  const [list, setList] = useState([
    {id: 1, name: '毛发看'},
    {id: 2, name: '毛发看'},
    {id: 3, name: '毛发看'},
    {id: 4, name: '毛发看'},
  ])

  return (
    <View style={styles.container}>
      <FlatList
        data={list}
        renderItem={()=>{
          return (
            <View style={styles.item}>
              <Image 
                style={styles.clock} 
                source={require('../../images/clock.png')}
              />
              <Text style={styles.searchTxt}>jiangnan</Text>
              <Image 
                style={styles.delete}
                source={require('../../images/small_del_163.png')} 
              />
            </View>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
  },
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
    height: 40
  },
  clock: {
    marginLeft: 12,
    width: 25,
    height: 25
  },
  searchTxt: {
    flex: 1,
    color: '#666',
    marginLeft: 12
  },
  delete: {
    marginRight: 12,
    width: 30,
    height: 30
  }
})
