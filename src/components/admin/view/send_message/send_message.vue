<!---新闻发布-栏目管理-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse?'fold-menu':''">
        <serviceLMenu :isActive="6"></serviceLMenu>
      </el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{'content-collapse':$root.collapse}">
        <breadcrumb :cuMenu="'读者账号详情'" :fontColor="'fff'"></breadcrumb>
        <!--面包屑导航--->
        <div class="content search-table-general">
          <div class="search-table-w">
            <h1 class="search-title">读者账号详情</h1>
          </div>
          <!--顶部查询 end-->
          <div class="login-list">
            <div class="editdiv">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="171px" class="demo-ruleForm">
                <el-form-item label="选择推送渠道：" prop="pushChannel">
                  <div class="xuanze qudao">
                    <span v-for="(item,index) in list" :key="index" :class="clickIndex==index?'xuanzhong':''" @click="changes(index)">{{item}}</span>
                  </div>
                </el-form-item>
                <el-form-item label="通知标题：" prop="noticeTitle" v-if="isEmai">
                  <el-input v-model="ruleForm.noticeTitle"></el-input>
                </el-form-item>
                <el-form-item label="选择消息模板：" prop="messageTemplate" v-if="isEmai==false">
                  <el-select v-model="message" placeholder="请选择" class="timeList">
                    <el-option v-for="item in messageOption" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="消息预览：">
                  <!-- <vue-ueditor-wrap v-model="ruleForm.messagePreview" :config="myConfig" class="ueditors"></vue-ueditor-wrap> -->
                  <div class="ueditors-box">
                    <span>变量：</span>
                    <span>用户名</span>
                    <span>读者学号</span>
                  </div>
                </el-form-item>
                <el-form-item label="发送时间：">
                  <el-radio-group v-model="ruleForm.sendingTime" @change="changeRaido" class="radios">
                    <el-radio label="立即发送"></el-radio>
                    <el-radio label="定时发送"></el-radio>
                  </el-radio-group>
                  <div class="time-right" v-if="isShowTime">
                    <el-select v-model="times" placeholder="请选择" class="timeList">
                      <el-option v-for="item in timeOption" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                    <el-date-picker v-model="date" type="date" placeholder="选择日期" class="datelist">
                    </el-date-picker>
                  </div>
                </el-form-item>
                <el-form-item label="接收用户：" v-if="receivingUser">
                  <el-radio-group v-model="ruleForm.sendTime">
                    <el-radio label="1">全部用户</el-radio>
                    <el-radio label="2">用户标签</el-radio>
                    <el-radio label="3">用户分群</el-radio>
                    <el-radio label="4">指定用户</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="接收用户：" v-if="isEmai==false">
                  <div class="xuanze">
                    <span v-for="(item,index) in userlist" :key="index" :class="userIndex==index?'xuanzhong':''" @click="changesUser(index)">{{item}}</span>
                  </div>
                  <div class="right-box">
                    <span v-for="(item,index) in labellist" :key="index" @click="changeStatus($event,index,item)" :class="item.ischecked?'xuanzhongLabel':''">
                      {{item.name}}
                      <i class="el-icon-check duihao" v-if="item.ischecked"></i>
                    </span>
                    <span class="jiazai"><i class="el-icon-refresh"></i>加载更多</span>
                  </div>
                  <div>
                    <el-table :data="tableData" border style="width: 100%" class="list-table">
                      <el-table-column type="selection" width="55" align="center"></el-table-column>
                      <el-table-column label="姓名" prop="name"></el-table-column>
                      <el-table-column label="用户来源" prop="derp"></el-table-column>
                      <el-table-column label="手机" prop="phone"></el-table-column>
                      <el-table-column label="用户类型" prop="number"></el-table-column>
                      <el-table-column label="注册日期" prop="date"></el-table-column>
                    </el-table>
                  </div>
                  <div class="fenye">
                    <div></div>
                    <div class="pagination">
                      <el-pagination background :current-page="pageNum" :page-size="pageSize" :total="pageTotal" :page-sizes="[10, 50, 100]" @size-change="handleSizeChange" layout="total,sizes,prev, pager, next" @current-change="handlePageChange"></el-pagination>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item label="">
                  <el-button class="btns quxiao">
                    <img src="@/assets/admin/img/userManager/quxiao.png" />
                    <span>取消</span>
                  </el-button>
                  <el-button type="primary" class="btns">
                    <img src="@/assets/admin/img/userManager/icon-bc2x.png" />
                    <span>保存</span>
                  </el-button>
                </el-form-item>
              </el-form>
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
// import UE from '@/components/admin/common/ue';
import VueUeditorWrap from 'vue-ueditor-wrap'

export default {
  name: 'index',
  created() {
    // bus.$on('collapse', msg => {
    //   this.$root.collapse = msg;
    //   this.$forceUpdate();
    // })
  },
  components: { footerPage, serviceLMenu, breadcrumb, paging },
  // components:{footerPage,serviceLMenu,breadcrumb,paging,VueUeditorWrap},
  data() {
    return {
      radio: "1",
      isShowTime: false,
      isEmai: false,
      date: "",
      times: 1,
      userIndex: 0,
      timeOption: [{
        value: 1,
        label: "今天"
      }],
      ruleForm: {
        pushChannel: '',
        noticeTitle: '',
        messageTemplate: '',
        messagePreview: '',
        sendingTime: "",
        receivingUser: ""
      },
      rules: {
        pushChannel: [
          { required: true, message: '请选择推送渠道', trigger: 'change' }
        ],
        noticeTitle: [
          { required: true, message: '通知标题不能为空', trigger: 'blur' }
        ],
        messageTemplate: [
          { required: true, message: '请选择消息模板', trigger: 'blur' }
        ]
      },
      message: "",
      messageOption: [{
        value: "1",
        label: "模板一"
      }],
      pageNum: 1,
      pageSize: 10,
      pageTotal: 0,
      zhuce: "1",
      tableData: [{
        name: "李四",
        derp: "技术",
        zhicheng: "部门职称",
        phone: "15896989699",
        number: "3634634",
        jobNumber: "je2352",
        status: "开通",
        date: "2021-09-21",
        role: "超级管理员"
      }, {
        name: "张三",
        derp: "技术",
        zhicheng: "部门职称",
        phone: "15896989699",
        number: "3634634",
        jobNumber: "je2352",
        status: "开通",
        date: "2021-09-21",
        role: "普通管理员"
      }, {
        name: "张三",
        derp: "技术",
        zhicheng: "部门职称",
        phone: "15896989699",
        number: "3634634",
        jobNumber: "je2352",
        status: "开通",
        date: "2021-09-21",
        role: "普通管理员"
      }, {
        name: "张三",
        derp: "技术",
        zhicheng: "部门职称",
        phone: "15896989699",
        number: "3634634",
        jobNumber: "je2352",
        status: "开通",
        date: "2021-09-21",
        role: "普通管理员"
      }, {
        name: "张三",
        derp: "技术",
        zhicheng: "部门职称",
        phone: "15896989699",
        number: "3634634",
        jobNumber: "je2352",
        status: "开通",
        date: "2021-09-21",
        role: "普通管理员"
      }, {
        name: "张三",
        derp: "技术",
        zhicheng: "部门职称",
        phone: "15896989699",
        number: "3634634",
        jobNumber: "je2352",
        status: "开通",
        date: "2021-09-21",
        role: "普通管理员"
      }, {
        name: "张三",
        derp: "技术",
        zhicheng: "部门职称",
        phone: "15896989699",
        number: "3634634",
        jobNumber: "je2352",
        status: "开通",
        date: "2021-09-21",
        role: "普通管理员"
      }, {
        name: "张三",
        derp: "技术",
        zhicheng: "部门职称",
        phone: "15896989699",
        number: "3634634",
        jobNumber: "je2352",
        status: "开通",
        date: "2021-09-21",
        role: "普通管理员"
      }, {
        name: "张三",
        derp: "技术",
        zhicheng: "部门职称",
        phone: "15896989699",
        number: "3634634",
        jobNumber: "je2352",
        status: "开通",
        date: "2021-09-21",
        role: "普通管理员"
      }, {
        name: "张三",
        derp: "技术",
        zhicheng: "部门职称",
        phone: "15896989699",
        number: "3634634",
        jobNumber: "je2352",
        status: "开通",
        date: "2021-09-21",
        role: "普通管理员"
      }],
      labellist: [{
        name: "男",
        ischecked: false
      }, {
        name: "90后",
        ischecked: false
      }, {
        name: "天蝎座",
        ischecked: false
      }, {
        name: "青少年",
        ischecked: false
      }, {
        name: "本科生",
        ischecked: false
      }, {
        name: "重庆人",
        ischecked: false
      }, {
        name: "移动",
        ischecked: false
      }, {
        name: "活跃用户",
        ischecked: false
      }, {
        name: "文学爱好者",
        ischecked: false
      }, {
        name: "图书",
        ischecked: false
      }, {
        name: "搜索达人",
        ischecked: false
      }
      ],
      clickIndex: 0,
      sendTime: "1",
      title: "",
      userlist: ["选择标签", "选择用户组", "用户类型", "指定用户"],
      defaultMsg: '这里是UE测试',
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 350
      },
      list: ["站内信", "短信", "邮件", "APP", "微信公众号", "微信小程序"],
      msg: '',
      myConfig: {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 240,
        // 初始容器宽度
        initialFrameWidth: '100%',
        // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        serverUrl: '//ueditor.szcloudplus.com/cos',
        // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
        UEDITOR_HOME_URL: '/static/UEditor/'
      }

    }
  },
  mounted() {
    //   this.initData();
  },
  methods: {
    changeRaido(e) {
      console.log(e)
      if (e == 2 || e == "定时发送") {
        this.isShowTime = true
      } else {
        this.isShowTime = false
      }
    },
    changesUser(index) {
      this.userIndex = index
    },
    changes(index) {
      this.clickIndex = index;
      if (index == 0) {
        this.isEmai = false
      } else {
        this.isEmai = true;
      }
    },
    changeStatus(e, number, row) {
      if (e.target.className.indexOf("xuanzhongLabel") == -1) {
        row.ischecked = true
      } else {
        row.ischecked = false
      }
    },
    handleClick(tab, event) {
      console.log(tab, event);
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
    border-bottom: 1px solid @EBEEF5;
    background-color: @fff;
    .d-title {
      color: @34395E;
      font-size: 14px;
      margin-left: 20px;
    }
  }
}
.login-list {
  width: 100%;
  background: #fff;
  padding: 2% 0;
  border-top: 8px solid #fbfbfb;
}
.editdiv {
  width: 60%;
}
.jiazai i {
  color: #6c757d !important;
  margin: 0 5px 0 0 !important;
}
.editdiv ul {
  list-style-type: none;
  padding: 0;
}
.editdiv ul li,
/deep/ .el-form-item {
  width: 100%;
  display: table;
  padding: 1% 0 0.5% 0;
}
.editdiv ul li > span:first-child {
  float: left;
  padding: 12px 4% 12px 0;
  width: 171px;
  text-align: right;
}
.editdiv ul li span i {
  color: red;
  margin: 10px 0 0 0px;
}
/deep/ .el-radio {
  margin: 1.2% 10% 0 0;
  float: left;
}
.xuanze {
  width: 100%;
  float: left;
  display: table;
}
.datelist,
.timeList {
  width: 41%;
  margin-right: 3%;
}
/deep/ .el-select > .el-input {
  width: 100%;
}
.ueditors,
.ueditors-box {
  width: 100%;
  display: table;
}
.ueditors-box span {
  display: block;
  float: left;
  color: #6777ef;
  margin-right: 1.5%;
}
.ueditors-box {
  margin-top: 1.5%;
}
.ueditors-box span:first-child {
  color: #3c4b5d;
}
.ueditors-div {
  width: 50%;
  float: left;
}
.qudao {
  width: 100%;
}
.xuanze span {
  display: block;
  float: left;
  padding: 0 2% !important;
  height: 40px;
  line-height: 40px;
  text-align: center !important;
  border: 1px solid #e4e6fc;
  cursor: pointer;
  color: #6c757d;
}
.xuanzhongLabel {
  border: 1px solid #6777ef !important;
}
.time-right {
  width: 35%;
  float: left;
}

/deep/ .el-input {
  width: 50%;
}
.xuanzhong {
  border: 1px solid #6777ef !important;
  color: #6777ef !important;
}
.jieshou {
  margin-top: -1%;
}
.duihao {
  width: 12px;
  height: 10px;
  line-height: 10px;
  text-align: center;
  background: #6777ef;
  color: #fff !important;
  font-size: 12px;
  border-radius: 3px;
  float: right;
  margin: -1px -13px 0 2px !important;
}
.right-box {
  width: 100%;
  display: table;
  margin: 44px 0 3% 0;
}
.right-box span {
  display: block;
  float: left;
  border: 1px solid #e4e6fc;
  color: #6c757d;
  font-size: 14px;
  text-align: center;
  padding: 0 13px;
  height: 35px;
  line-height: 35px;
  margin: 1.5% 2% 0 0;
  cursor: pointer;
  border-radius: 4px;
}
.jieshou-div {
  width: 50%;
  float: left;
}
.fenye {
  width: 100%;
  margin-top: 3%;
  display: table;
}
.pagination {
  float: right;
}
/deep/ .el-table--border .el-table__cell {
  border-right: 1px solid #ebeef5;
}
/deep/ .el-table .el-table__cell {
  padding: 1.2% 0;
}
/deep/ .el-table th.el-table__cell {
  background-color: #f1f3f7;
  border-right: 1px solid #ebeef5;
  padding: 0.3% 0;
}
/deep/ .el-table .el-table__cell {
  padding: 1.2% 0;
}
.rzxx {
  color: #6777ef;
}
/deep/ .el-table--border .el-table__cell {
  border-right: 1px solid #ebeef5;
}
/deep/ .el-table__body-wrapper .el-table__row:nth-of-type(even) {
  background: #f8faff;
}
.tables {
  width: 100%;
  display: table;
}
.btns {
  padding: 1.7% 2.5% 1.2% 2.5%;
  font-size: 15px;
}
.caozuo {
  width: 50%;
  margin-top: 1%;
  display: table;
  float: left;
}
.pagination > div {
  text-align: right;
}
/deep/ .el-pagination__sizes {
  width: 26%;
}
.quxiao {
  color: #6d6d6d;
  background: #f3f3f3;
  border: 1px solid #f3f3f3;
  float: left;
}
.radios {
  width: 30%;
  margin-top: 1.2%;
  float: left;
}
.btns img {
  width: 14px;
  height: 12.6px;
  float: left;
  margin-right: 6px;
}
.btns span {
  display: block;
  font-size: 14px;
  float: left;
}
</style>
