import Storage from 'react-native-storage'
import AsyncStorage from '@react-native-community/async-storage';

const storage = new Storage({
  // maximum capacity, default 1000 key-ids
  size: 1000,

  // Use AsyncStorage for RN apps, or window.localStorage for web apps.
  // If storageBackend is not set, data will be lost after reload.
  storageBackend: AsyncStorage, // for web: window.localStorage

  // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
  // can be null, which means never expire.
  // defaultExpires: 1000 * 3600 * 24,

  // cache data in the memory. default is true.
  enableCache: true,

  // if data was not found in storage or expired data was found,
  // the corresponding sync method will be invoked returning
  // the latest data.
  sync: {
    // we'll talk about the details later.
  }
})

const FAVORITE_LIST_KEY  =  'FAVORITE_LIST_KEY'
const HISTORY_LIST_KEY   =  'HISTORY_LIST_KEY'

export const saveFavoriteSong = (song) => {
  // queryFavoriteList().then((res) => {

  // })
  storage.save({ key: FAVORITE_LIST_KEY, data: song })
}

export const queryFavoriteList = () => {
  return new Promise((resolve, reject) => {
    storage.load({
      key: FAVORITE_LIST_KEY
    })
    .then((ret) => {
      console.log(ret)
      resolve(ret)
    })
    .catch((err) => {
      reject(err)
    })
  })
}

// export default storage;