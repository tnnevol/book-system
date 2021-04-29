<template>
  <div
    v-if="pullDownInfo.pullDownRefresh"
    class="cube-pulldown-wrapper"
    :style="pullDownInfo.pullDownStyle"
  >
    <div
      v-show="pullDownInfo.beforePullDown"
      class="before-trigger"
      :style="{ paddingTop: pullDownInfo.bubbleY + 'px' }"
    >
      <span :style="{ transform: `rotate(${pullDownInfo.bubbleY + 10}deg)` }">
        <i class="iconfont icon-refresh"></i>
      </span>
    </div>
    <div class="after-trigger" v-show="!pullDownInfo.beforePullDown">
      <div v-show="pullDownInfo.isPullingDown" class="loading">
        <cube-loading></cube-loading>
      </div>
      <div v-show="!pullDownInfo.isPullingDown" class="text">
        <span class="refresh-text">{{ pullDownRefreshTxt }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ScrollPullDown",
  props: {
    pullDownInfo: {
      type: Object,
      default() {
        return {};
      },
    },
    pullDownRefreshTxt: {
      type: String,
      default: "刷新成功",
    },
  },
};
</script>

<style scoped lang="less">
.cube-pulldown-wrapper {
  .before-trigger {
    font-size: 16px;
    line-height: 26px;
    align-self: flex-end;
  }
  span {
    display: inline-block;
    color: @ScrollPullDownColor;
    .iconfont {
      font-size: 20px;
    }
  }
  .after-trigger {
    font-size: 12px;
    line-height: 22px;
    .refresh-text {
      color: @ScrollPullDownColor;
    }
  }
}
</style>
