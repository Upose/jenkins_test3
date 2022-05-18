<template>
  <div>
    <div class="m-title search-term-table">
      <!-- <el-select class="width136" v-model="postForm.type" size="medium" placeholder="操作类型">
        <el-option :value="item" :label="index" v-for="(item,index) in dataKey.propertyLogType" :key="index"></el-option>
      </el-select>
      <el-select class="width136" v-model="postForm.status" size="medium" placeholder="操作状态">
        <el-option :value="item" :label="index" v-for="(item,index) in dataKey.propertyLogStatus" :key="index"></el-option>
      </el-select>
      <el-date-picker class="width136" type="date" v-model="date" size="medium" placeholder="操作日期" @change="handleDate"></el-date-picker>
      <el-input placeholder="请输入" size="medium" v-model="searchKey" style="width:300px">
        <el-select v-model="select" slot="prepend" placeholder="请选择" style="width:130px">
          <el-option label="操作人姓名" :value="'changeUserName'"></el-option>
          <el-option label="操作人电话" :value="'changeUserPhone'"></el-option>
        </el-select>
      </el-input> -->
      <el-button type="primary" size="medium" icon="iconfont el-icon-vip-fangdajing" @click="handSearch">查找</el-button>
    </div>

    <div class="t-p">
      <el-table stripe ref="singleTable" :data="isAuth('approve:registerList')?tableData:[]" @selection-change="handleSelectionApp" border class="admin-table" :header-cell-style="{background:'#F1F3F7'}">
        <el-table-column label="IP" align="center" width="58" type="index"></el-table-column>
        <el-table-column prop="changeTime" label="修改时间">
          <template slot-scope="scope">
            <span>{{ setTime(scope.row.changeTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="changeUserName" label="操作人"></el-table-column>
        <el-table-column label="类型">
          <template slot-scope="scope">
            <span>{{ getKeyValue('propertyLogType',scope.row.changeType) }}</span>
            <!-- <span>{{ scope.row.changeType }}</span> -->
          </template>
        </el-table-column>
        <el-table-column prop="content" label="修改内容"></el-table-column>
        <el-table-column prop="unique" label="状态">
          <template slot-scope="scope">
            <span>{{ getKeyValue('propertyLogStatus',scope.row.status) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="handleAudit(scope.row)" type="text" size="mini" icon="el-icon-edit" round v-if="scope.row.status == 0&&isAuth('approve:registerApprove')">审核</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="详细日志">
          <template slot-scope="scope">
            <el-button @click="handleLog(scope.row)" type="text" size="mini" icon="el-icon-edit" round v-if="isAuth('approve:registerDetail')">详细记录</el-button>
          </template>
        </el-table-column>
      </el-table>
      <paging :pagedata="pageData" @pagechange="pageChange" v-if="pageData.totalCount"></paging>

      <dialogLog ref="dialogLog" :dataKey="dataKey"></dialogLog>
      <dialogUserLog ref="dialogUserLog" :dataKey="dataKey"></dialogUserLog>
      <dialogAudit ref="dialogAudit" :dataKey="dataKey" @auditSub="getList"></dialogAudit>
    </div>
  </div>
</template>
<script>
import http from "@/assets/public/js/http";
import paging from "@/components/admin/model/paging";
import dialogLog from "./dialog/dialog_log";
import dialogUserLog from "./dialog/dialog_user_log";
import dialogAudit from "./dialog/dialog_audit";


export default {
  name: 'index',
  components: { paging, dialogLog, dialogAudit, dialogUserLog },
  props: ['dataKey'],
  data() {
    return {
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
    // 页面子权限判定
    isAuth(name) {
      let authList = this.$store.getters.authList;
      let curAuth = authList.find(item => (item.router == '/admin_changeAudit'));
      // let curAuth = authList.find(item=>(item.router == this.$route.path));
      let curSonAuth = curAuth ? curAuth.permissionNodes.find(item => (item.permission == name)) : null;
      return curSonAuth ? true : false;
    },
    // 获取列表数据
    getList() {
      http.getJson('user-register-table-data', { ...this.postForm, ...this.pageData }).then(res => {
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
      if (this.select && this.select != '') {
        this.postForm[this.select] = this.searchKey;
      }

      this.initGetList();
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
      this.$refs.dialogAudit.show('register', row.id);
    },
    // 查看日志
    handleLog(row) {
      this.$refs.dialogUserLog.show('register', row.id);
    },
    // 删除
    handleDel(row) {
      this.$confirm('请谨慎执行删除操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        http.deleteJsonSelf('property', `/${row.id}`).then(res => {
          this.getList();
          this.$message({ type: 'success', message: '删除成功!' });
        }).catch(err => {
          console.log(err);
        })
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除!' });
      });
    },
    // 新增属性
    handleAdd(row) {
      this.$router.push({ path: '/admin_attributeAdd', query: { id: row.id } });
    },
    // 编辑属性
    handleEdit(row) {
      this.$router.push({ path: '/admin_attributeAdd', query: { id: row.id } });
    },
    // 编辑属性组
    handleEditGroup() {
      this.$router.push({ path: '/admin_contentEdit', query: { columnId: this.id } });
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