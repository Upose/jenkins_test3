<!---新闻发布-栏目管理-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse?'fold-menu':''"><serviceLMenu :isActive="3"></serviceLMenu></el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{'content-collapse':$root.collapse}">
        <breadcrumb :cuMenu="'馆员管理'" :fontColor="'fff'"></breadcrumb><!--面包屑导航--->
        <div class="content search-table-general">
          <div class="search-table-w">
              <h1 class="search-title">馆员管理</h1>
          </div><!--顶部查询 end-->
          <div class="login-list">
              <div class="list-box">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="馆员管理" name="first">
                            <Librarian></Librarian>
                        </el-tab-pane>
                        <!-- <el-tab-pane label="馆员日志" name="second">
                            <LibrarianLog></LibrarianLog>
                        </el-tab-pane> -->
                    </el-tabs>
              </div>
          </div>
        </div><!---content end--->
        <footerPage class="top20"></footerPage>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// import bus from '@/assets/public/js/bus';;
import http from "@/assets/public/js/http";
import footerPage from "@/components/admin/common/footer";
import breadcrumb from "@/components/admin/model/breadcrumb";
import paging from "@/components/admin/model/paging";
import serviceLMenu from "@/components/admin/model/serviceLMenu_user";
import Librarian from "../librarian_list/librarian_list";
import LibrarianLog from "../librarian_log/librarian_log";
export default {
  name: 'index',
  created(){
    // bus.$on('collapse', msg => {
    //   this.$root.collapse = msg;
    //   this.$forceUpdate();
    // })
  },
  components:{footerPage,serviceLMenu,breadcrumb,paging,Librarian,LibrarianLog},
  data () {
    return {
        activeName:"first",
    }
  },
  mounted(){
    //   this.initData();
    this.activeName = this.$route.query.type ? this.$route.query.type : 'first'
  },
  methods:{
     handleClick(tab, event) {
        console.log(tab, event);
     }
  },
}
</script>

<style lang="less" scoped>
@import "../../../../assets/admin/css/color.less"; /**颜色配置 */
@import "../../../../assets/admin/css/form.less";
.content{
  .s-w{
      min-height: 60px;
      line-height: 57px;
      padding: 0 20px;
      border-bottom: 1px solid @EBEEF5;
      background-color: @fff;
      .d-title{
        color: @34395E;
        font-size: 14px;
        margin-left: 20px;
      }
    }
}
.m-top{
  margin-top: 24px;
}
 .login-list{
   width: 100%;
   background:#fff ;
   padding:0;
   margin:auto;
   border-top:8px solid #fbfbfb;
 }
 .list-box{
     width:96%;
     margin:auto;
 }
 /deep/ .el-tabs__nav-wrap::after{
     background-color:#fff;
 }
 /deep/ .el-tabs__item{
     height:42px;
     line-height:42px;
 }
</style>
