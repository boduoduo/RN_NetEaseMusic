import React, { useState } from 'react'
import { 
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from 'react-native'

export default function SearchSuggestion() {
  const [list, setList] = useState([
    {id: 1, name: '能丰非i违法i为和服饿哦饿'},
    {id: 2, name: '能丰非i违法i为和服饿哦饿'},
    {id: 3, name: '能丰非i违法i为和服饿哦饿'},
    {id: 4, name: '能丰非i违法i为和服饿哦饿'},
    {id: 5, name: '能丰非i违法i为和服饿哦饿'}
  ])

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={list}
        keyExtractor={(item)=>item.id}
        renderItem={({item})=>{
          return (
            <TouchableOpacity style={styles.item}>
              <Image 
                style={styles.searchIcon} 
                source={require('../../images/search_icon.png')}
              />
              <Text style={styles.desc}>{item.name}</Text>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
  },
  list: {
    // backgroundColor: 'red'
  },
  item: {
    height: 40,
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  searchIcon: {
    marginLeft: 12,
    width: 20,
    height: 20,
  },
  desc: {
    marginLeft: 10,
    color: '#666'
  }
})
