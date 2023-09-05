<template>
  <div class="article">
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif">
    </div>

    <article v-else>
      <div class="topic_header">
        <h3 class="topic_title">
          {{post.title}}
        </h3>
        <ul class="topic_info">
          <li>·发布于：{{post.create_at|formatPostTime}} </li>
          <li>·作者：{{post.author.loginname}}</li>
          <li>·{{post.visit_count}}次浏览</li>
          <li>·来自：{{post | formatTab}}</li>
        </ul>
        <hr>
        <p v-html="post.content" class="topic_content"></p>
      </div>

      <div class="reply">
        <div class="topbar">回复</div>
        <div v-for="(reply,index) in post.replies" class="reply_sec">
          <div class="reply_up">

            <router-link :to="{
              name:'userInfo',
              params:{
                name:reply.author.loginname
              }
            }">
              <img :src="reply.author.avatar_url">
            </router-link>

            <router-link :to="{
              name:'userInfo',
              params:{name:reply.author.loginname}
            }">
              <span>{{reply.author.loginname}}</span>
            </router-link>

            <span>{{index+1}}楼</span>
            <span v-if="reply.ups.length>0">👍{{reply.ups.length}}</span>
            <span v-else></span>
          </div>

          <p v-html="reply.content" class="reply_content"></p>
        </div>

      </div>
    </article>
  </div>
</template>

<script>


  export default {
    name: 'Article',
    data() {
      return {
        isLoading: false,
        post: [],
      }
    },
    methods: {
      getList() {
        this.$http.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`, {})
          .then(res => {
            if (res.data.success == true) {
              this.isLoading = false
              this.post = res.data.data
            }
          })
          .catch(err => { console.log(err) })
      },
    },
    beforeMount() {
      this.isLoading = true
      this.getList()
    },
    //检测路由变化，否则在同一个路由下，点击后url会变化但页面不会跳转
    watch: {
      // 检测路由，$route
      '$route'(to, from) {
        this.getList()
      }
    }
  }
</script>

<style>
  @import url('../assets/markdown-github.css');

  .loading {
    text-align: center;
    margin-top: 300px;
  }

  ul li {
    list-style: none;
  }

  /* 帖子主体内容 */
  .article:not(:first-child) {
    margin-right: 340px;
    margin-top: 15px;
  }

  .topic_header {
    background-color: #fff;
    padding: 10px;
  }

  .topic_title {
    font-size: 20px;
    margin-top: 5px;
  }

  .topic_info {
    list-style: none;
    margin: 6px 0;
  }

  .topic_info li {
    display: inline-block;
    margin-right: 0 5px;
    font-size: 12px;
    color: #838383;
  }

  .topic_content {
    padding: 0 10px;
  }

  /* 回复部分 */
  .reply {
    background-color: #fff;
    margin-top: 15px;
  }

  .topbar {
    font-size: 10px;
    background-color: #f6f6f6;
    height: 30px;
    line-height: 30px;
    padding-left: 10px;
  }

  .reply img {
    width: 30px;
    height: 30px;
    position: relative;
    bottom: -9px;
  }

  .reply_sec {
    padding: 0 10px;
    border-bottom: 1px solid #e5e5e5;
  }

  .reply_up a,
  .reply_up span {
    font-size: 14px;
    color: #666;
    text-decoration: none;
  }

  .reply_up {
    margin-bottom: 5px;
  }

  .reply_content {
    padding: 12px 0;
  }

  .markdown-text img {
    width: 92% !important;
  }
</style>