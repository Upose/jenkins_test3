<template>
  <div id="user_sys" class="admin-warp-app" v-if="isInfoLoad">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'user_sys',
 data() {
    return {
      isInfoLoad: false
    }
  },
  created() {
    this.getAppInfo();
  },
  mounted() {
    this.$i18n.locale = this.$store.state.language;
  },
  methods: {
    // 获取应用名 版本号
    getAppInfo() {
      this.http.getJson('getcurrentappinfo', { appcode: 'usermanage' }).then(res => {
        this.$store.commit('setAppInfo', res.data);
        this.getBaseInfo();
      }).catch(err => {
        alert('应用信息获取失败！');
      })
    },
    // 获取基础信息
    getBaseInfo() {
      this.http.getJson('getbaseinfo').then(res => {
        if (res.data) {
          localStorage.setItem('fileUrl', res.data.orgInfo.fileUrl);
          localStorage.setItem('headerFooterInfo', JSON.stringify(res.data.headerFooterInfo));
          localStorage.setItem('orgInfo', JSON.stringify(res.data.orgInfo));
          localStorage.setItem('urlInfo', JSON.stringify(res.data.urlInfo));
          if (res.data && res.data.userInfo) {
            localStorage.setItem('userInfo', JSON.stringify(res.data.userInfo));
          }
          localStorage.setItem('baseinfo_time_stamp', new Date().getTime());
          this.isInfoLoad = true;
        }
      }).catch(err => {
        alert('基础数据获取失败！');
        // this.$message({ type: 'error', message: '获取基础数据失败!' });
      });
    },
  },
}
</script>

<style lang="less">
@import "./assets/public/css/public.less";
</style>
