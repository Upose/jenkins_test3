<!---数据库导航-总导航管理-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse?'fold-menu':''">
        <serviceLMenu :isActive="2"></serviceLMenu>
      </el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{'content-collapse':$root.collapse}">
        <breadcrumb :cuMenu="'读者管理'" :fontColor="'fff'"></breadcrumb>
        <!--面包屑导航--->
        <div class="content search-table-general">
          <div class="search-table-w">
            <h1 class="search-title">导入读者数据</h1>
          </div>
          <!--顶部查询 end-->
          <div class="table-w">
            <h2 class="m-title">
              <el-button type="primary" size="medium" @click="sub">确认导入</el-button>
              <div class="r-btn">
                <el-button type="primary" size="medium" class="blue-btn" @click="handleDownload">下载模板</el-button>
                <el-button type="primary" size="medium" @click="$refs.uploadFile.show()">导入数据</el-button>
              </div>
            </h2>
            <div class="t-p">
              <el-table v-loading="loading" ref="singleTable" :data="tableData" border :header-cell-style="{background:'#F1F3F7'}" class="admin-table" :row-class-name="tableRowClassName">
                <!-- <el-table-column type="selection" width="45"></el-table-column> -->
                <!-- <el-table-column type="index" width="50" align="center" label="序号"></el-table-column> -->
                <el-table-column prop="userName" label="姓名" align="center" width="120" show-overflow-tooltip></el-table-column>
                <el-table-column prop="userGender" label="性别" align="center" width="90" show-overflow-tooltip></el-table-column>
                <el-table-column prop="userPhone" label="手机号" align="center" width="120" show-overflow-tooltip></el-table-column>
                <el-table-column prop="userTypeName" label="读者类型" align="center" width="120" show-overflow-tooltip></el-table-column>
                <el-table-column prop="studentNo" label="学工号" align="center" width="120" show-overflow-tooltip></el-table-column>
                <el-table-column prop="edu" label="学历" align="center" width="120" show-overflow-tooltip></el-table-column>
                <el-table-column prop="unit" label="单位" align="left" width="120" show-overflow-tooltip></el-table-column>

                <el-table-column prop="college" label="院系" align="left" width="120" show-overflow-tooltip></el-table-column>
                <el-table-column prop="major" label="专业" align="center" width="120" show-overflow-tooltip></el-table-column>
                <el-table-column prop="grade" label="年级" align="center" width="120" show-overflow-tooltip></el-table-column>
                <el-table-column prop="class" label="班级" align="center" width="120" show-overflow-tooltip></el-table-column>
                <el-table-column prop="idCard" label="身份证号" align="center" width="180" show-overflow-tooltip></el-table-column>
                <el-table-column prop="email" label="电子邮箱" align="center" width="150" show-overflow-tooltip></el-table-column>
                <el-table-column prop="birthday" label="出生年月" align="center" width="120" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <span>{{setTime(scope.row.birthday,'日')}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="addr" label="所在地" align="center" width="120" show-overflow-tooltip></el-table-column>
                <el-table-column prop="addrDetail" label="详细地址" align="left" width="260" show-overflow-tooltip></el-table-column>
                <el-table-column prop="cardNo" label="卡号" align="center" width="150" show-overflow-tooltip></el-table-column>
                <el-table-column prop="cardTypeName" label="卡类型" align="center" width="120" show-overflow-tooltip></el-table-column>
                <el-table-column label="错误提示" min-width="200" align="center" show-overflow-tooltip fixed="right">
                  <template slot-scope="scope">
                    <span v-if="scope.row.error">{{scope.row.errorMsg}}</span>
                  </template>
                </el-table-column>
              </el-table>
              <!--<el-button size="small" class="default-btn-n-border next-btn">下一页</el-button>-->
              <paging :pagedata="pageData" @pagechange="pageChange" v-if="pageData.totalCount"></paging>
            </div>
          </div>
          <!--管理页列表 end--->
          <uploadFile ref="uploadFile" @uploadSuccess="getList"></uploadFile>
        </div>
        <!---顶部查询板块 end--->
        <footerPage class="top20"></footerPage>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios';

// import bus from '@/assets/public/js/bus';;
import http from "@/assets/public/js/http";
import footerPage from "@/components/admin/common/footer";
import breadcrumb from "@/components/admin/model/breadcrumb";
import paging from "@/components/admin/model/paging";
import serviceLMenu from "@/components/admin/model/serviceLMenu_user";
import uploadFile from '../model/uploadFile'

export default {
  name: 'index',
  created() {
    // bus.$on('collapse', msg => {
    //   this.$root.collapse = msg;
    //   this.$forceUpdate();
    // })
  },
  components: { footerPage, serviceLMenu, breadcrumb, paging, uploadFile },
  data() {
    return {
      loading: false,
      dataKey: null,
      postForm: {},//列表查询参数
      pageData: {
        pageIndex: 1,
        pageSize: 20,
      },//分页参数
      tableData: [],//列表项
      multipleSelection: [],//勾选列表
      searchForm: {},//搜索项

      batchid: '',//导入id
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.getKey();
    },
    // 获取初始数据
    getKey() {
      http.getJson('user-init-data').then(res => {
        this.dataKey = res.data;
      }).catch(err => {
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    // 下载模板
    handleDownload() {
      http.importFile('download-user-import-template').then(res => {
        this.$message({ type: 'success', message: '下载模板成功!' });
      }).catch(err => {
        this.$message({ type: 'error', message: '下载模板失败!' });
      })
    },
    // 获取列表数据
    getList(id) {
      this.loading = true;
      this.batchid = id;
      http.getJson('import-temp-user-data', { BatchId: this.batchid, ...this.pageData }).then(res => {
        this.tableData = [...res.data.items, ...this.tableData];
        //分页所需  数据总条数
        this.pageData.totalCount = res.data.totalCount;
        this.loading = false;
      }).catch(err => {
        this.loading = false;
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    // 错误项
    tableRowClassName(row) {
      if (row.row.error) {
        return 'warning-row';
      } else {
        return '';
      }
    },
    // 确认导入
    sub() {
      http.postJsonSelf('import-user-confirm', `/${this.batchid}`).then(res => {
        if (res.data) {
          this.$message({ type: 'success', message: `导入成功：${res.data.sucCount}条，失败：${res.data.errCount}条!` });
          this.tableData = [];
        }
      }).catch(err => {
        this.$message({ type: 'error', message: '导入失败!' });
      })
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../../../assets/admin/css/color.less"; /**颜色配置 */
@import "../../../../assets/admin/css/form.less";
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
/deep/ .el-table .warning-row {
  background: rgb(243, 208, 208);
}
</style>
