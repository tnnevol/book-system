<template>
  <div class="transition-container">
    <transition
      name="c-sliding"
      enter-active-class="animate__animated animate__fadeIn animate__faster"
      leave-active-class="animate__animated animate__fadeOut animate__faster"
    >
      <div class="content-mask" v-if="showSlide"></div>
    </transition>
    <transition
      name="c-sliding"
      enter-active-class="animate__animated animate__slideInDown animate__faster"
      leave-active-class="animate__animated animate__slideOutUp animate__faster"
    >
      <div class="slide-content" v-if="showSlide">
        <slot name="default"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "AnimateSlideDownAndUp",
  props: {
    showSlide: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="less" scoped>
.transition-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  .content-mask,
  .slide-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .content-mask {
    background-color: fade(#000, 80%);
    z-index: 9998;
  }
  .slide-content {
    z-index: 9999;
  }
}
</style>
