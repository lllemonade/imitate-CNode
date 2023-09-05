<template>
  <div class="header">
    <router-link :to="{name:'PostList'} ">
      <img src="../assets/cnode_logo.svg" alt="CNode社区">
    </router-link>

    <ul>
      <li>
        <router-link :to="{name:'PostList'} ">首页 </router-link>
      </li>
      <li><a href="#">新手入门</a></li>
      <li><a href="#">API</a></li>
      <li><a href="#">关于</a></li>
      <li><a href="#">注册</a></li>
      <li><a href="#">登录</a></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Header'
  }
</script>

<style scoped>
  * {
    box-sizing: content-box;
  }

  .header {
    background-color: #5a5555;
    height: 50px;
  }

  img {
    max-width: 120px;
    margin-left: 50px;
    margin-top: 10px;
  }

  ul {
    list-style: none;
    float: right;
    margin-top: -5px;
  }

  li {
    display: inline-block;
    left: 0;
    margin: 10px;
    padding: 10px 10px;
  }

  a {
    text-decoration: none;
    color: #ccc;
    font-size: 14px;
    text-shadow: none;
  }
</style>