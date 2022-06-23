<!---新闻发布-栏目管理-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse?'fold-menu':''">
        <serviceLMenu :isActive="2"></serviceLMenu>
      </el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{'content-collapse':$root.collapse}">
        <breadcrumb :cuMenu="'读者账号详情'" :fontColor="'fff'"></breadcrumb>
        <!--面包屑导航--->
        <div class="content search-table-general">
          <div class="search-table-w">
            <h1 class="search-title">读者账号详情</h1>
            <!-- <span class="fsxx">发送消息</span>
            <span class="zwhy" @click="handleChange">转为馆员</span> -->
            <div class="right-btn-box">
              <el-button v-if="showToStaff&&isAuth('reader:batchSetAsStaff')" size="medium" type="primary" class="admin-red-btn" @click="handleChange">转为馆员</el-button>
              <el-button disabled type="primary" size="medium" class="blue-btn" @click="handAdd">发送消息</el-button>
            </div>
          </div>
          <!--顶部查询 end-->
          <div class="login-list">
            <div class="reader-top">
              <div class="reader-left" @click="upImg">
                <img :src="iconUrl" alt="" v-if="iconUrl!=''">
                <img :src="imgPath + postForm.photo" alt="" v-else-if="postForm.photo&&postForm.photo!=''">
                <img src="@/assets/admin/img/userManager/touxiang.jpg" v-else />
              </div>
              <div class="reader-middle">
                <div class="middle-top">
                  <div class="id">用户id：{{postForm.id}}</div>
                  <span class="names">{{postForm.name}}</span>
                  <!-- <span class="numers">{{postForm.nickName}}</span> -->
                  <!-- <span class="level">LV{{integralData.level}}</span> -->
                  <!-- <span class="async">同步</span> -->
                </div>
                <div class="times">
                  <span>读者来源：</span>
                  <span>{{getKeyValue('User_SourceFrom',postForm.sourceFrom)}}</span>
                </div>
                <div class="times lev">
                  <span>用户等级：</span>
                  <span class="level">LV{{integralData.level}}</span>
                </div>
                <div class="integral">
                  <span>当前积分：</span>
                  <span>{{integralData.userScore}}</span>
                </div>
                <div class="times">最近登录：{{dateChangeFormat('YYYY-mm-dd HH:MM:SS', postForm.lastLoginTime)}}</div>
              </div>
              <div class="reader-right">
                <span>首次使用：{{dateChangeFormat('YYYY-mm-dd HH:MM:SS', postForm.firstLoginTime)}}</span>
                <span>创建时间：{{dateChangeFormat('YYYY-mm-dd HH:MM:SS', postForm.createTime)}}</span>
              </div>
            </div>

            <div class="reader-box">
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="基本信息" name="first">
                  <ReaderAcount @hide-to-staff="hideToStaff" :id="id" :iconUrl="postForm.photo"></ReaderAcount>
                </el-tab-pane>
                <el-tab-pane label="证件信息" name="second">
                  <Certificate :id="id"></Certificate>
                </el-tab-pane>
                <el-tab-pane label="积分明细" name="third">
                  <Intergral :id="id" :userKey="postForm.userKey"></Intergral>
                </el-tab-pane>
                <el-tab-pane label="借阅明细" name="fourth">
                  <borrowingDetail :id="id"></borrowingDetail>
                </el-tab-pane>
                <el-tab-pane label="授权信息" name="five">
                  <AuthSystem :id="id"></AuthSystem>
                </el-tab-pane>
                <el-tab-pane label="使用日志" name="six">
                  <useLog :id="id"></useLog>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </div>
        <!---content end--->
        <el-dialog append-to-body title="图片上传" :visible.sync="dialogUPimg" width="550px" :close-on-click-modal="false" :before-close="handleClose">
          <UpdateImg @imgUrl="imgUrl"></UpdateImg>
        </el-dialog>
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
import UpdateImg from "@/components/admin/model/UpdateImg";
import serviceLMenu from "@/components/admin/model/serviceLMenu_user";
import AuthSystem from "./model/authorization_system"
import ReaderAcount from "./model/reader_acount"
import borrowingDetail from "./model/borrowing_detail"
import Intergral from "./model/Integral_details"
import Certificate from "./model/certificate_information"
import useLog from "./model/use_log"

let newId = null;
export default {
  name: 'index',
  created() {
    // bus.$on('collapse', msg => {
    //   this.$root.collapse = msg;
    //   this.$forceUpdate();
    // })
  },
  components: { footerPage, serviceLMenu, breadcrumb, paging, AuthSystem, ReaderAcount, Intergral, Certificate, borrowingDetail, useLog, UpdateImg },
  data() {
    return {
      id: this.$route.query.id,
      dataKey: null,
      postForm: null,
      dialogUPimg: false,
      iconUrl: '',
      form: {
        appid: "",
        secret: "",
        token: "",
        aeskey: "",
        address: "",
        status: 1
      },
      activeName: "first",
      showToStaff: true,
      integralData: {},

      imgPath: localStorage.getItem('fileUrl'),//图片域名前缀
    }
  },
  beforeRouteEnter(to, from, next) {
    // 从读者合并页返回，获取新的读者id
    if (from.query.newId) {
      newId = from.query.newId
    }
    next();
  },
  mounted() {
    if (newId) {
      this.id = newId;
      newId = null;
    }
    this.initData();
  },
  methods: {
    initData() {
      this.getKey();
      if (this.id) {
        this.getData();
      } else {
        this.postForm = {}
      }
    },
    // 页面子权限判定
    isAuth(name) {
      let authList = this.$store.getters.authList;
      let curAuth = authList.find(item => (item.router == '/admin_readerList'));
      // let curAuth = authList.find(item=>(item.router == this.$route.path));
      let curSonAuth = curAuth ? curAuth.permissionNodes.find(item => (item.permission == name)) : null;
      return curSonAuth ? true : false;
    },
    // 获取初始数据
    getKey() {
      http.getJson('user-init-data').then(res => {
        this.dataKey = res.data;
      }).catch(err => {
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    // 获取数据
    getData() {
      http.getJsonSelf('user', `/${this.id}`).then(res => {
        this.postForm = res.data;
        this.getIntegralData(res.data.userKey);
      }).catch(err => {
        this.$message({ type: 'error', message: '获取设置失败!' });
      })
    },
    // 获取积分数据
    getIntegralData(userKey) {
      http.getJsonSelf('reader-score-summary', `/${userKey}`).then(res => {
        this.integralData = res.data;
      }).catch(err => {
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    // 数据处理
    getKeyValue(code, val) {
      if (!this.dataKey) return;
      let value = '';
      // let curItem = this.dataKey.sourceFrom.find((item) => (item == val));
      let obj = this.dataKey.groupSelect.find(item => item.groupCode == code);
      value = obj.groupItems ? obj.groupItems.find(item => item.value == val).key : '';
      return value;
    },
    // 转为馆员
    handleChange() {
      http.postJson('batch-set-user-as-staff', [this.id]).then(res => {
        this.$message({ type: 'success', message: '转为馆员成功!' });
      }).catch(err => {
        this.$message({ type: 'error', message: this.handleError(err, '转为馆员失败') });
      })
    },
    // 时间格式化
    dateChangeFormat(format, date) {
      date = new Date(date);
      const dataItem = {
        'Y+': date.getFullYear().toString(),
        'm+': (date.getMonth() + 1).toString(),
        'd+': date.getDate().toString(),
        'H+': date.getHours().toString(),
        'M+': date.getMinutes().toString(),
        'S+': date.getSeconds().toString(),
      };
      Object.keys(dataItem).forEach((item) => {
        const ret = new RegExp(`(${item})`).exec(format);
        if (ret) {
          format = format.replace(ret[1], ret[1].length === 1 ? dataItem[item] : dataItem[item].padStart(ret[1].length, '0'));
        }
      });
      return format;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //打开图标上传弹窗
    upImg() {
      this.dialogUPimg = true;
    },
    // 返回图片相对路径
    imgUrl(imgList) {
      console.log(imgList)
      this.dialogUPimg = false;
      this.iconUrl = localStorage.getItem('fileUrl') + imgList[0];
      this.postForm.photo = imgList[0];
    },
    //图片上传-弹窗关闭
    handleClose(done) {
      done();
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      //     done();
      //   })
      //   .catch(_ => {});
    },
    hideToStaff() {
      this.showToStaff = false;
    }
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
    border-bottom: 1px solid @EBEEF5;
    background-color: @fff;
    .d-title {
      color: @34395E;
      font-size: 14px;
      margin-left: 20px;
    }
  }
}
.tops {
  margin-top: 2%;
}
.m-top {
  margin-top: 24px;
}
/deep/ .el-table th.el-table__cell {
  background-color: #f1f3f7;
  border-right: 1px solid #ebeef5;
  padding: 0.7% 0;
}
.login-list {
  width: 100%;
  background: #fff;
  padding: 1.5% 0;
  display: table;
  border-top: 1px solid #ebeef5;
}
.reader-top {
  width: 100%;
  display: table;
}
.reader-box {
  width: 95%;
  display: table;
  margin: 2% auto;
}
// /deep/ .el-input,
// /deep/ .el-select,
// .divStyle {
//   width: 35%;
//   float: left;
// }
.divStyle {
  height: 40px;
  line-height: 40px;
  border: 1px solid #c0c4cc;
}
.divStyle span {
  padding: 0 !important;
  float: right !important;
}
.divStyle span:first-child {
  float: left !important;
  color: #6c757d;
  margin-left: 5%;
}
// /deep/ .el-select .el-input {
//   width: 100%;
// }
.reader-left,
.reader-middle {
  float: left;
}
.reader-left > img {
  width: 100%;
  height: 100%;
  border-radius: 12px;
}
.reader-right {
  float: right;
  width: 50%;
}
.reader-right span {
  font-size: 14px;
  color: #909399;
  display: block;
  margin: 2.6% 4% 0 0;
  float: right;
  cursor: pointer;
}
/deep/ .el-tabs__item {
  height: 46px;
}
/deep/ .el-tabs__nav-wrap::after {
  background-color: #fff;
}
.reader-left {
  width: 9%;
  height: 9%;
  border-radius: 12px;
  margin: 0 2% 0 1.5%;
}
.reader-middle {
  width: 30%;
}
.middle-top,
.integral,
.times {
  width: 100%;
  display: table;
}
.middle-top {
  margin-top: 3%;
  .id{
    color: #34395e;
    margin-bottom: 3%;
    font-size: 14px;
  }
}
.times{
  .lev{
    display: block;
    float: left;
  }
}
.names,
.numers,
.level,
.async {
  float: left;
  display: block;
  margin-right: 2%;
}
.names {
  font-size: 18px !important;
  font-weight: bold;
  color: #34395e;
}
.numers {
  color: #34395e;
  font-size: 16px !important;
  font-weight: bold;
  margin-top: 5px;
}
.level {
  color: #5568f5;
  font-size: 15px;
  background: #f1eeff;
  border-radius: 6px;
  padding: 0 2%;
  line-height: 26px;
  height: 26px;
}
.async {
  color: #5568f5;
  border: 1px solid #5568f5;
  border-radius: 5px;
  padding: 0 2%;
  line-height: 26px;
  height: 26px;
}
.integral,
.times {
  margin-top: 3%;
  width: 100%;
  display: table;
}
.integral span {
  display: block;
  float: left;
  font-size: 14px;
  color: #f58b58;
}
.integral span:first-child {
  color: #34395e;
}
.times {
  color: #34395e;
  font-size: 14px;
}
.editdiv {
  width: 60%;
  float: left;
}
.editdiv ul {
  list-style-type: none;
  padding: 0;
}
.editdiv ul li {
  width: 100%;
  display: table;
  padding: 1% 0;
}
.editdiv ul li span {
  float: left;
  padding: 12px 2% 12px 0;
  width: 13%;
  text-align: right;
}
.editdiv ul li span i {
  color: red;
  margin: 10px 0 0 0px;
}
.reader-right {
  width: 42%;
  float: right;
}
.right-title {
  width: 100%;
  font-size: 15px;
  font-weight: bold;
  display: table;
}
.right-box {
  width: 100%;
  display: table;
  margin: 2% 0 6% 0;
}
.right-box span {
  display: block;
  float: left;
  border: 1px solid #e4e6fc;
  color: #6c757d;
  font-size: 14px;
  text-align: center;
  padding: 1% 2%;
  margin: 2% 2% 0 0;
  cursor: pointer;
}
.imgs {
  width: 13px;
  height: 11px;
  margin: -5px -9px 0 5px !important;
  float: right;
}
.el-select-dropdown__item {
  padding-left: 3% !important;
}
/deep/ .el-radio {
  margin: 2% 3% 0 0;
}
.yuan {
  width: 8px !important;
  height: 8px;
  background: #8cc63f;
  border-radius: 100%;
  margin: 16px 2% 0 0;
}
.renzheng {
  color: #6c757d;
  width: auto !important;
  margin-right: 3%;
}
.baocun {
  background: #6777ef;
  border: 0;
  padding: 1.3% 3%;
  color: #fff;
  text-align: center;
}
.xuanzhong {
  border: 1px solid #6777ef !important;
}
/deep/.el-dialog__body {
  padding: 10px 20px;
}
.duihao {
  width: 12px;
  height: 10px;
  line-height: 10px;
  text-align: center;
  background: #6777ef;
  color: #fff;
  font-size: 12px;
  border-radius: 3px;
  float: right;
  margin: -4px -11px 0 2px;
}
.btns {
  padding: 2.3% 4% 1.8% 4%;
  font-size: 15px;
}
.quxiao {
  color: #6d6d6d;
  background: #f3f3f3;
  border: 1px solid #f3f3f3;
}
.search-title {
  width: 50%;
  float: left;
  border: 0 !important;
}
.fsxx,
.zwhy {
  padding: 0.7% 1.2%;
  border-radius: 4px;
  float: right;
  margin: 0.7% 0.9% 0 0;
  text-align: center;
  color: #fff;
  font-size: 14px;
}
.zwhy {
  background: #f56c6c;
}

.fsxx {
  background: #6777ef;
  margin-right: 2%;
}
.search-table-general {
  background: #fff;
}
.right-btn-box {
  float: right;
  margin: 15px 15px 0 0;
}
</style>
