<!--面包屑-->
<template>
  <div class="breadcrumb-page">
    <el-breadcrumb separator-class="el-icon-arrow-right" :class="'fff'">
      <!-- 馆员工作台 -->
      <span class="el-breadcrumb__item cu-p" aria-current="page" @click="toWorkbench">
        <span role="link" class="el-breadcrumb__inner"><i class="el-icon-s-home"></i></span>
        <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
      </span>
      <el-breadcrumb-item class="cu-p" v-for="(item,index) in breadcrumbList" :key="index" :to="item.path">{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import http from "@/assets/public/js/http";
export default {
  name: 'breadcrumbPage',
  props: ['cuMenu', 'fontColor'],
  data() {
    return {
      breadcrumbList: [{ name: this.$store.getters.appInfo.appName }, ...this.$route.meta.title]
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    toWorkbench() {
      let urlInfo = JSON.parse(localStorage.getItem('urlInfo'));
      let info = urlInfo.find(item => item.code == 'workbench');
      window.location.href = info.path + '/workbench/#/admin_workbench';
    }
  },
}
</script>

<style lang="less" scoped>
@import "../../../assets/admin/css/color.less"; /**颜色配置 */
.breadcrumb-page {
  color: @ph-col-n12;
  height: 30px;
}
.fff {
  /deep/ .el-breadcrumb__inner {
    color: @m-col-b0 !important;
  }
  /deep/ .el-breadcrumb__separator {
    color: @m-col-b0 !important;
  }
}
.cu-p {
  cursor: pointer;
  // &:hover{
  //   opacity: .8;
  // }
}
</style>
