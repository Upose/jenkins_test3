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

//判断是否本站地址url,返回true表示本站，无需open() | is_web:true表示前台；false表示后台
Vue.prototype.isThirdpartyApp = function (is_web, url) {
  var port_url = {};
  var is_open = false;//true 打开新窗口，false不打开新窗口
  var orgInfo = localStorage.getItem('orgInfo');
  if (orgInfo && orgInfo != '' && orgInfo != undefined && orgInfo != 'null' && orgInfo != 'undefined') {
    port_url = JSON.parse(localStorage.getItem('orgInfo')) || {};
    if (is_web) {
      (url.indexOf(port_url.onlinePortalUrl) > -1 || url.indexOf(port_url.portalUrl) > -1) ? is_open = true : is_open = false;
    } else {
      (url.indexOf(port_url.onlineManageUrl) > -1 || url.indexOf(port_url.manageUrl) > -1) ? is_open = true : is_open = false;
    }
  }
  return is_open;
}

/**
 * 按钮防抖 点击之后一秒不可再点击
 * 使用方式： v-button-debounce
 * 使用范围：提交、查询、下载按钮
 */
Vue.directive('button-debounce', {
  bind: function (el, binding) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.classList.add('is-loading')
        el.disabled = true
        setTimeout(() => {
          el.classList.remove('is-loading')
          el.disabled = false
        }, 1000)
      }
    });
  }
});

const i18n = new VueI18n({
  locale: window.localStorage.getItem('locale') || 'zh-CN',
  messages: {
    'zh-CN': require('@/assets/public/lang/zh'),   // 中文
    'zh-HANT': require('@/assets/public/lang/hant'),    // 繁体
    'en-US': require('@/assets/public/lang/en')    // 英文
  }
})

let timer = setInterval(() => {
  if (axios && axios.defaults && axios.defaults.loaded) {
    clearInterval(timer);
    new Vue({
      el: '#zt_user_center_sys',
      router,
      i18n,
      store,
      components: { App },
      template: '<App/>',
      data() {
        return {
          collapse: false,
        }
      }
    })
  }
}, 100);

