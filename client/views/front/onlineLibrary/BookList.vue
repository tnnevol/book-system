<template>
  <div class="book-list-wrapper">
    <div class="nav-bar-container">
      <cube-scroll-nav-bar
        :current="navBar.current"
        :labels="navBar.labels"
        ref="navBar"
        @change="changeNavBarHandler"
      ></cube-scroll-nav-bar>
    </div>
    <div class="book-list-container"></div>
  </div>
</template>

<script>
export default {
  name: "OnlineBookList",
  data() {
    return {
      navBar: {
        current: "玄幻小说",
        labels: [
          "玄幻小说",
          "修真小说",
          "都市小说",
          "穿越小说",
          "网游小说",
          "科幻小说",
          /*  "精选",
          "排行榜单",
          "全部小说" */
        ],
      },
    };
  },
  created() {},
  mounted() {},
  methods: {
    changeNavBarHandler(cur) {
      this.navBar.current = cur;
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/assets/front/theme/default/ScrollNavBar.less";
.book-list-wrapper {
  width: 100%;
  height: 100%;
  .nav-bar-container {
    height: 40px;
  }
}
</style>
