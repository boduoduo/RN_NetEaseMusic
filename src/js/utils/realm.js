
const FavoriteSongsSchema = {
  name: 'FavoriteList',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
    singer: 'string',
    picUrl: 'string'
  }
}

const HistorySongsSchema = {
  name: 'HistoryList',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
    singer: 'string',
    picUrl: 'string'
  }
}

const SearchWordsSchema = {
  name: 'SearchList',
  properties: {
    word: 'string'
  }
}

const Realm = require('realm')
const realm = new Realm({ 
  schema: [FavoriteSongsSchema, HistorySongsSchema, SearchWordsSchema] 
})

export const insertFavoriteSong = (song) => {
  let res = isFavorited(song.id)
  if (!res) {
    realm.write(()=>{
      realm.create('FavoriteList', song)
    })
  }
}

export const isFavorited = (id) => {
  let result = realm.objects('FavoriteList').filtered('id == "' + id + '"')
  // console.log(result, 'isFavorited', Object.keys(result))
  if (Object.keys(result).length) {
    return true
  }
  return false
}

export const deleteFavoriteSong = (id) => {
  realm.write(() => {
    realm.delete(realm.objects('FavoriteList').filtered('id == "' + id + '"'))
  })
}

export const queryFavoriteList = () => {
  return realm.objects('FavoriteList')
}

export const insertHistorySong = (song) => {
  let list = queryHistoryList()
  let result = realm.objects('HistoryList').filtered('id == "' + song.id + '"')
  if (Object.keys(result).length === 0) {
    if (list.length > 30) {
      const firstId = list[0].id || 0
      deleteHistorySong(firstId)
    }
    realm.write(()=>{
      realm.create('HistoryList', song)
    })
  }
}

export const queryHistoryList = () => {
  return realm.objects('HistoryList')
}

export const deleteHistorySong = (id) => {
  realm.write(() => {
    realm.delete(realm.objects('HistoryList').filtered('id == "' + id + '"'))
  })
}

export const insertSearchWords = (word) => {
  let result = realm.objects('SearchList').filtered('word == "' + word + '"')
  if (Object.keys(result).length === 0) {
    realm.write(()=>{
      realm.create('SearchList', { word })
    })
  }
}

export const querySearchList = () => {
  return realm.objects('SearchList')
}

export const deleteSearchWords = (word) => {
  realm.write(() => {
    realm.delete(realm.objects('SearchList').filtered('word == "' + word + '"'))
  })
}