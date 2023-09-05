// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'


Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',

})
// 格式化最后回复日期
Vue.filter('formatDate', function (str) {
  if (!str) return ''
  var date = new Date(str)
  var time = new Date().getTime() - date.getTime()
  if (time < 0) {
    return ''
  } else if (time / 1000 < 30) {
    return '刚刚'
  } else if (time / 1000 < 60) {
    return parseInt(time / 1000) + '秒前'
  } else if (time / 60000 < 60) {
    return parseInt(time / 60000) + '分钟前'
  } else if (time / 3600000 < 24) {
    return parseInt(time / 3600000) + '小时前'
  } else if (time / 86400000 < 31) {
    return parseInt(time / 86400000) + '天前'
  } else if (time / 2592000000 < 12) {
    return parseInt(time / 2592000000) + '月前'
  } else {
    return parseInt(time / 31104000000) + '年前'
  }
})
//格式化帖子类型
Vue.filter('formatTab', function (item) {
  if (item.top == true) {
    return '置顶'
  } else if (item.good == true) {
    return '精华'
  } else if (item.tab == 'share') {
    return '分享'
  } else if (item.tab == 'ask') {
    return '问答'
  } else if (item.tab == 'job') {
    return '招聘'
  }
})
//格式化发布日期
Vue.filter('formatPostTime', function (time) {
  var postDate = new Date(time)
  var time = new Date().getTime() - postDate.getTime()
  var year = postDate.getFullYear()
  var month = postDate.getMonth() + 1
  var day = postDate.getDate()
  var hour = postDate.getHours()
  var min = postDate.getMinutes()

  if (time / 1000 < 60) {
    return time / 1000 + '秒前'
  } else if (time / 60000 < 60) {
    return time / 60000 + '分钟前'
  } else if (time / 3600000 <= 24) {
    return parseInt(time / 3600000) + '小时前'
  } else if (time / 86400000 > 1) {
    return `${month}-${day}  ${hour}:${min}`
  } else if (time / 31104000000 >= 1) {
    return `${year}-${month}-${day}`
  }
})

//格式化注册时间
Vue.filter('formatCreateTime', function (time) {
  var date = new Date(time)
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  return `${year}年${month}月${day}日`
})