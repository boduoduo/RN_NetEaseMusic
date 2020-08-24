export const formartTime = (time) => {
  // 2.得到两个时间之间的差值(秒)
  let differSecond = time
  // 3.利用相差的总秒数 / 每一天的秒数 = 相差的天数
  let day = Math.floor(differSecond / (60 * 60 * 24))
  day = day >= 10 ? day : '0' + day
  // 4.利用相差的总秒数 / 小时 % 24;
  let hour = Math.floor(differSecond / (60 * 60) % 24)
  hour = hour >= 10 ? hour : '0' + hour
  // 5.利用相差的总秒数 / 分钟 % 60;
  let minute = Math.floor(differSecond / 60 % 60)
  minute = minute >= 10 ? minute : '0' + minute
  // 6.利用相差的总秒数 % 秒数
  let second = Math.floor(differSecond % 60)
  second = second >= 10 ? second : '0' + second
  return {
    day: day,
    hour: hour,
    minute: minute,
    second: second
  }
}

// 格式化歌词方法
export const parseLyric = (lrc) => {
    let lyrics = lrc.split('\n')
    // [00:00.000] 作曲 : 林俊杰
    // 1.定义正则表达式提取[00:00.000]
    let reg1 = /\[\d*:\d*\.\d*\]/g
    // 2.定义正则表达式提取 [00
    let reg2 = /\[\d*/i
    // 3.定义正则表达式提取 :00
    let reg3 = /\:\d*/i
    // 4.定义对象保存处理好的歌词
    let lyricObj = {}
    lyrics.forEach(function (lyric) {
      // 1.提取时间
      let timeStr = lyric.match(reg1)
      if (!timeStr) { return }
      timeStr = timeStr[0]
      // 2.提取分钟
      let minStr = timeStr.match(reg2)[0].substr(1)
      // 3.提取秒钟
      let secondStr = timeStr.match(reg3)[0].substr(1)
      // 4.合并时间, 将分钟和秒钟都合并为秒钟
      let time = parseInt(minStr) * 60 + parseInt(secondStr)
      // 5.处理歌词
      let text = lyric.replace(reg1, '').trim()
      // 6.保存数据
      lyricObj[time] = text
    })
    return lyricObj
}

/**
* 防抖函数
* @param fn 事件触发的操作
* @param delay 多少毫秒内连续触发事件，不会执行
* @returns {Function}
*/
export const debounce = (fn, delay) => {
  let timer = null; //借助闭包
  return function() {
    let context = this,
        args = arguments
    timer && clearTimeout(timer)
    timer = setTimeout(function() {
      fn.apply(context, args);
    }, delay)
  }
}

 /**
* 节流函数
* @param fn 事件触发的操作
* @param delay 间隔多少毫秒需要触发一次事件
*/
//基本原理
export const throttle = (fn, delay) => {
  let valid = true;
  return function() {
    let context = this;
    let args = arguments;
    if (!valid) {
      return;
    }
    valid = false;
    setTimeout(() => {
      fn.apply(context, args);
      valid = true;
    }, delay);
  }
}