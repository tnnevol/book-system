<template>
  <div class="view-wrapper">
    <cube-loading :size="40" v-if="loading"></cube-loading>
    <div class="view-content-container clearfix" v-show="!loading">
      <div class="view-top-bar">
        <p class="chapter-name">《{{ bookName }}》 {{ chapterTitle }}</p>
      </div>
      <div class="view-main" ref="viewMain">
        <cube-scroll ref="contentScroll">
          <div class="view-main-container clearfix">
            <tool-bar />
            <h1 class="content-title">{{ chapterTitle }}</h1>
            <div class="view-content" v-html="chapterContent"></div>
            <tool-bar />
          </div>
        </cube-scroll>
      </div>
    </div>
  </div>
</template>

<script>
import ToolBar from "@/components/front/readingContent/ToolBar";
import { getChapterContentByArticleDetailId } from "@/api/front/fugueReader.books";

export default {
  name: "ReadingContent",
  data() {
    return {
      loading: true,
      bookName: "",
      chapterTitle: "",
      chapterContent: "",
    };
  },
  created() {
    this.getChapterContent();
  },
  mounted() {},
  methods: {
    // 获取文章
    async getChapterContent() {
      this.loading = true;
      const { data: res } = await getChapterContentByArticleDetailId({
        id: this.$route.params.articleDetailId,
      });
      this.bookName = res.bookName;
      this.chapterTitle = res.title;
      this.chapterContent = res.content;
      this.loading = false;
    },
  },
  components: { ToolBar },
};
</script>

<style scoped lang="less">
.view-wrapper {
  height: 100vh;
  overflow: hidden;
  background: @ReadingContentBg;
  //background: url("~@/assets/imgs/read-view-bg.jpg")no-repeat center center #cebf9e;
  //background-size: 120% 120%;
  position: relative;

  .view-content-container {
    height: 100vh;

    .view-top-bar {
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      z-index: 999;

      .chapter-name {
        height: 30px;
        line-height: 30px;
        box-sizing: border-box;
        padding-left: 20px;
        font-size: 12px;
        color: @ReadingContentTitleColor;
      }
    }

    .view-main {
      margin-top: 30px;
      height: calc(100% - 30px);
      overflow: hidden;
      font-size: 24px;

      .view-main-container {
        .content-title {
          text-align: center;
          font-size: 0.8em;
          margin: 1.8em 0;
          color: @ReadingContentTitleColor;
          font-weight: bold;
        }

        .view-content {
          font-size: 0.6em;
          color: @ReadingContentColor;
          line-height: 1.6em;
          padding: 0 0.6em;
        }
      }
    }
  }

  /deep/ .cube-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
