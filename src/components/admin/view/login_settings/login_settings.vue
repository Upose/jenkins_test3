<!---新闻发布-栏目管理-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse?'fold-menu':''">
        <serviceLMenu :isActive="9"></serviceLMenu>
      </el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{'content-collapse':$root.collapse}">
        <breadcrumb :cuMenu="'登录设置'" :fontColor="'fff'"></breadcrumb>
        <!--面包屑导航--->
        <div class="content search-table-general">
          <div class="search-table-w">
            <h1 class="search-title">登录设置</h1>
          </div>
          <!--顶部查询 end-->
          <div class="login-list">
            <el-table :data="tableData" border style="width: 100%" class="list-table">
              <el-table-column label="序号" width="55" align="center" type="index"></el-table-column>
              <el-table-column label="登录方式">
                <template slot-scope="scope">
                  <img :src="getImg(scope.row.icon)" class="pictures" />
                  <span class="img-word">{{scope.row.loginName}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="status" label="应用状态">
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.isOpen" :disabled="!scope.row.enable" @change="handleStatus(scope.row)"></el-switch>
                </template>
              </el-table-column>
              <el-table-column label="操作" fixed="right" align="center">
                <template slot-scope="scope">
                  <el-button type="text" icon="el-icon-edit" class="rzxx" @click="addInfo(scope.row)" v-if="scope.row.needConfig&&scope.row.isOpen&&scope.row.enable">添加认证信息</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!---content end--->
        <el-dialog append-to-body :title="titles" :visible.sync="editVisible" width="26%" :modal-append-to-body="false" :close-on-click-modal="false">
          <el-form ref="form" :model="form" label-width="70px">
            <div class="editdiv">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="appid" prop="appid">
                  <el-input v-model="ruleForm.appid"></el-input>
                </el-form-item>
                <el-form-item label="secret" prop="secret">
                  <el-input v-model="ruleForm.secret"></el-input>
                </el-form-item>
                <el-form-item label="token" prop="token">
                  <el-input v-model="ruleForm.token"></el-input>
                </el-form-item>
                <el-form-item label="aeskey" prop="aeskey">
                  <el-input v-model="ruleForm.aeskey"></el-input>
                </el-form-item>
                <el-form-item label="回调地址" prop="address">
                  <el-input v-model="ruleForm.address"></el-input>
                </el-form-item>
                <el-form-item label="是否启用">
                  <el-switch v-model="ruleForm.status" active-value="0" inactive-value="1" class="qiyong"></el-switch>
                </el-form-item>
                <el-form-item>
                  <span class="dialog-footer">
                    <el-button type="primary" @click="saveEdit" class="btns">
                      <img src="@/assets/admin/img/userManager/icon-bc2x.png" />
                      <span>保存</span>
                    </el-button>
                    <el-button @click="editVisible = false" class="btns quxiao">
                      <img src="@/assets/admin/img/userManager/quxiao.png" />
                      <span>取消</span>
                    </el-button>
                  </span>
                </el-form-item>
              </el-form>
            </div>
          </el-form>
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
      ruleForm: {
        appid: "",
        secret: "",
        token: "",
        aeskey: "",
        address: "",
        status: 1
      },
      rules: {
        appid: [
          { required: true, message: '请输入appid', trigger: 'blur' }
        ],
        secret: [
          { required: true, message: '请输入secret', trigger: 'blur' }
        ],
        token: [
          { required: true, message: '请输入token', trigger: 'blur' }
        ],
        aeskey: [
          { required: true, message: '请输入token', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入回调地址', trigger: 'blur' }
        ]
      },
      titles: "",
      editVisible: false,
      tableData: []
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.getData();
    },
    // 获取数据
    getData() {
      http.getJson('login-list-data').then(res => {
        this.tableData = res.data;
      }).catch(err => {
        this.$message({ type: 'error', message: '获取设置失败!' });
      })
    },
    // 初始化图标
    getImg(icon) {
      let data = {
        'icon-wx': require("@/assets/admin/img/userManager/weixin.png"),
        'icon-qq': require("@/assets/admin/img/userManager/qq.png"),
        'icon-mobile': require("@/assets/admin/img/userManager/duanxin.png"),
        'icon-card': require("@/assets/admin/img/userManager/sfz.png"),
        'icon-school': require("@/assets/admin/img/userManager/xuexiao.png"),
        'icon-pwd': require("@/assets/admin/img/userManager/mima.png"),
      }
      return data[icon];
    },
    addInfo(row) {
      this.editVisible = true;
      this.titles = row.loginName + "认证信息"
    },
    handleStatus(row) {
      let text = !row.isOpen ? "停用" : "启用";
      this.$confirm('是否确认"' + text + '"当前登录方式?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        http.postJson('set-is-open', {
          id: row.id,
          isOpen: row.isOpen,
        }).then(res => {
          this.$message({ type: 'success', message: text + '成功!' });
        }).catch(err => {
          this.$message({ type: 'error', message: text + '失败!' });
        })
      }).catch(() => {
        row.isOpen = !row.isOpen;
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
    border-bottom: 1px solid @EBEEF5;
    background-color: @fff;
    .d-title {
      color: @34395E;
      font-size: 14px;
      margin-left: 20px;
    }
  }
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
  padding: 2% 0;
  border-top: 8px solid #fbfbfb;
}

/deep/ .search-table-w .search-title {
  border: 0;
}
.list-table {
  width: 97% !important;
  margin: auto;
}
.pictures {
  width: 33px;
  float: left;
}
.img-word {
  float: left;
  color: #404040;
  font-size: 16px;
  margin: 6px 0 0 6px;
  display: block;
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
/deep/ .el-table .cell,
/deep/ .el-table th.el-table__cell > .cell {
  padding-left: 8%;
}
.editdiv {
  width: 100%;
  display: table;
}

.editdiv ul {
  list-style-type: none;
  padding: 0;
}
.editdiv ul li,
/deep/ .el-form-item {
  width: 100%;
  display: table;
  padding: 1.7% 0 1.2% 0;
}
.editdiv ul li span {
  float: left;
  padding: 12px 4% 12px 0;
  width: 100px;
  text-align: right;
}
.editdiv ul li span i {
  color: red;
  margin: 10px 0 0 0px;
}
/deep/ .el-button--text {
  border-radius: 2px;
}
/deep/.el-dialog__body {
  padding: 10px 20px;
}
/deep/.el-switch {
  margin-top: 7px;
}
/deep/.el-dialog {
  min-width: 500px;
}
.handle-input {
  width: 68%;
  display: inline-block;
}
.btns {
  padding: 2.6% 3.7% 2.1% 3.7%;
  font-size: 15px;
  float: right;
  margin-left: 2%;
}
.btns img {
  width: 14px;
  height: 13.2px;
  float: left;
  margin-right: 6px;
}
.btns span {
  display: block;
  font-size: 14px;
  float: left;
}
.quxiao {
  color: #6d6d6d;
  background: #f3f3f3;
  border: 1px solid #f3f3f3;
}
/deep/ .el-input {
  width: 92%;
}
.qiyong {
  margin-top: -0.2%;
}
</style>
