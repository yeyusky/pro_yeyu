// 时间转换封装
const formatDate = (time, type) => {
  let date
  if (time instanceof Date) {
    date = time
  } else {
    date = new Date(time)
  }
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  let d = date.getDate()
  d = d < 10 ? '0' + d : d
  let h = date.getHours()
  h = h < 10 ? '0' + h : h
  let min = date.getMinutes()
  min = min < 10 ? '0' + min : min
  let s = date.getSeconds()
  s = s < 10 ? '0' + s : s
  switch (type) {
    case 'yy-mm-dd hh:mm:ss':
      return y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s
    case 'yy/mm/dd hh:mm:ss':
      return y + '/' + m + '/' + d + ' ' + h + ':' + min + ':' + s
    case 'yy-mm-dd':
      return y + '-' + m + '-' + d
    case '年/月/日':
      return y + '年' + m + '月' + d + '日'
    case 'hh:mm:ss':
      return h + ':' + min + ':' + s
  }
}

export default {
  formatDate
}
