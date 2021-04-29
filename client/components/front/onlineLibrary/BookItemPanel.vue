<template>
  <div class="book-item-panel">
    <div class="book-main">
      <div class="book-pic">
        <img
          v-lazy="bookInfo.pic"
          :alt="`${bookInfo.name}图书封面`"
          class="pic"
        />
      </div>
      <div class="book-details">
        <h3 class="book-name">{{ bookInfo.name }}</h3>
        <p class="book-detail">
          <span v-if="bookInfo.author">
            作者：<i class="special">{{ bookInfo.author }}</i>
          </span>
          <span v-if="false">
            类别：<i class="special">{{ bookInfo.type }}</i>
          </span>
          <span v-if="false">
            状态：<i class="special">{{ bookInfo.status }}</i>
          </span>
        </p>
        <p class="book-desc">
          {{ bookInfo.desc }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import bookBg from "@/assets/images/book-bg-default.jpg";
export default {
  name: "BookItemPanel",
  props: {
    bookInfo: {
      type: Object,
      default() {
        return {
          pic: "",
          name: "",
          author: "",
          type: "",
          status: "",
          desc: "",
        };
      },
    },
  },
  data() {
    return {
      bookBg,
    };
  },
};
</script>

<style scoped lang="less">
.book-item-panel {
  width: 100%;
  background-color: @BookItemPanelBg;
  padding: 12px 18px;
  box-sizing: border-box;
  box-shadow: 0 5px 8px @BookItemPanelBoxShadow;
  border-radius: 6px;

  .book-main {
    display: flex;
    align-items: center;

    .book-pic {
      width: 78px;
      height: 105px;
      margin-right: 12px;
      flex: 0 0 auto;

      > .pic {
        display: block;
        width: 100%;
        height: 100%;
        color: @BookItemPanelColor;
        font-size: 12px;
      }
    }

    .book-details {
      flex: 1;
      display: flex;
      flex-direction: column;

      .book-name {
        font-size: 14px;
        color: @BookItemPanelColor;
        line-height: 20px;
        font-weight: bold;
        margin-bottom: 8px;
      }

      .book-detail {
        font-size: 12px;
        color: @BookItemPanelColor;
        line-height: 22px;
        white-space: normal;

        .special {
          font-style: normal;
          margin-right: 8px;
          color: @BookItemPanelColor;
        }
      }

      .book-desc {
        font-size: 12px;
        line-height: 22px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        color: @BookItemPanelColor;
      }
    }
  }
}
</style>
