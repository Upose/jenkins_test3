<!--
 * @Author: LuJiangPeng-lxx lujiangpeng@vipinfo.com.cn
 * @Date: 2023-03-29 16:25:25
 * @LastEditors: LuJiangPeng-lxx lujiangpeng@vipinfo.com.cn
 * @LastEditTime: 2023-03-29 16:36:27
 * @FilePath: \user_center_sys\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
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
    await this.getBaseInfo();
    await this.getAppsDetails();
    this.updateUserPhotoUrl();
  },
  mounted() {
    this.$i18n.locale = this.$store.state.language;
  },
  methods: {
    //统一补全用户头像url格式规范 userInfo.photo
    updateUserPhotoUrl() {
      if (window.localStorage.getItem("userInfo")) {
        let info = JSON.parse(window.localStorage.getItem("userInfo"));
        info.photo = this.$imgUrlComple(info.photo);
        let jsinfo = JSON.stringify(info);
        // window.localStorage.removeItem("userInfo");
        window.localStorage.setItem("userInfo", jsinfo);
        // console.log(window.localStorage);
      }
    },
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
