<template>
  <div class="authorInfo">
    <div class="author">
      <p>作者</p>
      <router-link :to="{
        name:'userInfo',
        params:{name:info.loginname}
      }">
        <img :src="info.avatar_url">
      </router-link>
      <span>{{info.loginname}}</span>
    </div>
    <section class="replyTopic">
      <p>回复的主题</p>
      <ul>
        <li v-for="reply in replyLimitBy5">
          <router-link :to="{
          name:'post_title',
          params:{
            id:reply.id,
            name:reply.author.loginname
          }
        }">
            {{reply.title}}
          </router-link>
        </li>

      </ul>
    </section>
    <section class="createTopic">
      <p>创建的主题</p>
      <ul>
        <li v-for="create in topicLimitBy5">
          <router-link :to="{
            name:'post_title',
            params:{
              id:create.id,
              name:create.author.loginname
            }
          }">
            {{create.title}}
          </router-link>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'SlideBar',
    data() {
      return {
        isLoading: false,
        info: {}
      }
    },
    methods: {
      getUserInfo() {
        this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
          .then(res => {
            if (res.data.success == true) {
              this.isLoading = false
              this.info = res.data.data
            }
          }).catch(err => { console.log(err) })
      }
    },
    computed: {
      topicLimitBy5() {
        //写this.info.recent_topics.length报错，因为在未返回数据前并没有length方法
        if (this.info.recent_topics) {
          return this.info.recent_topics.slice(0, 5)
        }
      },
      replyLimitBy5() {
        if (this.info.recent_replies) {
          return this.info.recent_replies.slice(0, 5)
        }
      },
    },
    beforeMount() {
      this.isLoading = true
      this.getUserInfo()
    },

  }
</script>

<style scoped>
  .authorInfo {
    float: right;
    width: 328px;
    margin-top: 0;
  }

  .author>p,
  .replyTopic>p,
  .createTopic>p {
    height: 30px;
    background-color: #f5f5f5;
    margin-top: 10px;
    padding-left: 15px;
    border-bottom: 1px solid #f0f0f0;
    line-height: 30px;
    font-size: 12px;
  }

  .author>p {
    margin-top: 0;
  }

  .author {
    background: #fff;
  }

  .author img {
    width: 50px;
    margin: 10px;
  }

  .author span {
    /* line-height: 10px; */
    position: relative;
    bottom: 12px;
  }

  .replyTopic>ul,
  .createTopic>ul {
    list-style: none;
    /* padding: 12px; */
    background-color: #fff;
  }

  .replyTopic>ul>li,
  .createTopic>ul>li {
    padding: 8px 15px;
    font-size: 12px;
  }

  .replyTopic>ul>li>a,
  .createTopic>ul>li>a {
    color: #778087;
    text-decoration: none;
  }
</style>