<template>
  <div id="user_sys" class="admin-warp-app" v-if="isInfoLoad && post_details">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'user_sys',
  data() {
    return {
      isInfoLoad: false,
      post_details: false,
    }
  },
  async created() {
    await casCallbake('/web_library');
    this.getBaseInfo();
    this.getAppsDetails();
  },
  mounted() {
    this.$i18n.locale = this.$store.state.language;
  },
  methods: {
    //获取应用名称信息等
    async getAppsDetails() {
      var res = await handleAppState('usermanage');
      if (res.code == 200) {
        this.$store.commit('setAppInfo', res.data);
        this.post_details = true;
      } else if (res.code == 499) {
        this.$router.push({ path: "/403", query: { txt: res.message } });
        this.post_details = true;
      } else if (res.code == 500) {
        this.$message({ type: 'error', message: '获取应用详情失败!' });
      }
    },
    //获取基础信息
    async getBaseInfo() {
      var res = await handleGetBaseInfo();
      if (res.code == 200) {
        this.$store.commit('baseinfo', res.data);
        this.$root.fileUrl = res.data.orgInfo.fileUrl;
        this.isInfoLoad = true;
      } else {
        this.$message({ type: 'error', message: res.message || '获取基础数据失败！' });
      }
    },
  },
}
</script>

<style lang="less">
@import "./assets/public/css/public.less";
</style>
