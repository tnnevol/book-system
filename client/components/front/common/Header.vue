<template>
  <div class="header-bar">
    <div class="prefix-icon">
      <i
        class="iconfont"
        :class="[prefixIcon]"
        v-if="prefix"
        @click="handlePrefixIcon"
      ></i>
    </div>
    <h1 class="head-title">
      {{ title }}
    </h1>
    <div class="suffix-icon">
      <i
        class="iconfont"
        :class="[suffixIcon]"
        v-if="suffix"
        @click="handleSuffixIcon"
      ></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderBar",
  props: {
    prefix: {
      default: true,
      type: Boolean,
    },
    suffix: {
      default: true,
      type: Boolean,
    },
    prefixIcon: {
      default: "icon-previewleft",
      type: String,
    },
    suffixIcon: {
      default: "icon-search",
      type: String,
    },
    title: {
      default: "book",
      type: String,
    },
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    handlePrefixIcon() {
      this.$emit("handlePrefixIcon");
    },
    handleSuffixIcon() {
      this.$emit("handleSuffixIcon");
    },
  },
};
</script>

<style scoped lang="less">
.header-bar {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 15px;
  justify-content: space-between;
  box-sizing: border-box;
  background-color: @HeaderBg;
  color: @HeaderFontColor;

  .prefix-icon,
  .suffix-icon {
    min-width: 28px;
    display: flex;
    justify-content: center;
    align-content: center;
  }

  .prefix-icon {
    text-align: left;
  }

  .suffix-icon {
    text-align: right;
  }

  .iconfont {
    font-size: 24px;

    &.icon-search {
      display: inline-block;
      transform: rotateY(-180deg);
    }
  }

  .head-title {
    font-size: 24px;
    line-height: 34px;
    font-weight: 400;
  }
}
</style>
