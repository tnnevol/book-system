import Vue from "vue";
import Router from "vue-router";
import constantRoutes from "./constant.routes";

Vue.use(Router);

const createRouter = () =>
  new Router({
    mode: "history",
    base: "/vue-app/",
    routes: constantRoutes,
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}
export default router;
