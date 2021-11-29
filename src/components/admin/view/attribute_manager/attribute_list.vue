<!---信息导航-栏目信息-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse ? 'fold-menu' : ''">
        <serviceLMenu :isActive="5"></serviceLMenu>
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
                <span :class="check_num == 'attribute' ? 'active' : ''" @click="checkClick('attribute')">属性</span>
                <span :class="check_num == 'attribute_group' ? 'active' : ''" @click="checkClick('attribute_group')">属性组</span>
              </div>
            </div>
          </div>
          <!--顶部查询 end-->

          <!-- 目录 -->
          <div class="table-w" v-show="check_num == 'attribute'">
            <attribute></attribute>
          </div>
          <!-- 内容 -->
          <div class="table-w" v-show="check_num == 'attribute_group'">
            <attributeGroup></attributeGroup>
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
import attribute from './model/attribute';
import attributeGroup from './model/attribute_group';

export default {
  name: "index",
  created() {
    bus.$on("collapse", (msg) => {
      this.$root.collapse = msg;
    });
  },
  components: { footerPage, serviceLMenu, breadcrumb, paging, attribute, attributeGroup },
  data() {
    return {
      check_num: "attribute",
    };
  },
  mounted() {
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
