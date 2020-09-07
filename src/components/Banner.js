import React from 'react'
import { 
  View,
  StyleSheet,
  Dimensions, 
  Image, 
  TouchableOpacity
} from 'react-native'
import Swiper from 'react-native-swiper'

export default function Banner(props) {

  const { banner } = props

  return (
    <View style={styles.container}>
      <Swiper 
        style={styles.wrapper}
        height={200}
        autoplay
        autoplayTimeout={2}  
        paginationStyle={{height: 10, top: 130}}
        // showsPagination={false}       //为false不显示下方圆点
        dot={<View style={{           //未选中的圆点样式
          backgroundColor: '#fff',
          width: 10,
          height: 10,
          borderRadius: 5,
          marginRight: 9,
          top: 0
        }}/>}
        activeDot={<View style={{    //选中的圆点样式
          backgroundColor: '#d43c33',
          width: 10,
          height: 10,
          borderRadius: 5,
          marginRight: 9,
          top: 0
        }}/>}
        > 
        {
          banner.map((item, index) => {
            return (
              <View style={styles.slide} key={index}>
                <TouchableOpacity 
                  style={styles.image} 
                  onPress={() => {
                    props.bannerClicked(item)
                  }}>
                  <Image style={styles.image} source={{ uri: item.pic }}/>
                </TouchableOpacity>
              </View>
            )
          })
        }
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.width,
    height: 150,
  },
  wrapper: {
  },
  slide: {
    width: Dimensions.width,
    height: 150,
  },
  image: {
    width: Dimensions.width,
    flex: 1,
  }
})
