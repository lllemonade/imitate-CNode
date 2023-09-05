<template>
  <div id="app">
    <Header></Header>
    <div class="main">
      <router-view name="SlideBar"></router-view>
      <router-view name="main"></router-view>
    </div>
  </div>
</template>

<script>
  import Header from './components/Header'
  import PostList from './components/PostList'

  export default {
    name: 'App',
    components: {
      Header,
      PostList,
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  #app {
    background-color: #e1e1e1;
    min-height: 100vh;
  }

  .main {
    max-width: 82%;
    margin: 0 auto;
  }
</style>