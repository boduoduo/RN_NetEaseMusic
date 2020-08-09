import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Banner from '../components/Banner'
import { getMyBanner } from '../js/api/index'


export default function Recommend() {
  const [banner, setBanner] = useState([])
  
  useEffect(() => {
    getMyBanner().then((res) => {
      if (res.code === 200) {
        setBanner(res.banners || [])
      }
    })
    return () => {
      
    }
  }, [])

  return (
    <>
      <Banner banner={banner}/>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 100,
  }
})