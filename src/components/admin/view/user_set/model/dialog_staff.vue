<template>
  <el-dialog title="编辑馆员" :visible.sync="dialogVisible" width="80%">
    <div class="m-title search-term-table">
      <el-input placeholder="馆员名称" size="medium" v-model="postForm.keyword" class="width136" clearable></el-input>
      <el-button type="primary" size="medium" icon="el-icon-search" @click="handSearch">查找</el-button>
      <el-button type="primary" size="medium" icon="el-icon-plus" @click="handleAdd">添加馆员</el-button>
    </div>

    <div class="t-p">
      <el-table :data="tableData" border style="width: 100%" class="list-table" :header-cell-style="{background:'#F1F3F7'}">
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="部门" prop="depart"></el-table-column>
        <el-table-column label="职称" prop="title"></el-table-column>
        <el-table-column label="手机号码" prop="phone"></el-table-column>
        <el-table-column label="工号" prop="studentNo"></el-table-column>

        <el-table-column prop="roles" label="角色">
          <template slot-scope="scope">
            <span style="display:inline-block" v-for="item in scope.row.roles" :key="item.id">{{item.name}} </span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click="handleDel(scope.row)" type="text" size="mini" icon="el-icon-delete" class="operate-red-btn" round>移除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <paging :pagedata="pageData" @pagechange="pageChange" v-if="pageData.totalCount"></paging>
    </div>
    <Dialog_staff_add @refresh-table="getList" ref="Dialog_staff_add"></Dialog_staff_add>
  </el-dialog>
</template>
<script>
import http from "@/assets/public/js/http";
import paging from "@/components/admin/model/paging";
import Dialog_staff_add from './dialog_staff_add';

export default {
  name: 'index',
  components: { paging, Dialog_staff_add },
  data() {
    return {
      dialogVisible: false,
      dataKey: null,
      pageData: {
        pageIndex: 1,
        pageSize: 50,
      },//分页参数
      tableData: [],//列表项
      multipleSelection: [],//勾选列表
      postForm: {
        keyword: ''
      },
      parms: {},
      tableData: [],
      date: '',//操作日期
      select: '',//搜索文本搜索选择
      searchKey: '',//搜索文本搜索内容

      showIsDel: false,//是否展示移除按钮

      idList: [],
    }
  },
  mounted() {
    // this.getList();
  },
  methods: {
    // 显示弹窗
    show(id) {
      let code = ['SensitiveInfoVisitor', 'UserRegisterApprover', 'UserChangeLogApprover', 'PropertyChangeLogApprover', 'CardClaimApprover',];
      if (code.includes(id)) {
        this.parms.roleCode = id;
        this.showIsDel = false;
        this.getRoleDataByCode();
      } else {
        this.parms.roleId = id;
        this.showIsDel = true;
        this.getRoleDataById();
      }
      this.dialogVisible = true;
    },
    getRoleDataByCode() {
      http.getJsonSelf('role-data-by-code', `/${this.parms.roleCode}`).then(res => {
        this.parms.roleId = res.data.id;
        this.parms.roleCode = res.data.code;
        this.getList();
      }).catch(err => {
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    getRoleDataById() {
      http.getJsonSelf('role-data', `/${this.parms.roleId}`).then(res => {
        this.parms.roleId = res.data.id;
        this.parms.roleCode = res.data.code;
        this.getList();
      }).catch(err => {
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    // 获取列表数据
    getList() {
      http.getJson('staff-table-data', { ...this.parms, ...this.postForm, ...this.pageData }).then(res => {
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
    //表单提交
    submitForm() {
      http.postJson('role-users', { roleID }).then(res => {
        this.$message({ message: '保存成功！', type: 'success' });
        this.getData();
      }).catch(err => {
        this.$message({ type: 'error', message: '保存失败!' });
      })
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
        http.deleteJsonSelf('user-role', `?userID=${row.id}&roleID=${this.parms.roleId ? this.parms.roleId : null}&roleCode=${this.parms.roleCode}`).then(res => {
          this.getList();
          this.$message({ type: 'success', message: '删除成功!' });
        }).catch(err => {
          console.log(err);
        })
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除!' });
      });
    },
    // 新增馆员
    handleAdd(row) {
      this.$refs['Dialog_staff_add'].show(this.parms.roleId);
    },
    // 编辑属性
    handleEdit(row) {
      this.$router.push({ path: '/attributeAdd', query: { id: row.id } });
    },
    // 编辑属性组
    handleEditGroup() {
      this.$router.push({ path: '/contentEdit', query: { columnId: this.id } });
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