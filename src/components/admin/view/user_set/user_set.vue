<!---信息导航-栏目信息-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse ? 'fold-menu' : ''">
        <serviceLMenu :isActive="8"></serviceLMenu>
      </el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{ 'content-collapse': $root.collapse }">
        <breadcrumb :cuMenu="'栏目管理'" :fontColor="'fff'"></breadcrumb>
        <!--面包屑导航--->
        <div class="content search-table-general">
          <div class="search-table-w">
            <h1 class="search-title">
              用户属性管理
            </h1>
            <div class="search-term">
              <div class="check-box">
                <span :class="check_num == 'base' ? 'active' : ''" @click="checkClick('base')">基础设置</span>
                <span :class="check_num == 'auth' ? 'active' : ''" @click="checkClick('auth')">权限管理</span>
              </div>
            </div>
          </div>
          <!--顶部查询 end-->

          <!-- 目录 -->
          <div class="table-w" v-show="check_num == 'base'">
            <baseSet></baseSet>
          </div>
          <!-- 内容 -->
          <div class="table-w" v-show="check_num == 'auth'">
            <bauthSet></bauthSet>
          </div>
          <!--管理页列表 end--->
        </div>
        <!---顶部查询板块 end--->
        <footerPage class="top20"></footerPage>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import bus from "@/assets/public/js/bus";
import http from "@/assets/public/js/http";
import footerPage from "@/components/admin/common/footer";
import breadcrumb from "@/components/admin/model/breadcrumb";
import paging from "@/components/admin/model/paging";
import serviceLMenu from "@/components/admin/model/serviceLMenu_user";
import baseSet from './base_set';
import bauthSet from './auth_set';

export default {
  name: "index",
  created() {
    // bus.$on("collapse", (msg) => {
    //   this.$root.collapse = msg;
    //   this.$forceUpdate();
    // });
  },
  components: { footerPage, serviceLMenu, breadcrumb, paging,baseSet,bauthSet  },
  data() {
    return {
      check_num: "base",
    };
  },
  mounted() {
    this.check_num = this.$route.query.type ? this.$route.query.type : 'base'
  },
  methods: {
    /**目录，内容切换**/
    checkClick(val) {
      this.check_num = val;
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../../../assets/admin/css/color.less"; /**颜色配置 */
@import "../../../../assets/admin/css/form.less";
.t-p {
  /deep/.el-table [class*="el-table__row--level"] .el-table__expand-icon {
    margin-left: -20px;
    margin-right: 0px;
  }

  /deep/ .el-table__indent {
    padding-left: 10px !important;
    margin-left: -29px;
  }
}
</style>
