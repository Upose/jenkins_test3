<template>
  <el-dialog title="编辑馆员" :visible.sync="dialogVisible" width="70%" append-to-body>
    <div class="m-title search-term-table">
      <div class="search-term">
        <div class="search-item-box">
          <el-input placeholder="请输入" v-model="searchTextValue" style="width:300px" clearable>
            <el-select v-model="searchTextCode" slot="prepend" placeholder="请选择" style="width:130px">
              <el-option v-for="item in textProperties" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-input>
        </div>
        <el-button type="primary" size="medium" icon="iconfont el-icon-vip-fangdajing" @click="handSearch">查找</el-button>
      </div>
    </div>

    <div class="t-p">
      <el-table @selection-change="handleSelectionChange" ref="selectTable" :data="tableData" border style="width: 100%" class="list-table" :header-cell-style="{background:'#F1F3F7'}">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column label="姓名" prop="name" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column label="部门" prop="departName" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column label="职称" prop="title" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column label="手机号码" prop="phone" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column label="主卡号" prop="cardNo" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column label="工号" prop="studentNo" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column label="卡状态" prop="cardStatusName" align="center"></el-table-column>
        <el-table-column label="截止日期" prop="cardExpireDate" align="center">
          <template slot-scope="scope">
            {{setTime(scope.row.cardExpireDate,'日')}}
          </template>
        </el-table-column>
        <el-table-column prop="roles" label="角色" align="center">
          <template slot-scope="scope">
            <span style="display:inline-block" v-for="item in scope.row.roles" :key="item.id">{{item.name}} </span>
          </template>
        </el-table-column>
      </el-table>
      <paging :pagedata="pageData" @pagechange="pageChange" v-if="pageData.totalCount"></paging>
    </div>
    <div slot="footer">
      <el-button type="primary" @click="submitForm" icon="iconfont el-icon-vip-baocun1">保 存</el-button>
    </div>
  </el-dialog>
</template>
<script>
import http from "@/assets/public/js/http";
import paging from "@/components/admin/model/paging";
// import dialogLog from "./dialog/dialog_log";
// import dialogUserLog from "./dialog/dialog_user_log";
// import dialogAudit from "./dialog/dialog_audit";


export default {
  name: 'index',
  components: { paging },
  data() {
    return {
      dialogVisible: false,
      dataKey: null,
      pageData: {
        pageIndex: 1,
        pageSize: 20,
      },//分页参数
      tableData: [],//列表项
      multipleSelection: [],//勾选列表
      postForm: {
        keyword: ''
      },
      parms: {},
      date: '',//操作日期
      select: '',//搜索文本搜索选择
      searchKey: '',//搜索文本搜索内容

      idList: [],
      multipleSelection: [],
      textProperties: [
        { name: '馆员姓名', code: 'Name' },
        { name: '手机号', code: 'Phone' },
        { name: '学工号', code: 'StudentNo' },
      ],
      searchTextCode: '',//文本输入code
      searchTextValue: '',//文本输入值
    }
  },
  mounted() {
    // this.getList();
  },
  methods: {
    // 显示弹窗
    show(id) {
      this.parms.excludeRoleId = id;
      this.getList();
      this.dialogVisible = true;
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
      let search = {};
      if (this.searchTextCode && this.searchTextValue) {
        search[this.searchTextCode] = this.searchTextValue;
      }
      this.postForm = search;

      this.initGetList();
    },
    //表单提交
    submitForm() {
      let userIds = this.multipleSelection.map(x => { return x.id });
      http.postJson('role-users', { roleId: this.parms.excludeRoleId, userIds: userIds }).then(res => {
        this.$message({ message: '保存成功！', type: 'success' });
        this.$emit('refresh-table');
        this.dialogVisible = false;
      }).catch(err => {
        this.$message({ type: 'error', message: this.handleError('保存失败') });
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

    },
    // 编辑属性
    handleEdit(row) {
      this.$router.push({ path: '/admin_attributeAdd', query: { id: row.id } });
    },
    // 编辑属性组
    handleEditGroup() {
      this.$router.push({ path: '/admin_contentEdit', query: { columnId: this.id } });
    },
    //变更选择数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
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