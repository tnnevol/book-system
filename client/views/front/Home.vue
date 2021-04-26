<template>
  <div class="home">
    <header class="page-head">
      <header-bar
        :prefix="false"
        :title="pageTitle"
        @handleSuffixIcon="handleSuffixIcon"
      />
    </header>
    <main class="page-main">
      <router-view />
    </main>
    <footer class="page-footer">
      <footer-nav
        :menus="btmMenu.menus"
        :selected.sync="btmMenu.selected"
        @change="pageChange"
      />
    </footer>
  </div>
</template>

<script>
import HeaderBar from "@/components/front/common/Header";
import FooterNav from "@/components/front/common/FooterNav";

export default {
  name: "Home",
  data() {
    return {
      pageTitle: "首页",
      btmMenu: {
        selected: 1,
        menus: [
          {
            id: 0,
            icon: "icon-book",
            name: "书架",
            routerName: "bookshelf",
          },
          {
            id: 1,
            icon: "icon-book1",
            name: "书城",
            routerName: "bookCity",
          },
          {
            id: 2,
            icon: "icon-wode",
            name: "我的",
            routerName: "my",
          },
        ],
      },
    };
  },
  methods: {
    handleSuffixIcon() {
      console.log("click");
    },
    pageChange({ id, name }) {
      console.log(id);
      console.log(name);
    },
  },
  components: {
    HeaderBar,
    FooterNav,
  },
};
</script>
<style lang="less" scoped>
.home {
  width: 100vw;
  height: 100vh;
  .page-head {
    height: 44px;
    overflow: hidden;
    background-color: @HeaderBg;
    flex-shrink: 0;
  }
  .page-main {
    height: calc(100% - 94px);
    overflow: hidden;
    .list-container {
      overflow: hidden;
    }
  }
  .page-footer {
    height: 50px;
    overflow: hidden;
    background-color: @FooterBg;
  }
}
</style>
