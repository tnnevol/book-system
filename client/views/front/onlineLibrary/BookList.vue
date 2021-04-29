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
    <div class="book-list-container">
      <cube-scroll
        ref="bookScroll"
        :data="bookList"
        :options="scrollOption"
        @pulling-down="onPullingDown"
        @pulling-up="onPullingUp"
      >
        <ul class="book-list">
          <li
            class="book-container"
            v-for="bookInfo in viewBookList"
            :key="bookInfo.id"
          >
            <book-item-panel :book-info="bookInfo" />
          </li>
        </ul>
        <template slot="pulldown" slot-scope="props">
          <scroll-pull-down :pull-down-info="props" />
        </template>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import BookItemPanel from "@/components/front/onlineLibrary/BookItemPanel";
import ScrollPullDown from "@/components/front/common/ScrollPullDown";
import { getListByType } from "@/api/front/fugueReader.books";

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
      bookList: [],
      scrollOption: {
        pullDownRefresh: {
          threshold: parseInt(60),
          // Do not need to set stop value, but you can if you want
          // stop: parseInt(this.pullDownRefreshStop),
          txt: "刷新成功",
        },
        pullUpLoad: {
          threshold: parseInt(0),
          txt: {
            more: "加载中...",
            noMore: "没有更多数据了",
          },
        },
      },
      pageSize: 20,
      pageNumber: 0,
      totalCount: 0,
    };
  },
  created() {
    this.initPage();
  },
  mounted() {},
  methods: {
    async initPage() {
      const res = await this.getListByTypeController();
      console.log(res);
      this.bookList = res.list;
    },
    changeNavBarHandler(cur) {
      this.navBar.current = cur;
    },
    // 刷新
    async onPullingDown() {
      this.pageNumber = 0;
      const res = await this.getListByTypeController();
      this.bookList = res.list;
      this.$nextTick(() => {
        this.$refs.bookScroll.forceUpdate();
      });
    },
    // 加载
    async onPullingUp() {
      if (this.bookList.length < this.totalCount) {
        this.pageNumber++;
        const res = await this.getListByTypeController();
        this.bookList = [...this.bookList, ...res.list];
      }
      this.$nextTick(() => {
        this.$refs.bookScroll.forceUpdate();
      });
    },
    async getListByTypeController() {
      const { data: res } = await getListByType({
        typeId: 1,
        page: this.pageNumber,
        count: this.pageSize,
      });
      this.totalCount = res.count;
      return res;
    },
  },
  computed: {
    viewBookList() {
      return this.bookList.map(
        ({ id, name, cover, desc, authorId, typeId, status }) => {
          return {
            id,
            name,
            pic: cover,
            desc,
            author: authorId,
            type: typeId,
            status,
          };
        }
      );
    },
  },
  components: {
    BookItemPanel,
    ScrollPullDown,
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
  .book-list-container {
    height: calc(100% - 40px);
    .book-list {
      padding: 15px 20px;
      .book-container {
        + .book-container {
          margin-top: 15px;
        }
      }
    }
  }
}
</style>
