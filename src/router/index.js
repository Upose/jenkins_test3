import Vue from 'vue'
import Router from 'vue-router'
import webRouter from './web_router';
import adminRouter from './admin_router';
Vue.use(Router)

const dlibAppRouterPrefix = window.dlibAppRouterPrefix;
const ruterBase = dlibAppRouterPrefix
  ? dlibAppRouterPrefix + "/usermanage/"
  : "/usermanage/";

export default new Router({
  mode: "history",
  base: process.env.NODE_ENV == "production" ? ruterBase : "", // 打包时需要配置二级目录名
  routes: [
    //{ path: '/', redirect: '/admin_userManager' },
    {
      path: "/web",
      name: "index",
      component: r =>
        require.ensure(
          [],
          () => r(require("@/components/web/common/index")),
          "index"
        ),
      meta: { title: "首页", keepAlive: true },
      children: webRouter.router,
      async beforeEnter(to, from, next) {
        if (localStorage.getItem("token")) {
          let response = await axios({
            url: "/appcenter/api/baseinfo/getauthinfo?appcode=usermanage",
            method: "get"
          }).then(x => x.data);
          if (response.data.canWeb) {
            next();
            return;
          }
          next({ name: "403" });
        } else {
          next();
        }
      }
    },
    {
      path: "/admin",
      name: "index",
      component: r =>
        require.ensure(
          [],
          () => r(require("@/components/admin/common/index")),
          "index"
        ),
      meta: { title: "首页", keepAlive: true },
      children: adminRouter.router,
      async beforeEnter(to, from, next) {
        if (localStorage.getItem("token")) {
          let response = await axios({
            url: "/appcenter/api/baseinfo/getauthinfo?appcode=usermanage",
            method: "get"
          }).then(x => x.data);
          if (response.data.canAdmin) {
            next();
            return;
          }
          next({ name: "403" });
        } else {
          next();
        }
      }
    },
    {
      path: "/403",
      name: "403",
      component: r =>
        require.ensure([], () => r(require("@/components/403")), "index")
    },
    {
      path: "/404",
      name: "404",
      component: r =>
        require.ensure([], () => r(require("@/components/404")), "index")
    },
    {
      path: "/500",
      name: "500",
      component: r =>
        require.ensure([], () => r(require("@/components/500")), "index")
    },
    // {//重定向中间件
    //   path: '/',
    //   name: 'reset',
    //   beforeEnter: async (to, from, next) => {
    //     let path = await casCallbake('/admin_userManager');
    //     next(path);
    //   }
    // },
    {
      path: "*",
      redirect: "/404"
    }
  ]
});
