<template>
  <div>
    <div class="librarianList">
      <div class="librarianList-left">
        <div class="left-title">
          <span class="zhuzhi">组织架构</span>
          <router-link class="xinzeng" :to="{path:'/admin_attributeDepManager'}">新增</router-link>
        </div>
        <div class="left-box">
          <el-tree :data="departList" :props="defaultProps" @node-click="handleNodeClick" class="trees" :default-expand-all="true" :highlight-current="true"></el-tree>
        </div>
      </div>
      <div class="librarianList-right">
        <div class="right-title">
          <div class="title-word">
            <img src="@/assets/admin/img/userManager/icon-table2x.png" />
            <span>馆员列表</span>
          </div>
          <span class="tianjia" @click="$refs.dialog_add.show()" v-if="isAuth('staff:createTemp')">添加临时馆员</span>
          <span class="xzgy" @click="handleAdd" v-if="isAuth('staff:create')">新增馆员</span>
          <span class="bdzz" @click="handleChange" v-if="isAuth('staff:setDepart')">变动组织</span>
        </div>
        <div class="right-box">
          <div class="box-title">
            <div class="search-term">
              <div class="search-item-box">
                <el-input placeholder="请输入" v-model="searchTextValue" style="width:300px" clearable>
                  <el-select v-model="searchTextCode" slot="prepend" placeholder="请选择" style="width:130px">
                    <el-option v-for="item in textProperties" :key="item.code" :label="item.name" :value="item.code"></el-option>
                  </el-select>
                </el-input>
              </div>
              <el-button type="primary" class="searchs" @click="handSearch" icon="iconfont el-icon-vip-fangdajing">查找</el-button>
            </div>
            <!-- <el-input class="handle-input duzhe" v-model="name" placeholder="馆员姓名" clearable></el-input> -->

          </div>
          <div>
            <el-table v-loading="loading" :data="isAuth('staff:list')?tableData:[]" border style="width: 100%" class="list-table" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="45" align="center"></el-table-column>
              <el-table-column label="姓名" prop="name" align="center" show-overflow-tooltip></el-table-column>
              <el-table-column label="工号" prop="studentNo" align="center" show-overflow-tooltip></el-table-column>
              <el-table-column label="部门" prop="departName" align="left" show-overflow-tooltip></el-table-column>
              <el-table-column label="职称" prop="title" align="center" show-overflow-tooltip></el-table-column>
              <el-table-column label="手机号码" prop="phone" align="center" show-overflow-tooltip></el-table-column>
              <el-table-column label="主卡号" prop="cardNo" align="center" show-overflow-tooltip></el-table-column>

              <el-table-column label="卡状态" prop="cardStatus" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{getKeyValue('Card_Status',scope.row.cardStatus) }}
                </template>
              </el-table-column>
              <el-table-column label="截止日期" prop="cardExpireDate" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{setTime(scope.row.cardExpireDate,'日')}}
                </template>
              </el-table-column>
              <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                  <el-button @click="handleDel(scope.row)" type="text" size="mini" icon="iconfont el-icon-vip-shanchu-1" class="operate-red-btn" round v-if="isAuth('staff:delete')">删除</el-button>
                  <el-button @click="handleSet(scope.row)" type="text" size="mini" icon="iconfont el-icon-vip-yulan" round v-if="isAuth('staff:detail')">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
            <paging :pagedata="pageData" @pagechange="pageChange" v-if="pageData.totalCount"></paging>

          </div>
          <!-- <div class="pagination"> -->
          <!-- <el-pagination background :current-page="pageNum" :page-size="pageSize" :total="pageTotal" :page-sizes="[10, 50, 100]" @size-change="handleSizeChange" layout="total,sizes,prev, pager, next" @current-change="handlePageChange"></el-pagination> -->
          <!-- </div> -->
        </div>
      </div>
    </div>
    <dialog_change ref="dialog_change" :departList="departList" :userList="multipleSelection" @getList="getList"></dialog_change>
    <dialog_add ref="dialog_add" :dataKey="dataKey" :departList="departList"></dialog_add>
  </div>
</template>
<script>
import http from "@/assets/public/js/http";
import paging from "@/components/admin/model/paging";
import updateIcon from '../model/updateIcon';

import dialog_change from './model/dialog_change'
import dialog_add from './model/dialog_add'
export default {
  components: { paging, updateIcon, dialog_change, dialog_add },
  data() {
    return {
      loading: false,
      dataKey: null,
      pageData: {
        pageIndex: 1,
        pageSize: 20,
      },//分页参数
      tableData: [],//列表项
      multipleSelection: [],//勾选列表
      postForm: {},
      departList: [],
      defaultProps: {
        children: 'children',
        label: 'name',
      },
      nodeDepart: '',
      name: '',
      textProperties: [
        { name: '读者姓名', code: 'Name' },
        { name: '手机号', code: 'Phone' },
        { name: '身份证号/护照', code: 'IdCard' },
        { name: '工号', code: 'StudentNo' },
        { name: '读者卡号', code: 'CardNo' },
      ],
      searchTextCode: '',//文本输入code
      searchTextValue: '',//文本输入值
    }
  },
  mounted() {
    this.getDataKey();
    this.getList();
    // this.getDepa();
  },
  methods: {
    // 页面子权限判定
    isAuth(name) {
      let authList = this.$store.getters.authList;
      let curAuth = authList.find(item => (item.router == '/admin_librarianManagement'));
      // let curAuth = authList.find(item=>(item.router == this.$route.path));
      let curSonAuth = curAuth ? curAuth.permissionNodes.find(item => (item.permission == name)) : null;
      return curSonAuth ? true : false;
    },
    getDataKey() {
      http.getJson('staff-init-data').then(res => {
        this.dataKey = res.data;
        // sessionStorage.setItem('user_dataKey',JSON.stringify(res.data))
        this.getDepa();
      }).catch(err => {
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    // 获取列表数据
    getList() {
      this.loading = true;
      http.getJson('staff1-table-data', { ...this.postForm, ...this.pageData }).then(res => {
        let list = res.data.items || [];
        this.tableData = list;

        //分页所需  数据总条数
        this.pageData.totalCount = res.data.totalCount;
        this.loading = false;
      }).catch(err => {
        this.loading = false;
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    // 获取部门
    getDepa() {
      http.getJson('org-list').then(res => {
        this.departList = res.data;
      }).catch(err => {
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    // 初始化分页数据 并刷新列表
    initGetList() {
      this.pageData = {
        pageIndex: 1,
        pageSize: 20,
      }
      this.getList();
    },
    // 分页 页面修改
    pageChange(data) {
      this.pageData[data.key] = data.value;
      this.getList();
    },
    // 初始化下拉列表
    initSelect(code) {
      if (!this.dataKey) return;
      let select = this.dataKey.groupSelect.find(item => (item.groupCode == code));
      return select.groupItems;
    },
    // 键值对匹配
    getKeyValue(code, val) {
      let curItem = this.dataKey.groupSelect.find((item) => (item.groupCode == code));
      let curItems = curItem.groupItems.find((item) => (item.value == val));
      return curItems ? curItems.key : '';
    },
    // 编辑
    handleSet(row) {
      this.$router.push({ path: '/admin_readerManagement', query: { id: row.id } })
    },
    // 删除
    handleDel(row) {
      this.$confirm('请谨慎执行删除操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        http.deleteJson('staff', [row.id]).then(res => {
          this.getList();
          this.$message({ type: 'success', message: '删除成功!' });
        }).catch(err => {
          console.log(err);
        })
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除!' });
      });
    },
    // 添加馆员
    handleAdd() {
      this.$router.push({ path: '/admin_readerAdd', query: { type: 'staff' } });
    },
    // 查找
    handSearch() {
      //匹配文本查找项
      let search = {};
      search["depart"] = this.nodeDepart;
      if (this.searchTextCode && this.searchTextValue) {
        search[this.searchTextCode] = this.searchTextValue;
      }
      this.postForm = search;
      this.initGetList();
    },
    handleNodeClick(data) {
      this.nodeDepart = data.fullPath;
      this.handSearch();
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 变动组织
    handleChange() {
      if (!this.multipleSelection.length) {
        this.$message({
          message: '请先选择用户！',
          type: 'warning'
        })
        return
      }
      this.$refs.dialog_change.show(this.multipleSelection);
    }
  }
}
</script>
<style scoped lang="less">
.librarianList {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.librarianList-left,
.librarianList-right {
  // float: left;
  padding-bottom: 30px;
}
.librarianList-left {
  width: 15%;
  max-width: 22%;
}
.librarianList-right {
  width: 85%;
  min-width: 78%;
  padding-left: 10px;
  // padding: 0 20px 30px;
}
.left-title {
  width: 100%;
  display: table;
}
.left-box {
  width: 100%;
}
.zhuzhi,
.xinzeng {
  float: left;
  display: block;
}
.zhuzhi {
  color: #34395e;
  font-size: 15px;
  font-weight: bold;
}
.xinzeng {
  font-size: 14px;
  margin: 2% 13% 0 0;
  color: #6777ef;
  float: right;
  cursor: pointer;
}
.left-box,
.right-title,
.box-title {
  width: 100%;
  display: table;
}
.box-title {
  margin: 2.5% 0 2.5% 0;
}
.right-title {
  width: 100%;
}
.title-word {
  float: left;
  margin-top: 5px;
}
.title-word img {
  width: 18.52px;
  height: 16px;
  float: left;
  margin: 2px 5px 0 0;
}
.title-word span {
  float: left;
  display: block;
  color: #6777ef;
}
.tianjia,
.xzgy,
.bdzz {
  float: right;
  height: 34px;
  line-height: 34px;
  text-align: center;
  padding: 0 2%;
  margin-right: 1.5%;
  color: #fff;
  font-size: 14px;
  border-radius: 3px;
  cursor: pointer;
}
.tianjia {
  background: #6777ef;
}
/deep/ .el-table--border .el-table__cell {
  border-right: 1px solid #ebeef5;
}
/deep/ .el-table .el-table__cell {
  padding: 0.7% 0;
}
/deep/ .el-table th.el-table__cell {
  background-color: #f1f3f7;
  border-right: 1px solid #ebeef5;
  padding: 1% 0;
}
.xzgy {
  background: #8cc63f;
}
.bdzz {
  background: #f56c6c;
}
.searchs {
  background: #6777ef;
  border: 0;
  width: 88px;
  padding: 12px 15px;
  margin-left: 2%;
}
.searchs i,
.searchs span {
  display: block;
  float: left;
  color: #fff;
}
.searchs span {
  font-size: 14px;
  margin-left: 10px;
  display: block;
}
.duzhe {
  width: 22% !important;
}
.pagination {
  float: right;
  margin-top: 1%;
  padding: 1% 0 3% 0;
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
.shanchu,
.chakan {
  padding: 0 6px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 12px;
  margin-right: 2%;
}
.shanchu {
  background: #ffecec;
  color: #f56c6c;
}
.trees {
  margin-top: 4%;
  width: 88%;
}
.chakan {
  background: #f9f8ff;
  color: #6777ef;
}
.editdiv {
  width: 100%;
  margin-top: 3%;
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
  padding: 0;
}
/deep/ .el-radio {
  margin-top: 2.6%;
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
// /deep/ .el-button--text {
//   border-radius: 2px;
// }
// /deep/ .el-dialog__body {
//   padding: 0 20px;
// }
.tishi {
  background: #ffeee6;
  width: 100%;
  padding: 1.5% 2%;
  display: table;
}
.tishi i,
.tishi span {
  float: left;
}
.tishi i {
  color: #f26522;
  margin: 4px 1.5% 0 0;
}
.tishi span {
  font-size: 14px;
  color: #6c757d;
  width: 90%;
}
/deep/ .el-input,
/deep/ .el-select {
  width: 87%;
}
/deep/ .el-dialog {
  min-width: 600px;
}

/deep/ .el-select .el-input {
  width: 100%;
}
.touxiang-div {
  width: 78%;
  float: left;
  border: 1px solid #e4e6fc;
  display: table;
  padding: 2.5%;
}
.avatar-uploader {
  width: 80px;
  height: 80px;
  line-height: 80px;
  border: 1px dashed #e4e6fc;
  text-align: center;
  float: left;
}
.avatar-uploader i {
  font-size: 40px;
  color: #e4e6fc;
  margin-top: 16px;
}
.times-box {
  width: 78%;
}
.shangchuan {
  float: left;
  width: auto;
  margin: 11% 0 0 3%;
  padding: 10px;
  background: #6777ef;
  border: 0;
}
.shangchuan span {
  padding: 0 !important;
  text-align: left;
  width: auto !important;
}
.shangchuan i,
.shangchuan span {
  float: left;
}
.shangchuan i {
  color: #fff !important;
  margin: 0 !important;
}
.btns {
  padding: 2.1% 3.3% 1.6% 3.3%;
  font-size: 15px;
}
.baocun-div {
  background: #6777ef;
  margin-right: 2%;
  border: 0;
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
  border: 0;
}
/deep/
  .el-tree--highlight-current
  .el-tree-node.is-current
  > .el-tree-node__content {
  background: #f1eeff;
  color: #6777ef;
}

.search-item-box {
  display: inline-block;
}
.search-item {
  width: 150px;
  display: inline-block;
  margin-right: 4px;

  /deep/ .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 150px;
  }
}
.list-table {
  border-left: 1px solid #ebeef5;
  border-right: 1px solid #ebeef5;
}
/deep/ .el-tree-node__content {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
