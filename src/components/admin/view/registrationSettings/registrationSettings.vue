<!---新闻发布-栏目管理-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse?'fold-menu':''">
        <serviceLMenu :isActive="2"></serviceLMenu>
      </el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{'content-collapse':$root.collapse}">
        <breadcrumb :cuMenu="'注册设置'" :fontColor="'fff'"></breadcrumb>
        <!--面包屑导航--->
        <div class="content search-table-general">
          <div class="search-table-w">
            <h1 class="search-title">注册设置</h1>
          </div>
          <!--顶部查询 end-->
          <div class="login-list">
            <div class="editdiv">
              <el-form ref="form" :model="form" label-width="160px">
                <el-form-item label="是否启用：">
                  <el-switch v-model="form.status" class="qiyong"></el-switch>
                </el-form-item>
                <el-form-item label="注册方式：">
                  <el-radio-group v-model="form.radio" class="zhucefs">
                    <el-radio label="1">手机+验证码</el-radio>
                    <el-radio label="2">邮箱+验证码</el-radio>
                    <el-radio label="3">表单注册</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="">
                  <div class="box-right">
                    <el-checkbox-group v-model="form.checkList">
                      <el-checkbox label="读者姓名 (必填)" disabled></el-checkbox>
                      <el-checkbox label="昵称"></el-checkbox>
                      <el-checkbox label="单位"></el-checkbox>
                      <el-checkbox label="学历"></el-checkbox>
                      <el-checkbox label="职称"></el-checkbox>
                      <el-checkbox label="部门"></el-checkbox>
                      <el-checkbox label="院系"></el-checkbox>
                      <el-checkbox label="专业"></el-checkbox>
                      <el-checkbox label="年级"></el-checkbox>
                      <el-checkbox label="班级"></el-checkbox>
                      <el-checkbox label="读者类型 (必填)" disabled></el-checkbox>
                      <el-checkbox label="读者状态 (必填)" disabled></el-checkbox>
                      <el-checkbox label="身份证"></el-checkbox>
                      <el-checkbox label="联系电话 (必填、唯一)" disabled></el-checkbox>
                      <el-checkbox label="email"></el-checkbox>
                      <el-checkbox label="出生年月"></el-checkbox>
                      <el-checkbox label="性别"></el-checkbox>
                      <el-checkbox label="所在地"></el-checkbox>
                      <el-checkbox label="详细地址"></el-checkbox>
                      <el-checkbox label="头像"></el-checkbox>
                      <el-checkbox label="离校时间"></el-checkbox>
                    </el-checkbox-group>
                  </div>
                </el-form-item>
                <el-form-item label="注册流程：">
                  <div class="box-right process">
                    <div>
                      <el-radio v-model="form.zhuce" label="1" class="box-radio">自主注册 </el-radio>
                      <span class="words">账号注册(<i>待激活</i>)</span>
                      <img src="@/assets/admin/img/userManager/jiantou.png" class="jiantou" />
                      <span class="words words-normal words-right">完成账号认证(<i>正常</i>)</span>
                      <img src="@/assets/admin/img/userManager/jiantou.png" class="jiantou" />
                      <span class="words words-right">登录</span>
                    </div>
                    <div>
                      <el-radio v-model="zhuce" label="1" class="box-radio">馆员审核 </el-radio>
                      <span class="words">账号注册(<i>待激活</i>)</span>
                      <img src="@/assets/admin/img/userManager/jiantou.png" class="jiantou" />
                      <span class="words words-normal words-right">馆员审核(<i>正常</i>)</span>
                      <button class="zhiding" @click="addInfo">指定审核人</button>
                      <img src="@/assets/admin/img/userManager/jiantou.png" class="jiantou" />
                      <span class="words words-right">登录</span>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item label="用户协议：" class="xieyi">
                  <el-input class="handle-input mr10 internets" v-model="form.internet" placeholder="请输入协议连接地址"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button @click="editVisible = false" class="btns btns1 quxiao">
                    <img src="@/assets/admin/img/userManager/quxiao.png" />
                    <span>取消</span>
                  </el-button>
                  <el-button type="primary" class="btns btns1" v-button-debounce>
                    <img src="@/assets/admin/img/userManager/icon-bc2x.png" />
                    <span>保存</span>
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
        <!---content end--->
        <el-dialog append-to-body :title="titles" :visible.sync="editVisible" width="26%" :modal-append-to-body="false" :close-on-click-modal="false">
          <el-form ref="form" :model="form" label-width="70px">
            <div class="tables">
              <div class="search-div">
                <el-input type="text" class="handle-input mr10 search-name" v-model="names" placeholder="姓名"></el-input>
                <el-button type="primary" class="finds" v-button-debounce>查找</el-button>
              </div>
              <el-table :data="tableData" border style="width: 100%" class="list-table">
                <el-table-column label="序号" width="55" align="center">
                  <template slot-scope="scope">
                    {{scope.$index+1}}
                  </template>
                </el-table-column>
                <el-table-column label="姓名" prop="name"></el-table-column>
                <el-table-column label="部门" prop="derp"></el-table-column>
                <el-table-column label="职称" prop="zhicheng"></el-table-column>
                <el-table-column label="手机号码" prop="phone"></el-table-column>
                <el-table-column label="主卡号" prop="number"></el-table-column>
                <el-table-column label="工号" prop="jobNumber"></el-table-column>
                <el-table-column label="卡状态" prop="status"></el-table-column>
                <el-table-column label="截止日期" prop="date"></el-table-column>
                <el-table-column label="角色" prop="role"></el-table-column>
                <el-table-column type="selection" width="55" align="center" label="操作" fixed="right"></el-table-column>
              </el-table>
            </div>
            <div class="pagination">
              <el-pagination background :current-page="pageNum" :page-size="pageSize" :total="pageTotal" :page-sizes="[10, 50, 100]" @size-change="handleSizeChange" layout="total,sizes,prev, pager, next" @current-change="handlePageChange"></el-pagination>
            </div>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="saveEdit" class="btns" v-button-debounce>
              <img src="@/assets/admin/img/userManager/icon-bc2x.png" />
              <span>保存</span>
            </el-button>
            <el-button @click="editVisible = false" class="btns quxiao">
              <img src="@/assets/admin/img/userManager/quxiao.png" />
              <span>取消</span>
            </el-button>
          </span>
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
import serviceLMenu from "@/components/admin/model/serviceLMenu_user";

export default {
  name: 'index',
  created() {
    // bus.$on('collapse', msg => {
    //   this.$root.collapse = msg;
    //   this.$forceUpdate();
    // })
  },
  components: { footerPage, serviceLMenu, breadcrumb, paging },
  data() {
    return {
      form: {
        status: "",
        radio: "3",
        checkList: "",
        zhuce: "",
        internet: ""
      },
      names: "",
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
      checkList: ["读者姓名 (必填)", "读者类型 (必填)", "读者状态 (必填)", "联系电话 (必填、唯一)"],
      radio: "3",
      titles: "指定馆员",
      editVisible: false
    }
  },
  mounted() {
    //   this.initData();
  },
  methods: {
    addInfo(row) {
      this.editVisible = true;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData()
    },
    // 分页导航
    handlePageChange(val) {
      this.pageNum = val
      this.getData();
    },
    handleStatus(row) {
      var _this = this;
      let text = row.status == 0 ? "停用" : "启用";
      this.$confirm('确认要"' + text + '"该条信息吗?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        var status = row.status == 0 ? 2 : 0

      })
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
    border-bottom: 1px solid @ph-col-n3;
    background-color: @m-col-b0;
    .d-title {
      color: @ph-col-n12;
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
  border-top: 8px solid #fbfbfb;
}

/deep/ .search-table-w .search-title {
  border: 0;
}

.btns1 {
  float: left !important;
  padding: 0.8% 1.2% !important;
  margin: 2% 1% 0 0 !important;
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
.btns1 span {
  display: block;
  font-size: 14px;
  padding: 0 !important;
  float: left;
  min-width: 30px !important;
}
.rzxx {
  color: #6777ef;
}
.box-right > div {
  width: 100%;
  display: table;
}
/deep/ .el-checkbox__input.is-disabled + span.el-checkbox__label {
  color: #6777ef !important;
}
/deep/ .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
  background-color: #6777ef;
  border-color: #6777ef;
}
.editdiv {
  width: 100%;
}
.editdiv ul {
  list-style-type: none;
  padding: 0;
}
.editdiv ul li,
/deep/ .el-form-item {
  width: 100%;
  display: table;
  // padding:1% 0 0.5% 0;
}
.editdiv ul li span {
  float: left;
  padding: 6px 1.5% 12px 0;
  width: 11%;
  min-width: 150px;
  text-align: right;
  display: block;
}
.editdiv ul li span i {
  color: red;
  margin: 10px 0 0 0px;
}
/deep/ .el-radio {
  margin: 10px 2% 0 0 !important;
}
/deep/ .el-checkbox {
  margin: -1.5% 0 0 0 !important;
  width: 20%;
}
/deep/ .el-button--text {
  border-radius: 2px;
}
/deep/.el-dialog__body {
  padding: 10px 20px;
  display: table;
}
/deep/.el-switch {
  margin-top: 7px;
}
/deep/.el-dialog {
  min-width: 500px;
}
.handle-input {
  width: 73%;
  display: inline-block;
}
.btns {
  padding: 1.3% 2% 0.8% 2%;
  font-size: 15px;
  margin-right: 2%;
  float: right;
}
.quxiao {
  color: #6d6d6d;
  background: #f3f3f3;
  border: 1px solid #f3f3f3;
}
.box-right {
  width: 60%;
  float: left;
}
.box-radio,
.words,
.jiantou {
  float: left;
}
.box-radio {
  margin-right: 3.6% !important;
}
.words,
.jiantou {
  margin-right: 1.1%;
}
.words {
  font-size: 15px;
  color: #3c4b5d;
}
.words i {
  color: orange;
  font-style: normal;
}
.jiantou {
  width: 21px;
  height: 6px;
  margin-top: 15px;
}
.words-right {
  text-align: left !important;
}
.words-normal i {
  color: #67c23a !important;
}
.zhiding {
  float: left;
  background: #f9f8ff;
  border: 1px solid #9cadff;
  color: #9cadff;
  border-radius: 3px;
  width: 90px;
  height: 28px;
  font-size: 14px;
  margin: 0.5% 1.5% 0 0;
  line-height: 28px;
}
.admin-warp-content {
  min-width: 1200px;
  overflow-x: auto;
}
.process {
  width: 70%;
  margin-top: 0.3%;
}
.process div span {
  width: auto !important;
  min-width: 90px !important;
}
.internets {
  width: 36%;
}
.pagination {
  float: right;
  margin-top: 1%;
}
/deep/ .el-table .el-table__cell {
  padding: 0.7% 0;
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
/deep/.el-dialog {
  min-width: 880px;
}
.finds {
  padding: 1.5% 2%;
  color: #fff;
  text-align: center;
  background: #6777ef;
  float: left;
}
.search-name {
  float: left;
  width: 25%;
  margin-right: 2%;
}
.search-div {
  width: 100%;
  display: table;
  margin-bottom: 2%;
}
/deep/ .el-dialog__footer {
  padding: 1% 1% 2% 1%;
  display: table;
  width: 100%;
}
.zhucefs {
  width: 100%;
  margin: 0.3% 0 1% 0;
}
.xieyi {
  margin-top: 1%;
}
.qiyong {
  margin-top: -0.2%;
}
</style>
