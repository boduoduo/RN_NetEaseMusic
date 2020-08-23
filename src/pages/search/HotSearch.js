import React, {useState} from 'react'
import { 
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

export default function HotSearch() {

  const [list, setList] = useState([
    {id: 1, name: '守候'},
    {id: 2, name: 'Dynamic'},
    {id: 3, name: '像小强一样活着'},
    {id: 4, name: '天外来物'},
    {id: 5, name: 'TFBoys'},
    {id: 6, name: '爸爸我看见啥'},
    {id: 7, name: '蔡徐坤'},
    {id: 8, name: '无滤镜散发哦'},
  ])

  return (
    <View style={styles.container}>
      <Text style={styles.tip}>热门搜索</Text>
      <View style={styles.songs}>
        {
          list.map((item, index) => {
            return (
              <TouchableOpacity key={index}>
                <Text style={styles.songItem}>{ item.name }</Text>
              </TouchableOpacity>
            )
          })
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'blue'
  },
  tip: {
    marginLeft: 12,
    color: '#666',
    fontSize: 12
  },
  songs: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 12,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  songItem: {
    height: 30,
    color: '#666',
    fontSize: 12,
    lineHeight: 30,
    borderRadius: 15,
    borderColor: '#666',
    borderWidth: 0.5,
    paddingLeft: 12,
    paddingRight: 12,
    marginRight: 15,
    marginBottom: 12
  }
})