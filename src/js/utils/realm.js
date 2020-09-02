
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

const Realm = require('realm')
const realm = new Realm({ schema: [FavoriteSongsSchema, HistorySongsSchema] })

export const insertFavoriteSong = (song) => {
  let result = queryFavoriteList()
  // console.log(result, 'query all')
  let findSong = result.find((currentSong) => {
    return currentSong.id == song.id
  })
  console.log(findSong, 'findSong');
  if (findSong === undefined) {
    realm.write(()=>{
      realm.create('FavoriteList', song)
    })
  }
}

export const isFavorited = (id) => {
  const result = queryFavoriteList()
  // console.log(result, 'query all')
  let findSong = result.find((currentSong) => {
    return currentSong.id == id
  })
  return findSong !== undefined
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
  let result = queryHistoryList()
  let findIndex = result.find((currentSong) => {
    return currentSong.id == song.id
  })
  if (findIndex === undefined) {
    if (result.length > 30) {
      const firstId = result[0].id || 0
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