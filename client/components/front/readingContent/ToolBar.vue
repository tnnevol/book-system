<template>
  <div class="content-btns">
    <cube-button inline>上一章</cube-button>
    <cube-button inline>返回</cube-button>
    <cube-button inline>下一章</cube-button>
  </div>
</template>

<script>
export default {
  name: "ToolBar",
};
</script>

<style scoped lang="less">
.content-btns {
  display: flex;
  justify-content: space-around;
  height: 40px;
  padding: 10px;

  /deep/ .cube-btn {
    box-sizing: border-box;
    padding: 10px 12px;
    height: 30px;
    width: 60px;
    font-size: 12px;
    background-color: @ToolBtnBg;
  }

  .cube-btn_disabled {
    background-color: rgba(255, 255, 255, 0.4);
  }
}
</style>
