
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

// 插入喜欢的歌曲
export const insertFavoriteSong = (song) => {
  let res = isFavorited(song.id)
  if (!res) {
    realm.write(()=>{
      realm.create('FavoriteList', song)
    })
  }
}

// 是否喜欢过
export const isFavorited = (id) => {
  let result = realm.objects('FavoriteList').filtered('id == "' + id + '"')
  if (Object.keys(result).length) {
    return true
  }
  return false
}

// 取消喜欢
export const deleteFavoriteSong = (id) => {
  realm.write(() => {
    realm.delete(realm.objects('FavoriteList').filtered('id == "' + id + '"'))
  })
}

// 查询喜欢的歌曲列表
export const queryFavoriteList = () => {
  return realm.objects('FavoriteList')
}

// 插入播放过的歌曲
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

// 查询播放过的历史歌曲
export const queryHistoryList = () => {
  return realm.objects('HistoryList')
}

// 删除播放过的历史歌曲
export const deleteHistorySong = (id) => {
  realm.write(() => {
    realm.delete(realm.objects('HistoryList').filtered('id == "' + id + '"'))
  })
}

// 插入搜索过的歌曲
export const insertSearchWords = (word) => {
  let result = realm.objects('SearchList').filtered('word == "' + word + '"')
  if (Object.keys(result).length === 0) {
    realm.write(()=>{
      realm.create('SearchList', { word })
    })
  }
}

// 查询搜索过的歌曲列表
export const querySearchList = () => {
  return realm.objects('SearchList')
}

// 删除搜索过的歌曲
export const deleteSearchWords = (word) => {
  realm.write(() => {
    realm.delete(realm.objects('SearchList').filtered('word == "' + word + '"'))
  })
}