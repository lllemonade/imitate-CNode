<template>
  <!-- loading -->
  <div class="PostList">
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif" alt="Loading">
    </div>
    <!-- 主题列表 -->
    <div class="post" v-else>
      <ul>
        <!-- toolbar -->
        <li>
          <div class="post_header">
            <span><a href="#">全部</a></span>
            <span><a href="#">精华</a></span>
            <span><a href="#">分享</a></span>
            <span><a href="#">问答</a></span>
            <span><a href="#">招聘</a></span>
          </div>
        </li>
        <!-- 头像 -->
        <li v-for="item in items" class="list">
          <img :src="item.author.avatar_url" :title="item.author.loginname">

          <span class="allCount">
            <span class="reply">{{item.reply_count}}</span>/
            {{item.visit_count}}
          </span>
          <!-- \帖子类型 -->
          <span
            :class="[{item_top:(item.top == true),item_good:(item.good == true),item_tab:(item.top !== true &&item.good !== true)}]">
            {{item | formatTab}}
          </span>
          <!-- 标题\时间 -->
          <router-link :to="{
            name: 'post_title',
            params:{
              id:item.id,
              name:item.author.loginname
            }
          }">
            <span>
              {{item.title}}
            </span>
          </router-link>

          <span class="last_reply">{{item.last_reply_at | formatDate}}</span>
        </li>
        <!-- 分页 -->
        <li>
          <Pagination @handle="renderList"></Pagination>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
  import Pagination from './Pagination'

  export default {
    name: 'PostList',
    data() {
      return {
        isLoading: false,
        items: [],  //帖子列表
        transPage: 1
      }
    },
    components: { Pagination },
    methods: {
      getList() {
        this.$http.get("https://cnodejs.org/api/v1/topics", {
          params: {
            page: this.transPage,
            limit: 20
          }

        })
          .then(res => {
            this.isLoading = false
            this.items = res.data.data
          })
          .catch(err => { console.log(err) })
      },
      renderList(value) {
        this.transPage = value
        this.getList()
      }
    },
    beforeMount() {
      this.isLoading = true
      this.getList()
    }
  }
</script>

<style scoped>
  * {
    box-sizing: content-box;
  }

  .PostList {
    background-color: #e1e1e1;
  }

  .loading {
    text-align: center;
    margin-top: 300px;
  }

  /* 导航 */
  .post_header a {
    text-decoration: none;
    color: #80bd01;
    font-size: 14px;
    text-shadow: none;
  }

  .post_header a:hover {
    color: #9e78c0;
  }

  .post_header {
    height: 40px;
    background-color: #f5f5f5;
    margin-top: 10px;
    border-bottom: 1px solid #f0f0f0;
  }

  .post_header span {
    margin: 0 10px;
    line-height: 40px;
    /* cursor: pointer; */
  }

  /* 帖子主体 */
  ul {
    list-style: none;
    width: 100%;
    margin: 0 auto;
  }

  .list {
    border-bottom: 1px solid #f0f0f0;
    background-color: #fff;
    padding: 9px;
    font-size: 15px;
  }

  .list:hover {
    background-color: #f5f5f5;
  }

  .list a {
    text-decoration: none;
    color: black;
  }

  .list a:hover {
    text-decoration: underline;
  }

  .PostList img {
    width: 30px;
    height: 30px;
    vertical-align: middle;
  }

  .allCount {
    display: inline-block;
    width: 80px;
    text-align: center;
    font-size: 12px;
    /* margin: 0 8px; */
  }

  .reply {
    color: #9e78c0;
    font-size: 14px;
  }

  .item_top,
  .item_good {
    background-color: #80bd01;
    color: #f5f5f5;
    border-radius: 6px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    font-size: 12px;
    padding: 2px 4px;
    margin: 0 5px;
  }

  .item_tab {
    background-color: #e5e5e5;
    color: #999;
    border-radius: 6px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    font-size: 12px;
    padding: 2px 4px;
    margin: 0 5px;
  }

  .last_reply {
    float: right;
    text-align: right;
    min-width: 50px;
    color: #778087;
    font-size: 12px;
    line-height: 30px;
    white-space: nowrap;
  }
</style>