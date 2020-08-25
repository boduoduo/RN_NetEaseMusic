import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:3000'
axios.defaults.timeout = 3000

export default {
  mb_get: function(path = '', data = {}) {
    return new Promise((resolve, reject) => {
      axios.get(path, {
        params: data
      })
        .then((result) => {
          resolve(result.data)
        }).catch((err) => {
          reject(err)
        })
    })
  },

  mb_post: function(path = '', data = {}) {
    return new Promise((resolve, reject) => {
      axios.post(path, data).then((res) => {
        resolve(res.data)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  mb_all: function (list) {
    return new Promise((resolve, reject) => {
      axios.all(list)
        .then(axios.spread(function (...result) {
          // 两个请求现在都执行完成
          resolve(result)
          }))
        .catch(function (error) {
          reject(error)
        })
    })
  }

}