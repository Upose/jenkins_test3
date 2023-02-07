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
  data() {
    return {
      path: '',
      home: 'web',
      hintTxt: this.$route.query.txt || '',
    }
  },
  mounted() {
    document.title = '403'
    this.get403();
  },
  methods: {
    get403() {
      let is_admin = window.sessionStorage.getItem('backHome');
      let path = window.sessionStorage.getItem('backUrl');
      if (is_admin && is_admin != null && is_admin != undefined && is_admin != '') {
        this.home = is_admin;
      }
      if (path && path != null && path != undefined && path != '') {
        this.path = path;
      }
    },
    goBack() {
      if (this.path && this.path != '') {
        window.location.replace(this.path);
      } else {
        this.goHome();
      }
    },
    goHome() {
      if (this.home == 'admin') {
        let url = this.$setHref({ type: 'dlib', url: ['workbench', `/admin_workbench`] })
        location.href = url;
      } else {
        let url = this.$setHref({ type: 'dlib', url: ['index'] })
        location.href = url;
      }
    },
  },
}
</script>

<style lang="less" scoped>
@import "../assets/public/css/error.less";
</style>
