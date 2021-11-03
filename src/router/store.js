import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: undefined,
  },
  getters: {
    token: (state) => state.token,
  },
  mutations: {
    login: (state, data) => {
      state.token = data.token || undefined;
      sessionStorage.setItem('token',data.token);
    },
    logout: (state) => {
      state.token = undefined;
      sessionStorage.clear();
    },
    getSession:(state)=>{
      var token = sessionStorage.getItem('token') || undefined;
      state.token = token;
    },
  },
});


/**
 * 使用：
 * js中使用 this.$store.state.menus;   页面中使用 {{ $store.state.menus }}
 * this.$store.commit('logout',{});方法调用
 */
/***
 * 用sessionStorage存数据
 * 默认先从sessionStorage里面取
 * 然后放入state里面，便于页面取值
 * 
 * 在main.js里面判断是否session还存在，不存在跳到登录，存在则将信息重新存储到store中
 * 退出登录的时候，要将session全部清除掉
 */



