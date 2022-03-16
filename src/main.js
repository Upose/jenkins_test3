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



let timer = setInterval(() => {
  if (axios && axios.defaults && axios.defaults.loaded) {
    clearInterval(timer);
    // 获取 应用基础信息 每隔十分钟更新一次信息
    if (!localStorage.getItem('baseinfo_time_stamp') || (parseInt(localStorage.getItem('baseinfo_time_stamp')) + 10 * 60 * 1000) < new Date().getTime()) {
      getbaseinfoFun();
    } else {
      if (localStorage.getItem('token') && !localStorage.getItem('userInfo')) {
        getbaseinfoFun();
      }
    }
    function getbaseinfoFun() {
      http.getJson('getbaseinfo').then(res => {
        if (res.data) {
          localStorage.setItem('fileUrl', res.data.orgInfo.fileUrl);
          localStorage.setItem('headerFooterInfo', JSON.stringify(res.data.headerFooterInfo));
          localStorage.setItem('orgInfo', JSON.stringify(res.data.orgInfo));
          localStorage.setItem('urlInfo', JSON.stringify(res.data.urlInfo));
          if (res.data && res.data.userInfo) {
            localStorage.setItem('userInfo', JSON.stringify(res.data.userInfo));
          }
          localStorage.setItem('baseinfo_time_stamp', new Date().getTime());
        }
      }).catch(err => {
        alert('基础数据获取失败');
        // this.$message({ type: 'error', message: '获取基础数据失败!' });
      });
    }
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

