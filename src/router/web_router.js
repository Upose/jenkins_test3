/***门户路由 */
export default {
  router: [
    {
      path: "/web_accountSet",
      name: "web_accountSet",
      component: r => require.ensure([], () => r(require("@/components/web/view/user/account_set/account_set")), "account_set"),
      meta: { title: "个人图书馆-账号设置", keepAlive: true }
    },
    {
      path: "/web_library",
      name: "web_library",
      component: r => require.ensure([], () => r(require("@/components/web/view/user/library/library")), "library"),
      meta: { title: "个人图书馆", keepAlive: true }
    },
    {
      path: "/web_activate",
      name: "web_activate",
      component: r => require.ensure([], () => r(require("@/components/web/view/activate/index")), "activate"),
      meta: { title: "账号激活", keepAlive: true }
    },
  ]
};
