import Vue from "vue";
import App from "@/Front.vue";
import router from "@/router/front";
import store from "@/store/front";
import "@/utils/front/cube-ui";
import "amfe-flexible";
import "animate.css";
import "@/assets/style/fn.less";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
