<template>
  <div class="warp">
    <headerpage></headerpage>
    <div class="admin-warp-content">
      <!-- <keep-alive>
        <router-view></router-view>
      </keep-alive> -->
      <router-view v-if="authLoad"></router-view>
    </div>
    <!-- <footerpage class="footer-page"></footerpage> -->
  </div>
</template>

<script>
import headerpage from '@/components/admin/common/header'
import footerpage from '@/components/admin/common/footer'
export default {
  name: 'index',
  components: { headerpage, footerpage },
  data() {
    return {
      authLoad: false
    }
  },
  created() {
    // 设置网页标题
    document.title = this.$store.getters.appInfo.appName + '-' + JSON.parse(localStorage.getItem('orgInfo')).orgName;
  },
  mounted() {
    this.getAuth();
  },
  methods: {
    getAuth() {
      this.http.getJson('user-permission-tree').then(res => {
        this.$store.commit('setAuthList', res.data.permissionNodes);
        this.handleSetAuth(res.data.permissionNodes);
      }).catch(err => {
        this.$message({ type: 'error', message: '获取侧边栏数据失败!' });
      })
    },
    // 取所有权限
    handleSetAuth(list) {
      let authList = [];
      list.forEach(item => {
        eachGetAuth(item)
      })
      // 递归取权限
      function eachGetAuth(ele) {
        if (ele.permission) {
          authList.push(ele.permission);
        }
        if (ele.permissionNodes && ele.permissionNodes.length) {
          ele.permissionNodes.forEach(item => {
            eachGetAuth(item)
          })
        }
      }
      this.$store.commit('SET_STORE', { name: 'allAuthList', value: authList })
      this.authLoad = true;
    },
  }
}
</script>

<style lang="less">
@import "../../../assets/admin/css/elementui-theme/index.css"; //elementui自定义主题样式
@import "../../../assets/admin/font/iconfont.css";
@import "../../../assets/admin/css/color.less";
@import "../../../assets/admin/css/style.less";
@import "../../../assets/admin/css/table.less";

.warp {
  width: 100%;
  height: 100%;
  position: relative;
}
.admin-warp-content {
  position: absolute;
  left: 0;
  right: 0;
  top: 40px;
  bottom: 0;
}
</style>
