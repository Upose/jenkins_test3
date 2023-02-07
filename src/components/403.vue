<template>
  <div class="page-warp">
    <div class="txt-content">
      <div class="txt-left">
        <div class="error-hint">
          <span class="err-title">出错啦！</span>
          <span>{{hintTxt?hintTxt:'您没有当前页面的访问权限。'}}</span>
        </div>
        <button class="go-flush" @click="goBack()">返回上一页</button>
        <button class="go-home" @click="goHome()">回到首页</button>
      </div>
      <div class="img-404">
        <img src="@/assets/public/img/403.gif">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '403page',
  beforeRouteEnter(to, from, next) {
    if (from.fullPath.indexOf('admin') > -1) {
      this.home = 'admin';
    }
    next();
  },
  data() {
    return {
      code: 'index',
      path: '/index',
      home: 'web',
    }
  },
  mounted() {
    document.title = '403';
    if (this.home == 'web') {
      this.code = 'index';
      this.path = '/index?page=1';
    } else {
      this.code = 'workbench'
      this.path = '/admin_workbench';
    }
  },
  methods: {
    goHome() {
      let url = this.$setHref({ type: 'dlib', url: [this.code, this.path] });
      location.href = url;
    },
    goBack() {
      window.history.go(-1);
    }
  },
}
</script>

<style lang="less" scoped>
@import "../assets/public/css/error.less";
</style>
