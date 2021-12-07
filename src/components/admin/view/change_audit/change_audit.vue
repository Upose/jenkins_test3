<!---信息导航-栏目信息-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse ? 'fold-menu' : ''">
        <serviceLMenu :isActive="7"></serviceLMenu>
      </el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{ 'content-collapse': $root.collapse }">
        <breadcrumb :cuMenu="'栏目管理'" :fontColor="'fff'"></breadcrumb>
        <!--面包屑导航--->
        <div class="content search-table-general">
          <div class="search-table-w">
            <h1 class="search-title">
              变动审核
            </h1>
            <div class="search-term">
              <div class="check-box">
                <span :class="check_num == 'reader' ? 'active' : ''" @click="checkClick('reader')">读者修改</span>
                <span :class="check_num == 'attribute' ? 'active' : ''" @click="checkClick('attribute')">属性修改</span>
                <!-- <span :class="check_num == 'registered' ? 'active' : ''" @click="checkClick('registered')">注册审核</span> -->
                <span :class="check_num == 'card' ? 'active' : ''" @click="checkClick('card')">领卡审核</span>
              </div>
            </div>
          </div>
          <!--顶部查询 end-->

          <!-- 读者修改 -->
          <div class="table-w" v-show="check_num == 'reader'">
            <reader :dataKey="dataKey"></reader>
          </div>

          <!-- 属性修改 -->
          <div class="table-w" v-show="check_num == 'attribute'">
            <attribute :dataKey="dataKey"></attribute>
          </div>

          <!-- 注册审核 -->
          <!-- <div class="table-w" v-show="check_num == 'registered'">
            <register :dataKey="dataKey"></register>
          </div> -->

          <!-- 领卡审核 -->
          <div class="table-w" v-show="check_num == 'card'">
            <card :dataKey="dataKey"></card>
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
import reader from './model/reader';
import attribute from './model/attribute';
import register from './model/register';
import card from './model/card';
import attributeGroup from './model/attribute_group';

export default {
  name: "index",
  created() {
    bus.$on("collapse", (msg) => {
      this.$root.collapse = msg;
    });

    this.initData();
  },
  components: { footerPage, serviceLMenu, breadcrumb, paging, attribute, attributeGroup,reader,register,card },
  data() {
    return {
      check_num: "reader",
      dataKey:null,
    };
  },
  mounted() {
  },
  methods: {
    // 页面子权限判定
    isAuth(name){
      let authList = this.$store.getters.authList;
      let curAuth = authList.find(item=>(item.router == '/changeAudit'));
      // let curAuth = authList.find(item=>(item.router == this.$route.path));
      let curSonAuth = curAuth ? curAuth.permissionNodes.find(item=>(item.permission==name)) : null;
      return curSonAuth?true:false;
    },
    /**目录，内容切换**/
    checkClick(val) {
      this.check_num = val;
    },
    initData() {
      this.check_num = this.$route.query.type || "reader";
      this.getDataKey();
    },
    getDataKey() {
      http.getJson('change-init-data').then(res => {
        this.dataKey = res.data;
        // sessionStorage.setItem('user_dataKey',JSON.stringify(res.data))
      }).catch(err => {
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    }
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
