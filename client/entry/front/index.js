import Vue from "vue";
import App from "@/Front.vue";
import router from "@/router/front";
import store from "@/store/front";
import VueLazyload from "vue-lazyload";
import "@/utils/front/cube-ui";
import "amfe-flexible";
import "animate.css";
import "@/assets/style/fn.less";

Vue.config.productionTip = false;
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require("@/assets/images/default-error.png"),
  loading: require("@/assets/images/loading.gif"),
  attempt: 1,
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
