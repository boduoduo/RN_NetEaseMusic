import React from 'react'
import { 
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from 'react-native'

export default function SearchSuggestion(props) {
  const { suggestions } = props

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={suggestions}
        keyExtractor={(item)=>item.id}
        renderItem={({item})=>{
          return (
            <TouchableOpacity style={styles.item} onPress={()=>(props.suggestionClicked(item))}>
              <Image 
                style={styles.searchIcon} 
                source={require('../../images/search_icon.png')}
              />
              <Text style={styles.desc} numberOfLines={1} >{ item.name } - { item.artists[0].name }</Text>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    color: '#666'
  }
})
