import Vue from 'vue'
import Router from 'vue-router'
import cf_router from './cf_router';
import hy_router from './hy_router';
import pop_router from './pop_router';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/cf',
      name: 'index',
      component: r => require.ensure([], () => r(require('@/common/index')), 'index'),
      meta: { title: '首页' , keepAlive:true},
      children:cf_router.router
    },
    {
      path: '/hy',
      name: 'index',
      component: r => require.ensure([], () => r(require('@/common/index')), 'index'),
      meta: { title: '首页' , keepAlive:true},
      children:hy_router.router
    },
    {
      path: '/pop',
      name: 'index',
      component: r => require.ensure([], () => r(require('@/apps_pop/index')), 'index'),
      meta: { title: '应用开放平台' , keepAlive:true},
      children:pop_router.router
    },
    {
      path: '/',
      name: 'login',
      component: r => require.ensure([], () => r(require('@/components/view/login')), 'index'),
      meta: { title: '登录' , keepAlive:true},
    },
    // {
    //   path: '/iframe_view',
    //   name: 'iframe_view',
    //   component: r => require.ensure([], () => r(require('@/components/view/service_china/iframe_view')), 'iframe_view'),
    //   meta: { title: '预览页面' , keepAlive:true},
    // },
    {
      path: '*',
      name: '/404',
      component: r => require.ensure([], () => r(require('@/components/view/404')), 'index'),
    },
  ]
})
