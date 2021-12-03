/***门户路由 */
export default {
  router: [
    // {
    //   path: "/dataBaseHome",
    //   name: "dataBaseHome",
    //   component: r =>
    //     require.ensure(
    //       [],
    //       () => r(require("@/components/web/view/DataBase/Home")),
    //       "dataBaseHome"
    //     ),
    //   meta: { title: "数据库首页", keepAlive: true }
    // },
    // {
    //   path: "/registeredAccount",
    //   name: "registeredAccount",
    //   component: r => require.ensure([], () => r(require("@/components/web/view/user/registered/registered_account")), "registered_account"),
    //   meta: { title: "注册", keepAlive: true }
    // },
    // {
    //   path: "/registeredAccountInfo",
    //   name: "registeredAccountInfo",
    //   component: r => require.ensure([], () => r(require("@/components/web/view/user/registered/registered_account_info")), "registered_account_info"),
    //   meta: { title: "注册", keepAlive: true }
    // },
    // {
    //   path: "/registeredForm",
    //   name: "registeredForm",
    //   component: r => require.ensure([], () => r(require("@/components/web/view/user/registered/registered_form")), "registered_form"),
    //   meta: { title: "注册", keepAlive: true }
    // },
    // {
    //   path: "/registeredForm2",
    //   name: "registeredForm2",
    //   component: r => require.ensure([], () => r(require("@/components/web/view/user/registered/registered_form2")), "registered_form2"),
    //   meta: { title: "注册", keepAlive: true }
    // },
    // {
    //   path: "/registeredSuccess",
    //   name: "registeredSuccess",
    //   component: r => require.ensure([], () => r(require("@/components/web/view/user/registered/registered_success")), "registered_success"),
    //   meta: { title: "注册", keepAlive: true }
    // },
    // {
    //   path: "/registeredSub",
    //   name: "registeredSub",
    //   component: r => require.ensure([], () => r(require("@/components/web/view/user/registered/registered_sub")), "registered_sub"),
    //   meta: { title: "注册", keepAlive: true }
    // },

    // {
    //   path: "/forgetPassword",
    //   name: "forgetPassword",
    //   component: r => require.ensure([], () => r(require("@/components/web/view/user/login/forget_password")), "forget_password"),
    //   meta: { title: "忘记密码", keepAlive: true }
    // },
    // {
    //   path: "/loginAccount",
    //   name: "loginAccount",
    //   component: r => require.ensure([], () => r(require("@/components/web/view/user/login/login_account")), "login_account"),
    //   meta: { title: "登录", keepAlive: true }
    // },


    {
      path: "/accountSet",
      name: "accountSet",
      component: r => require.ensure([], () => r(require("@/components/web/view/user/account_set/account_set")), "account_set"),
      meta: { title: "个人图书馆-账号设置", keepAlive: true }
    },
    {
      path: "/library",
      name: "library",
      component: r => require.ensure([], () => r(require("@/components/web/view/user/library/library")), "library"),
      meta: { title: "个人图书馆", keepAlive: true }
    },

  ]
};
