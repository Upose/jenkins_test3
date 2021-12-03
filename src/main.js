import Vue from 'vue'
import App from './App'
import router from './router'

import store from './router/store'
import Debounce from '@/assets/public/js/debounce'
import http from '@/assets/public/js/http';
import bus from '@/assets/public/js/bus';
import validator from "@/assets/public/js/validator.js";
import { timeFormat, friendlyError } from "@/assets/public/js/util";

Vue.config.productionTip = false

Vue.prototype.http = http;
Vue.prototype.bus = bus;
Vue.prototype.$validator = validator;//前端Rule验证帮助类
Vue.prototype.setTime = timeFormat;//格式化时间
Vue.prototype.handleError = friendlyError;//异常消息处理

Vue.component('Debounce', Debounce)
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: window.localStorage.getItem('locale') || 'zh-CN',
  messages: {
    'zh-CN': require('@/assets/public/lang/zh'),   // 中文
    'zh-HANT': require('@/assets/public/lang/hant'),    // 繁体
    'en-US': require('@/assets/public/lang/en')    // 英文
  }
})

// router.beforeEnter ((to, from, next) => {
//   let originUrl = localStorage.getItem('COM+');
//   localStorage.removeItem('COM+');
//   if (originUrl == null) { next('/404'); return; }
//   let ticketRegex = /\?ticket=([^#]+)#/;

//   let regexResult = ticketRegex.exec(location.href);
//   if (regexResult.length > 1) {
//     let ticket = regexResult[1];
//     let ticketHref = `http://192.168.21.36:6001/api/third-part-auth/cas-proxy?ticket=${ticket}&service=${encodeURIComponent(location.origin)}`;
//     axios({
//       url: ticketHref,
//       method: 'get'
//     })
//       .then(x => {

//         let xml = x.data.data;
//         if (!xml) { next('/404'); return; }
//         let xdoc = new DOMParser().parseFromString(xml.toString(), 'application/xml');

//         let tokenElements = xdoc.getElementsByTagName("cas:access_token");
//         if (tokenElements.length > 0) {
//           let token = tokenElements[0].innerHTML;
//           localStorage.setItem('token', token);

//           window.open(originUrl, '_blank')
//           window.close();
//           next(originUrl);
//           return;
//         }
//       })

//     //fetch(ticketHref).then(x=>console.log(x));
//   }
//   next('/404');
// })
// router.beforeEach((to, from, next) => {
//   let originUrl = localStorage.getItem('COM+');
//   localStorage.removeItem('COM+');
//   if (originUrl == null) { next('/404'); return; }
//   let ticketRegex = /\?ticket=([^#]+)#/;

//   let regexResult = ticketRegex.exec(location.href);
//   if (regexResult.length > 1) {
//     let ticket = regexResult[1];
//     let ticketHref = `http://192.168.21.36:6001/api/third-part-auth/cas-proxy?ticket=${ticket}&service=${encodeURIComponent(location.origin)}`;
//     axios({
//       url: ticketHref,
//       method: 'get'
//     })
//       .then(x => {

//         let xml = x.data.data;
//         if (!xml) { next('/404'); return; }
//         let xdoc = new DOMParser().parseFromString(xml.toString(), 'application/xml');

//         let tokenElements = xdoc.getElementsByTagName("cas:access_token");
//         if (tokenElements.length > 0) {
//           let token = tokenElements[0].innerHTML;
//           localStorage.setItem('token', token);

//           window.open(originUrl, '_blank')
//           window.close();
//           next(originUrl);
//           return;
//         }
//       })

//     //fetch(ticketHref).then(x=>console.log(x));
//   }
//   next('/404');
// })

new Vue({
  el: '#database_nav_sys',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
})
