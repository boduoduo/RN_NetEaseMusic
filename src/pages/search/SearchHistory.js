import React from 'react'
import { 
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native'


export default function SearchHistory(props) {
  let { historyList } = props

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={item=>item.id}
        data={historyList}
        renderItem={({ item })=>{
          const { word } = item
          return (
            <View style={styles.item}>
              <Image 
                style={styles.clock} 
                source={require('../../images/clock.png')}
              />
              <Text 
               style={styles.searchTxt}
               onPress={()=>props.fillKeywordToInput(word)}
              >{ word }</Text>
              <TouchableOpacity onPress={()=>props.deleteSearchWord(word)}>
                <Image
                  style={styles.delete}
                  source={require('../../images/small_del_163.png')} 
                />
              </TouchableOpacity>
            </View>
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
    marginLeft: 12,
    height: 40,
    lineHeight: 40
  },
  delete: {
    marginRight: 12,
    width: 30,
    height: 30
  }
})
