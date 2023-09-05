<template>
  <div>
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif">
    </div>

    <div v-else>
      <section class="user">
        <img :src="info.avatar_url">
        <span>{{info.loginname}}</span>
        <p>{{info.score}}积分</p>
        <p>注册时间：{{info.create_at | formatCreateTime}}</p>
      </section>
      <section class="replyTopic">
        <p>回复的主题</p>
        <ul>
          <li v-for="reply in info.recent_replies">
            <router-link :to="{
            name:'post_title',
            params:{id:reply.id}
          }">
              {{reply.title}}
            </router-link>
          </li>

        </ul>
      </section>
      <section class="createTopic">
        <p>创建的主题</p>
        <ul>
          <li v-for="create in info.recent_topics">
            <router-link :to="{
              name:'post_title',
              params:{id:create.id}
            }">
              {{create.title}}
            </router-link>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'UserInfo',
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
    beforeMount() {
      this.isLoading = true,
        this.getUserInfo()
    }
  }

</script>

<style scoped>
  .loading {
    text-align: center;
    margin-top: 300px;
  }


  /* 用户信息 */
  .user {
    background: #fff;
    margin-top: 10px;
    padding: 12px;
  }

  .user img {
    width: 45px;
  }

  .user p {
    margin: 12px 0;
  }

  /* 回复和创建的主题 */
  .replyTopic>p,
  .createTopic>p {
    height: 40px;
    background-color: #f5f5f5;
    margin-top: 10px;
    padding-left: 12px;
    border-bottom: 1px solid #f0f0f0;
    line-height: 40px;
    font-size: 14px;
  }

  .replyTopic>ul,
  .createTopic>ul {
    list-style: none;
    /* padding: 12px; */
    background-color: #fff;
  }

  .replyTopic>ul>li,
  .createTopic>ul>li {
    padding: 15px 20px;
    font-size: 14px;
  }

  .replyTopic>ul>li>a,
  .createTopic>ul>li>a {
    color: #094E99;
    text-decoration: none;
  }
</style>