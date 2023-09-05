import Vue from 'vue'
import Router from 'vue-router'
import Article from '../components/Article'
import PostList from '../components/PostList'
import UserInfo from '../components/UserInfo'
import SlideBar from '../components/SlideBar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PostList',
      components: {
        main: PostList
      },
    },
    {
      path: '/topic/:id&author=:name',
      name: 'post_title',
      components: {
        main: Article,
        SlideBar: SlideBar
      },
    },
    {
      path: '/userinfo/:name',
      name: 'userInfo',
      components: {
        main: UserInfo
      }
    }
  ]
})
