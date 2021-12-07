<template>
  <div>
    <div class="m-title search-term-table">
      <el-input placeholder="角色名称" size="medium" v-model="postForm.keyword" class="width136"></el-input>
      <el-button type="primary" size="medium" icon="el-icon-search" @click="handSearch">查找</el-button>
      <el-button type="primary" size="medium" icon="el-icon-search" @click="handleAdd">新增角色</el-button>
    </div>

    <div class="t-p">
      <el-table stripe ref="singleTable" :data="isAuth('setting:roleList')?tableData:[]" @selection-change="handleSelectionApp" border class="admin-table" :header-cell-style="{background:'#F1F3F7'}">
        <el-table-column prop="code" label="编码" align="center" width="180px" show-overflow-tooltip></el-table-column>
        <el-table-column prop="name" label="角色名称" align="center" width="150px" show-overflow-tooltip></el-table-column>
        <el-table-column prop="staffCount" label="馆员" align="center" width="100px"></el-table-column>
        <el-table-column prop="remark" label="角色描述" align="left"></el-table-column>
        <el-table-column prop="sysBuildIn" label="系统内置" align="center" width="120px">
          <template slot-scope="scope">
            <span>{{scope.row.sysBuildIn?'是':'否'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleDel(scope.row)" type="text" size="mini" icon="el-icon-delete" class="operate-red-btn" round :disabled="scope.row.sysBuildIn" v-if="isAuth('setting:roleDelete')">删除</el-button>
            <el-button @click="handleEditAuth(scope.row)" type="text" size="mini" icon="el-icon-edit" round :disabled="scope.row.sysBuildIn" v-if="isAuth('setting:rolePermissionSet')">编辑权限</el-button>
            <el-button @click="handleEditStaff(scope.row)" type="text" size="mini" icon="el-icon-edit" round v-if="isAuth('setting:roleStaffSet')">编辑馆员</el-button>
          </template>
        </el-table-column>
      </el-table>
      <paging :pagedata="pageData" @pagechange="pageChange" v-if="pageData.totalCount"></paging>
      <dialog_staff ref="dialog_staff"></dialog_staff>

      <!-- <dialogLog ref="dialogLog" :dataKey="dataKey"></dialogLog> -->
      <!-- <dialogUserLog ref="dialogUserLog" :dataKey="dataKey"></dialogUserLog> -->
      <!-- <dialogAudit ref="dialogAudit" :dataKey="dataKey" @auditSub="getList"></dialogAudit> -->
    </div>
  </div>
</template>
<script>
import http from "@/assets/public/js/http";
import paging from "@/components/admin/model/paging";
import dialog_staff from './dialog_staff'


export default {
  name: 'index',
  components: { paging, dialog_staff },
  data() {
    return {
      dataKey: null,
      pageData: {
        pageIndex: 1,
        pageSize: 50,
      },//分页参数
      tableData: [],//列表项
      multipleSelection: [],//勾选列表
      postForm: {},
      tableData: [],
      date: '',//操作日期
      select: '',//搜索文本搜索选择
      searchKey: '',//搜索文本搜索内容

      idList: []
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    // 页面子权限判定
    isAuth(name){
      let authList = this.$store.getters.authList;
      let curAuth = authList.find(item=>(item.router == '/userSet'));
      // let curAuth = authList.find(item=>(item.router == this.$route.path));
      let curSonAuth = curAuth ? curAuth.permissionNodes.find(item=>(item.permission==name)) : null;
      return curSonAuth?true:false;
    },
    // 获取列表数据
    getList() {
      http.getJson('role-table-data', { ...this.postForm, ...this.pageData }).then(res => {
        let list = res.data.items || [];
        this.tableData = list;

        //分页所需  数据总条数
        this.pageData.totalCount = res.data.totalCount;
      }).catch(err => {
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    // 初始化分页数据 并刷新列表
    initGetList() {
      this.pageData = {
        pageIndex: 1,
        pageSize: 50,
      }
      this.getList();
    },
    // 分页 页面修改
    pageChange(data) {
      this.pageData[data.key] = data.value;
      this.getList();
    },

    // 查找
    handSearch() {
      //匹配文本查找项
      if (this.select && this.select != '') {
        this.postForm[this.select] = this.searchKey;
      }

      this.initGetList();
    },
    // 新增角色
    handleAdd() {
      this.$router.push('/roleAdd');
    },
    // 选择日期
    handleDate() {
      // console.log(val);
      this.postForm.ChangeEndTime = this.date;
      this.postForm.ChangeStartTime = this.date;
    },
    // 键值对匹配
    getKeyValue(name, val) {
      for (const key in this.dataKey[name]) {
        if (this.dataKey[name][key] == val) {
          return key;
        }
      }
    },
    // 日期格式化
    getDate(date) {
      var dateList = date.split('T');
      return dateList[0] + ' ' + dateList[1].substring(0, 5);
    },
    // 审核
    handleAudit(row) {
      this.$refs.dialogAudit.show('reader', row.id);
    },
    // 查看日志
    handleLog(row) {
      this.$refs.dialogUserLog.show('reader', row.id);
    },
    // 删除
    handleDel(row) {
      this.$confirm('请谨慎执行删除操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        http.deleteJsonSelf('role', `/${row.id}`).then(res => {
          this.getList();
          this.$message({ type: 'success', message: '删除成功!' });
        }).catch(err => {
          console.log(err);
        })
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除!' });
      });
    },
    // 编辑权限
    handleEditAuth(row) {
      this.$router.push({ path: '/roleAdd', query: { id: row.id } });
    },
    // 编辑馆员
    handleEditStaff(row) {
      this.$refs.dialog_staff.show(row.id);
    },

  },
}
</script>
<style lang="less" scoped>
@import "../../../../../assets/admin/css/color.less"; /**颜色配置 */
@import "../../../../../assets/admin/css/form.less";

// .t-p {
//   /deep/.el-table [class*="el-table__row--level"] .el-table__expand-icon {
//     margin-left: -20px;
//     margin-right: 0px;
//   }

//   /deep/ .el-table__indent {
//     padding-left: 10px !important;
//     margin-left: -29px;
//   }
// }
.search-term-table {
  width: 100%;
  // height: 64px;
  padding: 13px 20px 10px;
  box-sizing: border-box;
  border-bottom: 1px solid #ebeef5;

  .width187 {
    width: 187px;
  }
  .width136 {
    width: 136px;
  }
  .r-btn {
    float: right;
  }
  /deep/ input {
    font-weight: normal;
  }
}
// /deep/ .el-input-group__prepend {
//   background-color: #fff;
// }
// table树形结构 下拉图标更换
/deep/ .el-table__expand-icon {
  font-size: 14px;
  color: #78828a;
}
/deep/ .el-table__expand-icon .el-icon-arrow-right:before {
  content: "\e7a0";
}
/deep/ .el-table__expand-icon .el-icon-arrow-right:before {
  content: "\e7a0";
}

/deep/ .el-table__expand-icon--expanded .el-icon-arrow-right:before {
  content: "\e7a2";
}
/deep/ .el-table__expand-icon--expanded {
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
}
.line-before {
  // position: relative;
  // &::before {
  //   content: "";
  //   width: 12px;
  //   height: 52px;
  //   border-bottom: 1px solid #78828a;
  //   border-left: 1px solid #78828a;
  //   position: absolute;
  //   left: -19px;
  //   top: -26px;
  // }
}
</style>