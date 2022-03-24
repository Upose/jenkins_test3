<!---新闻发布-栏目管理-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse?'fold-menu':''"><serviceLMenu :isActive="1"></serviceLMenu></el-aside>
      <el-main class="admin-content pd admin-bg-top1" :class="{'content-collapse':$root.collapse}">
        <div class="content search-table-general">
          <div class="login-list">
              <div>
                  <div class="login-list-box">
                        <div class="box-radio">
                            <img src="@/assets/admin/img/userManager/duzhe.png"/>
                        </div>
                        <div class="box-title">读者管理</div>
                        <div class="box-words">
                            <span @click="to('/admin_readerList')" v-if="isAuth('reader:list','/admin_readerList')">读者列表</span>
                            <span @click="to('/admin_readerAdd')" v-if="isAuth('reader:create','/admin_readerList')">新增读者</span>
                            <span @click="to('/admin_importUser')" v-if="isAuth('reader:import','/admin_readerList')">导入读者</span>
                        </div>
                        <div class="box-words">
                            <span @click="to('/admin_changeAudit','registered')" v-if="isAuth('approve:registerList','/admin_changeAudit')">注册审核</span>
                            <span @click="to('/admin_changeAudit','reader')" v-if="isAuth('approve:readerList','/admin_changeAudit')">读者修改审核</span>
                        </div>
                    </div>
                    <div class="login-list-box">
                        <div class="box-radio">
                            <img src="@/assets/admin/img/userManager/guanyuan.png"/>
                        </div>
                        <div class="box-title">馆员管理</div>
                        <div class="box-words">
                            <span @click="to('/admin_librarianManagement','first')" v-if="isAuth('staff:list','/admin_librarianManagement')">馆员通讯录</span>
                            <!-- <span @click="to('/admin_librarianManagement','second')" v-if="isAuth('','')">馆员日志</span> -->
                        </div>
                    </div>
                    <div class="login-list-box">
                        <div class="box-radio">
                            <img src="@/assets/admin/img/userManager/duzhe.png"/>
                        </div>
                        <div class="box-title">读者卡管理</div>
                        <div class="box-words">
                            <span @click="to('/admin_readerCardList')" v-if="isAuth('card:list','/admin_readerCardList')">读者卡列表</span>
                            <span @click="to('/admin_readerCardAdd')" v-if="isAuth('card:create','/admin_readerCardList')">新增读者卡</span>
                            <span @click="to('/admin_changeAudit','card')" v-if="isAuth('approve:cardClaimList','/admin_changeAudit')">领卡审核</span>
                        </div>
                        <!-- <div class="box-words">
                           <span>同步日志</span>
                        </div> -->
                    </div>
                    <div class="login-list-box">
                        <div class="box-radio">
                            <img src="@/assets/admin/img/userManager/shuxing.png"/>
                        </div>
                        <div class="box-title">属性管理</div>
                        <div class="box-words">
                            <span @click="to('/admin_attributeList')" v-if="isAuth('property:list','/admin_attributeList')">属性管理</span>
                            <span @click="to('/admin_attributeAdd')" v-if="isAuth('property:create','/admin_attributeList')">新增属性</span>
                            <span @click="to('/admin_changeAudit','attribute')" v-if="isAuth('approve:propertyList','/admin_changeAudit')">属性修改审核</span>
                        </div>
                    </div>

              </div>
              <div>
                   <div class="login-list-box">
                        <div class="box-radio">
                            <img src="@/assets/admin/img/userManager/biaoqian.png"/>
                        </div>
                        <div class="box-title">标签与用户组</div>
                        <div class="box-words">
                            <!-- <span>标签管理</span> -->
                            <span @click="to('/admin_userGroupList')" v-if="isAuth('userGroup:list','/admin_userGroupList')">用户组管理</span>
                        </div>
                    </div>
                    <div class="login-list-box">
                        <div class="box-radio">
                            <img src="@/assets/admin/img/userManager/shezhi.png"/>
                        </div>
                        <div class="box-title">管理设置</div>
                        <div class="box-words">
                            <span @click="to('/admin_userSet','base')" v-if="isAuth('setting:basicDetail','/admin_userSet')">基础设置</span>
                            <span @click="to('/admin_userSet','auth')" v-if="isAuth('setting:roleList','/admin_userSet')">权限管理</span>
                        </div>
                    </div>
              </div>
          </div>
        </div><!---content end--->
        <footerPage class="top20"></footerPage>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import bus from '@/assets/public/js/bus';
import http from "@/assets/public/js/http";
import footerPage from "@/components/admin/common/footer";
import breadcrumb from "@/components/admin/model/breadcrumb";
import paging from "@/components/admin/model/paging";
import serviceLMenu from "@/components/admin/model/serviceLMenu_user";

export default {
  name: 'index',
  created(){
    // bus.$on('collapse', msg => {
    //   this.$root.collapse = msg;
    //   this.$forceUpdate();
    // })
  },
  components:{footerPage,serviceLMenu,breadcrumb,paging},
  data () {
    return {
        
    }
  },
  mounted(){
    //   this.initData();
  },
  methods:{
    // 页面子权限判定
    isAuth(name,path){
      let authList = this.$store.getters.authList;
      let curAuth = authList.find(item=>(item.router == path));
      // let curAuth = authList.find(item=>(item.router == this.$route.path));
      let curSonAuth = curAuth ? curAuth.permissionNodes.find(item=>(item.permission==name)) : null;
      return curSonAuth?true:false;
    },
    // 前往页面
    to(path,type){
      this.$router.push({ path: path, query: { type: type } })
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


 .login-list{
   width: 100%;
   background:#fff ;
   padding: 1.5% 0;
   margin: 9% auto 0;
   border-top:8px solid #fbfbfb;
 }

 
 .rzxx{
   color: #6777EF;
 }
.box-right>div{
  width: 100%;
  display: table;
}

.login-list{
    width:100%;
    display: table
}
.login-list>div{
    display: flex;
}
.login-list-box{
    width:23%;
    margin:2% 0 0 2%;
    float: left;
    padding: 2% 0;
    box-shadow: 0px 5px 10px rgba(0,0,0,0.06);
}
.box-radio{
    width: 100%;
    text-align: center;
}
.box-radio img{
    margin: auto;
    width: 128px;
    height: 128px;
}
.box-title{
    text-align: center;
    font-size: 16px;
    color: #34395E;
    margin:3% 0 7% 0;
    width: 100%;
}
.box-words{
    width: 85%;
    display: flex;
    justify-content:center;
    align-items:center;

    margin: auto;
}
.box-words span{
    // display: block;
    // float: left;
    margin:3% 0 3% 3%;
    text-align: center;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #6C757D;
    padding: 0 3%;
    border-radius: 4px;
    border:1px solid #E4E6FC;
    white-space: nowrap;
    cursor: pointer;
}
@media(max-width:1680px){
  .box-words span{
    padding: 0 2%;
  }
}
@media(max-width:1440px){
  .box-words{
    width: 92%;
  }
  .box-words span{
    font-size: 12px;
    padding: 0 2%;
    margin:3% 0 3% 2%;
  }
}

</style>
