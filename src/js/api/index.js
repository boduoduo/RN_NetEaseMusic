import Http from './http'

// 获取Banner
export const getMyBanner = () => Http.mb_get('/banner?type=2')
// 获取推荐歌单
export const getPersonalized = () => Http.mb_get("/personalized?limit=12")
// 获取最新专辑
export const getNewestAlbum = () => Http.mb_get("/album/newest")
// 获取最新歌单
export const getNewestSong = () => Http.mb_get("/personalized/newsong")
// 获取歌单详情
export const getPlayList = data => Http.mb_get("/playlist/detail", data);
// 获取专辑详情
export const getAlbumDetail = data => Http.mb_get("/album", data);
// 获取歌曲详情
export const getSongDetail = data => Http.mb_get("/song/detail", data);
// 获取歌词
export const getSongLyric = data => Http.mb_get("/lyric", data);
// 获取歌曲播放地址
export const getSongURL = data => Http.mb_get("/song/url", data);
// 获取歌手详情
export const getArtistsDetail = data => Http.mb_get("/artists", data);
// 获取榜单详情列表
export const getTopList = data => Http.mb_get("/top/list", data);
// 搜索歌曲
export const getSearchList = data => Http.mb_get("/search?type=1", data);
// 搜索热门歌曲
export const getSearchHot = data => Http.mb_get("/search/hot");

// 获取热门歌手
export const getHotArtists = () => {
  return new Promise((resolve, reject) => {
    Http.mb_get("/top/artists?offset=0&limit=10")
      .then(res => {
        resolve(res.artists)
      })
      .catch(error => {
        reject(error)
      })
  })
}

// 获取字母的歌手
export const getLettersArtists = letter => {
  return new Promise((resolve, reject) => {
    let letterArtists = [];
    Http.mb_all([
      Http.mb_get(`artist/list?offset=0&limit=5&cat=1001&initial=${letter}`)
      // 后面的都是一样的，cat参数已失效
      // Network.mb_get(`artist/list?offset=0&limit=5&cat=2001&initial=${letter}`),
      // Network.mb_get(`artist/list?offset=0&limit=5&cat=6001&initial=${letter}`),
      // Network.mb_get(`artist/list?offset=0&limit=5&cat=7001&initial=${letter}`),
      // Network.mb_get(`artist/list?offset=0&limit=5&cat=4001&initial=${letter}`),
      // Network.mb_get(`artist/list?offset=0&limit=5&cat=5003&initial=${letter}`),
    ])
      .then(result => {
        result.forEach(item => {
          letterArtists.push(...item.artists);
        });
        resolve(letterArtists);
      })
      .catch(error => {
        reject(error)
      })
  });
};

// 获取A-Z字母的歌手
export const getAllArtists = () => {
  return new Promise((resolve, reject) => {
    let keys = ["热"];
    let list = [getHotArtists()];
    for (let i = 65; i < 91; i++) {
      let char = String.fromCharCode(i);
      keys.push(char);
      list.push(getLettersArtists(char));
    }
    Http.mb_all(list)
      .then(result => {
        let obj = {};
        obj.keys = keys;
        obj.list = result;
        resolve(obj);
      })
      .catch(err => {
        reject(err)
      })
  })
}

// 获取榜单内容摘要
export const getTopListDetail = () => {
  return new Promise((resolve, reject) => {
    let category = {
      officialList: [
        { name: "云音乐飙升榜", id: 3 },
        { name: "云音乐新歌榜", id: 0 },
        { name: "网易原创歌曲榜", id: 2 },
        { name: "云音乐热歌榜", id: 1 }
      ],
      recList: [
        { name: "云音乐说唱榜", id: 23 },
        { name: "云音乐电音榜", id: 25 },
        { name: "云音乐欧美新歌榜", id: 32 },
        { name: "抖音排行榜", id: 26 },
        { name: "云音乐ACG音乐榜", id: 22 },
        { name: "云音乐古典音乐榜", id: 24 }
      ],
      // globalList: [
      //   { name: "美国Billboard周榜", id: 6 },
      //   { name: "UK排行榜周榜", id: 5 },
      //   { name: "Beatport全球电子舞曲榜", id: 21 },
      //   { name: "日本Oricon周榜", id: 10 },
      //   { name: "iTunes榜", id: 8 },
      //   { name: "英国Q杂志中文版周榜", id: 29 }
      // ],
      otherList: [
        { name: "KTV唛榜", id: 7 },
        { name: "法国 NRJ Vos Hits 周榜", id: 19 },
        { name: "新声榜", id: 27 },
        { name: "云音乐韩语榜", id: 28 },
        { name: "电竞音乐榜", id: 30 },
        { name: "云音乐欧美热歌榜", id: 31 }
      ],
      titles: {
        officialList: "官方榜",
        recList: "推荐榜",
        // globalList: "全球榜",
        otherList: "更多榜单"
      }
    };
    Http.mb_get("/toplist/detail")
      .then(data => {
          data.list.forEach(obj => {
              let flag = false
              for (const key in category) {
                  for (let i = 0; i < category[key].length; i++) {
                      if (category[key][i].name === obj.name) {
                        category[key][i].rank = obj
                        flag = true
                        break
                      }
                  }
                  if (flag) {
                      break
                  }
              }
          })
          resolve(category)
      })
      .catch(error => {
        reject(error);
      });
  });
};