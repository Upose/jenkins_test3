<template>
  <div class="warp">
    <headerpage></headerpage>
    <div class="admin-warp-content">
      <!-- <keep-alive>
        <router-view></router-view>
      </keep-alive> -->
      <router-view></router-view>
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
    return {}
  },
  created() {
    // 设置网页标题
    document.title = this.$store.getters.appInfo.appName + '-' + JSON.parse(localStorage.getItem('orgInfo')).orgName;
  },
  methods: {

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
