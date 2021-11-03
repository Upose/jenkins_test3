import Vue from 'vue'
import App from './App'
import router from './router'

import store from './router/store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'babel-polyfill';
import Debounce from '@/assets/js/debounce'

import http from "@/assets/js/http";


Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.component('Debounce', Debounce)
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: window.localStorage.getItem('locale') || 'zh-CN',
  messages: {
    'zh-CN': require('@/assets/lang/zh'),   // 中文
    'zh-HANT': require('@/assets/lang/hant'),    // 繁体
    'en-US': require('@/assets/lang/en')    // 英文
  }
})

router.beforeEach((to, from, next) => {
  // const token = sessionStorage.getItem('token');
  // if (!token && to.path !== '/login') {
  //     next('/login');
  // } else {
  //   next();
  // }

  // 当进入数据库导航相关页面时获取表单总数据
  let databasePathName = ['databaseNav', 'databaseAdd', 'databaseEdit', 'databaseNavigation', 'databaseAttr', 'databaseSet'];
  if (databasePathName.indexOf(to.name) != -1) {
    http.getJson('database-initialized-model').then(res => {
      sessionStorage.setItem('dataKey', JSON.stringify(res.data));
    }).catch(err => {
      console.log(err);
    })
  }
  next();
})

new Vue({
  el: '#app',
  router,
  i18n,
  store,
  data() {
    return {
      collapse: false,
    }
  },
  methods: {
    backClick() {
      window.history.go(-1);
    },
  },
  components: { App },
  template: '<App/>'
})
