/***门户路由 */
async function beforeEnterImplAsync(to, from, next) {
  let response = await axios({
    url: '/appcenter/api/baseinfo/getauthinfo?appcode=navigation',
    method: 'get'
  }).then(x => x.data);
  if (response.data.canWeb) { next(); return }
  next({ name: '403' })
}
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

  ].map(x => {
    x.beforeEnter = beforeEnterImplAsync;
    return x;
  })
};
