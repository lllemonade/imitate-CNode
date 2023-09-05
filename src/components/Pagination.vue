<template>
  <div class="pagination">
    <button @click="changePage">首页</button>
    <button @click="changePage">上一页</button>
    <button v-if="judge" class="pagebtn">...</button>
    <button v-for="btn in pagebtns" @click="changePage(btn)" :class="[{currentPage:btn==currentPage},'pagebtn']">
      {{btn}}
    </button>
    <button @click="changePage">下一页</button>
  </div>
</template>

<script>
  import $ from 'jquery'

  export default {
    name: 'Pagination',
    data() {
      return {
        pagebtns: [1, 2, 3, 4, 5, '...'],
        currentPage: 1,
        judge: false
      }
    },
    methods: {
      changePage(page) {
        // 上一页、下一页、首页事件
        if (typeof page != 'number') {
          switch (page.target.innerText) {
            case '上一页':
              $('button.currentPage').prev().click()
              break;
            case '下一页':
              $('button.currentPage').next().click()
              break;
            case '首页':
              this.pagebtns = [1, 2, 3, 4, 5, '...']
              this.changePage(1)
              break;
            default: break;
          }
          return
        }
        this.currentPage = page
        if (page > 4) {
          this.judge = true
        } else { this.judge = false }

        if (page == this.pagebtns[4]) {
          this.pagebtns.shift()
          this.pagebtns.splice(4, 0, this.pagebtns[3] + 1)
        } else if (page == this.pagebtns[0] && page != 1) {
          this.pagebtns.unshift(this.pagebtns[0] - 1)
          this.pagebtns.splice(5, 1)
        }
        // 向父组件传递data
        this.$emit('handle', this.currentPage)
      }
    }
  }
</script>

<style scoped>
  .pagination {
    height: 30px;
    margin: 5px 0 20px 0;
    padding: 6px 20px;
    border: 1px solid #888888;
    border-radius: 5px;
    background: #fff;
  }

  button {
    /* padding: 0 2px; */
    width: 55px;
    height: 29px;
    outline: none;
    border: 1px solid #ddd;
    color: #778087;
    background-color: #fff;
    border-radius: 3px;
    cursor: pointer;
  }

  .currentPage {
    background-color: #333;
    color: #fff;
  }

  .pagebtn {
    width: 45px;
    margin: 0 5px;
  }
</style>