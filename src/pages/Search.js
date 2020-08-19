import React, { useState } from 'react'
import { 
  View,
  Text,
  TextInput,
  Image,
  StyleSheet 
} from 'react-native';

export default function Search() {

  const searchIcon = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg=='

  return (
    <View>
      <View style={styles.searchBox}>
        <Image style={styles.leftImage} source={{ uri:  searchIcon}} onLoad={(e)=>(console.log(e))} onError={(e)=>(console.log(e, 'error'))}/>
        <TextInput 
          style={styles.input}
          placeholder='搜索歌曲、歌手、专题'
          maxLength={100}
        />
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  searchBox: {
    margin: 15,
    backgroundColor: '#ebecec',
    borderRadius: 20,
    height: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  leftImage: {
    width: 20,
    height: 20
  },
  input: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    height: 40,
  }
})