<template>
  <div>
    <div class="m-title search-term-table">
      <el-input placeholder="馆员名称" size="medium" v-model="postForm.name" class="width136 mr10" clearable></el-input>
      <el-button type="primary" size="medium" icon="iconfont el-icon-vip-fangdajing" @click="handSearch" v-button-debounce>查找</el-button>
      <el-button type="primary" size="medium" icon="iconfont el-icon-vip-tianjia2" @click="handleAdd">添加馆员</el-button>
    </div>

    <div class="t-p">
      <el-table v-loading="loading" :data="tableData" border style="width: 100%" class="list-table" :header-cell-style="{background:'#F1F3F7'}">
        <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
        <el-table-column label="序号" type="index" align="center" width="55">
          <template slot-scope="scope">
            <span>{{(pageData.pageIndex - 1) * pageData.pageSize + scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" prop="name" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column label="部门" prop="departName" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column label="职称" prop="title" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column label="手机号码" prop="phone" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column label="主卡号" prop="cardNo" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column label="工号" prop="studentNo" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column label="卡状态" prop="cardStatusName" align="center">

        </el-table-column>
        <el-table-column label="截止日期" prop="cardExpireDate" align="center">
          <template slot-scope="scope">
            {{scope.row.cardExpireDate ? setTime(scope.row.cardExpireDate): ''}}
          </template>
        </el-table-column>
        <el-table-column prop="roles" label="角色" align="center">
          <template slot-scope="scope">
            <span v-for="item in  scope.row.roles" :key="item.id">{{item.name}} </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="200" align="center">
          <template slot-scope="scope">
            <!-- <el-button @click="handleDel(scope.row)" type="text" size="mini" icon="el-icon-delete" class="operate-red-btn" round>删除</el-button> -->
            <el-button @click="handleSet(scope.row)" type="text" size="mini" icon="iconfont el-icon-vip-bianji" round v-has="'setting:staffRoleSet'">修改角色</el-button>
          </template>
        </el-table-column>
      </el-table>
      <paging :pagedata="pageData" @pagechange="pageChange" v-if="pageData.totalCount"></paging>
      <dialog_change_role ref="dialog_change_role" @update="getList"></dialog_change_role>

      <!-- <dialogLog ref="dialogLog" :dataKey="dataKey"></dialogLog> -->
      <!-- <dialogUserLog ref="dialogUserLog" :dataKey="dataKey"></dialogUserLog> -->
      <!-- <dialogAudit ref="dialogAudit" :dataKey="dataKey" @auditSub="getList"></dialogAudit> -->
    </div>
  </div>
</template>
<script>
import http from "@/assets/public/js/http";
import paging from "@/components/admin/model/paging";
import dialog_change_role from './dialog_change_role'
// import dialogLog from "./dialog/dialog_log";
// import dialogUserLog from "./dialog/dialog_user_log";
// import dialogAudit from "./dialog/dialog_audit";


export default {
  name: 'index',
  components: { paging, dialog_change_role },
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
    // 获取列表数据
    getList() {
      this.loading = true;
      http.getJson('staff-table-data', { ...this.postForm, ...this.pageData }).then(res => {
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

    // 查找
    handSearch() {
      //匹配文本查找项
      if (this.select && this.select != '') {
        this.postForm[this.select] = this.searchKey;
      }

      this.initGetList();
    },
    // 删除
    handleDel(row) {
      this.$confirm('请谨慎执行删除操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        http.deleteJsonSelf('staff', `/${row.id}`).then(res => {
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
    // 修改角色
    handleSet(row) {
      this.$refs.dialog_change_role.show(row.id, row.roles);
    }
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
  & /deep/ .mr10 {
    margin-right: 10px;
  }

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