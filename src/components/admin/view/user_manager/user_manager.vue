<!---新闻发布-栏目管理-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse?'fold-menu':''">
        <serviceLMenu :isActive="1"></serviceLMenu>
      </el-aside>
      <el-main class="admin-content pd admin-bg-top1" :class="{'content-collapse':$root.collapse}">
        <div class="content search-table-general">
          <div class="login-list">
            <div>
              <div class="login-list-box">
                <div class="box-radio">
                  <img src="@/assets/admin/img/userManager/duzhe.png" />
                </div>
                <div class="box-title">读者信息管理</div>
                <div class="box-words">
                  <a :href="$setHref({ url:'/admin_readerList' })" v-if="$_has('reader:list')">读者查询</a>
                  <span class="grey-btn" v-else>读者查询</span>
                  <a :href="$setHref({ url:'/admin_readerAdd' })" v-if="$_has('reader:create')">新增读者</a>
                  <span class="grey-btn" v-else>新增读者</span>
                  <a :href="$setHref({ url:'/admin_importUser' })" v-if="$_has('reader:import')">批量导入</a>
                  <span class="grey-btn" v-else>批量导入</span>
                </div>
                <div class="box-words">
                  <a :href="$setHref({ url:'/admin_readerCardList' })" v-if="$_has('card:list')">卡号管理</a>
                  <span class="grey-btn" v-else>卡号管理</span>
                  <a :href="$setHref({ url:'/admin_changeAudit?type=reader' })" v-if="$_has('approve:readerList')">修改审核</a>
                  <span class="grey-btn" v-else>修改审核</span>
                </div>
              </div>
              <div class="login-list-box">
                <div class="box-radio">
                  <img src="@/assets/admin/img/userManager/yonghuzu.png" />
                </div>
                <div class="box-title">读者分组管理</div>
                <div class="box-words">
                  <!-- <span>标签管理</span> -->
                  <a :href="$setHref({ url:'/admin_userGroupList' })" v-if="$_has('userGroup:list')">用户组管理</a>
                  <span class="grey-btn" v-else>用户组管理</span>
                  <a :href="$setHref({ url:'/admin_userTagList' })" v-if="$_has('userTag:list')">标签管理</a>
                  <span class="grey-btn" v-else>标签管理</span>
                </div>
                <div class="box-words">
                  <span class="grey-btn">用户组权限</span>
                  <span class="grey-btn">用户组追踪</span>
                </div>
              </div>
              <!-- <div class="login-list-box">
                <div class="box-radio">
                  <img src="@/assets/admin/img/userManager/duzhe.png" />
                </div>
                <div class="box-title">读者卡管理</div>
                <div class="box-words">
                  <span @click="to('/admin_readerCardList')" v-if="$_has('card:list','/admin_readerCardList')">读者卡列表</span>
                  <span class="grey-btn" v-else>读者卡列表</span>
                  <span @click="to('/admin_readerCardAdd')" v-if="$_has('card:create','/admin_readerCardList')">新增读者卡</span>
                  <span class="grey-btn" v-else>新增读者卡</span>
                  <span @click="to('/admin_changeAudit','card')" v-if="$_has('approve:cardClaimList','/admin_changeAudit')">领卡审核</span>
                  <span class="grey-btn" v-else>领卡审核</span>
                </div>
              </div> -->
              <div class="login-list-box">
                <div class="box-radio">
                  <img src="@/assets/admin/img/userManager/shuxing.png" />
                </div>
                <div class="box-title">读者数据标准</div>
                <div class="box-words">
                  <span class="grey-btn">数据源管理</span>
                  <a :href="$setHref({ url:'/admin_attributeList' })" v-if="$_has('property:list')">读者信息属性</a>
                  <span class="grey-btn" v-else>读者信息属性</span>
                </div>
                <div class="box-words">
                  <a :href="$setHref({ url:'/admin_attributeList?type=attribute_group' })" v-if="$_has('propertyGroup:list')">属性组管理</a>
                  <span class="grey-btn" v-else>属性组管理</span>
                  <a :href="$setHref({ url:'/admin_changeAudit?type=attribute' })" v-if="$_has('approve:propertyList')">属性组修改审核</a>
                  <span class="grey-btn" v-else>属性组修改审核</span>
                </div>
              </div>
              <div class="login-list-box">
                <div class="box-radio">
                  <img src="@/assets/admin/img/userManager/guanyuan.png" />
                </div>
                <div class="box-title">馆员管理</div>
                <div class="box-words">
                  <a :href="$setHref({ url:'/admin_librarianManagement?type=first' })" v-if="$_has('staff:list')">馆员查询</a>
                  <span class="grey-btn" v-else>馆员查询</span>
                  <a :href="$setHref({ url:'/admin_readerAdd?type=staff' })" v-if="$_has('reader:create')">新增馆员</a>
                  <span class="grey-btn" v-else>新增馆员</span>
                  <a :href="$setHref({ url:'/admin_librarianManagement?type=first&dia=dialog_add' })" v-if="$_has('staff:createTemp')">新增临时馆员</a>
                  <span class="grey-btn" v-else>新增临时馆员</span>
                  <!-- <span @click="to('/admin_librarianManagement','second')" v-if="$_has('','')">馆员日志</span> -->
                </div>
              </div>
            </div>
            <div>
              <div class="login-list-box">
                <div class="box-radio">
                  <img src="@/assets/admin/img/userManager/duzheyingyong.png" />
                </div>
                <div class="box-title">读者应用</div>
                <div class="box-words">
                  <a :href="$setHref({ type:'dlib',url:['noticecenter','/admin_messageCreate'] })">消息发送</a>
                  <!-- <span class="grey-btn" v-else>消息发送</span> -->
                  <a :href="$setHref({ type:'dlib',url:['scorecenter','/admin_integralWork'] })">积分管理</a>
                  <!-- <span class="grey-btn" v-else>积分管理</span> -->
                  <a :href="$setHref({ type:'dlib',url:['useridentify','/admin_loginConfig'] })">登录配置</a>
                  <!-- <span class="grey-btn" v-else>登录配置</span> -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <!---content end--->
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

export default {
  name: 'index',
  components: { footerPage, serviceLMenu, breadcrumb, paging },
  data() {
    return {

    }
  },
  mounted() {
    //   this.initData();
  },
  methods: {
    // 前往页面
    to(path, type, dia) {
      this.$router.push({ path: path, query: { type: type, dia: dia } })
    },
    // 跳转--其他应用
    linkTo(code, url) {
      if (url) {
        let urlInfo = JSON.parse(localStorage.getItem('urlInfo'));
        let info = urlInfo.find(item => item.code == code);
        if (code == 'index') {
          location.href = info.path + url + '?page=1';
        } else {
          location.href = info.path + url
        }
      }
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../../../assets/admin/css/color.less"; /**颜色配置 */
@import "../../../../assets/admin/css/form.less";
.content {
  .s-w {
    min-height: 60px;
    line-height: 57px;
    padding: 0 20px;
    border-bottom: 1px solid @ph-col-n3;
    background-color: @m-col-b0;
    .d-title {
      color: @ph-col-n12;
      font-size: 14px;
      margin-left: 20px;
    }
  }
}

.login-list {
  width: 100%;
  background: #fff;
  padding: 1.5% 0;
  margin: 9% auto 0;
  border-top: 8px solid #fbfbfb;
}

.rzxx {
  color: #6777ef;
}
.box-right > div {
  width: 100%;
  display: table;
}

.login-list {
  width: 100%;
  display: table;
}
.login-list > div {
  display: flex;
}
.login-list-box {
  width: 23%;
  margin: 2% 0 0 2%;
  float: left;
  padding: 2% 0;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.06);
}
.box-radio {
  width: 100%;
  text-align: center;
}
.box-radio img {
  margin: auto;
  width: 128px;
  height: 128px;
}
.box-title {
  text-align: center;
  font-size: 16px;
  color: #34395e;
  margin: 3% 0 7% 0;
  width: 100%;
}
.box-words {
  width: 85%;
  display: flex;
  justify-content: center;
  align-items: center;

  margin: auto;
}
.box-words span,
.box-words a {
  // display: block;
  // float: left;
  margin: 3% 0 3% 3%;
  text-align: center;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  color: #6c757d;
  padding: 0 3%;
  border-radius: 4px;
  border: 1px solid #e4e6fc;
  white-space: nowrap;
  cursor: pointer;
}
@media (max-width: 1680px) {
  .box-words span,
  .box-words a {
    padding: 0 2%;
  }
}
@media (max-width: 1440px) {
  .box-words {
    width: 92%;
  }
  .box-words span,
  .box-words a {
    font-size: 12px;
    padding: 0 2%;
    margin: 3% 0 3% 2%;
  }
}
.grey-btn {
  background: #f1f1f1;
  cursor: not-allowed !important;
}
</style>
