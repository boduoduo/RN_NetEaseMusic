import Http from './http'

// 获取Banner
export const getMyBanner = () => Http.mb_get('/banner?type=2')
// 获取推荐歌单
export const getPersonalized = () => Http.mb_get("/personalized?limit=6")
// 获取最新专辑
export const getNewestAlbum = () => Http.mb_get("/album/newest")
// 获取最新歌单
export const getNewestSong = () => Http.mb_get("/personalized/newsong")