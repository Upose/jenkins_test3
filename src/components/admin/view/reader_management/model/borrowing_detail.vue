<template>
  <div>
    <div class="integral-box">
      <div class="integral-num">
        <span>总借阅：</span>
        <span>{{borrowData.totalBorrowCount}}</span>
      </div>
      <div class="integral-num">
        <span>当前借阅：</span>
        <span>{{borrowData.nowBorrowCount}}</span>
      </div>
      <div class="search-box">
        <el-input v-model="postForm.title" placeholder="题名" class="w150"></el-input>
        <el-input v-model="postForm.searchNo" placeholder="索书号" class="w150"></el-input>
        <el-input v-model="postForm.collectPlace" placeholder="馆藏地" class="w150"></el-input>
        <el-date-picker v-model="postForm.BorrowStartTime" type="date" placeholder="借阅时间" class="w150"></el-date-picker>
        <el-date-picker v-model="postForm.ReturnStartTime" type="date" placeholder="归还时间" class="w150"></el-date-picker>
        <el-button type="primary" @click="getList" icon="el-icon-search">查找</el-button>
      </div>
    </div>
    <div class="login-list">
      <el-table :data="tableData" border style="width: 100%" class="list-table">
        <el-table-column label="题名" prop="title"></el-table-column>
        <el-table-column label="索书号" prop="searchNo"></el-table-column>
        <el-table-column label="馆藏地" prop="collectPlace"></el-table-column>
        <el-table-column label="续借申请" prop="renewApply"></el-table-column>
        <el-table-column label="续借次数" prop="renewCount"></el-table-column>
        <el-table-column label="借阅时间" prop="borrowTime"></el-table-column>
        <el-table-column label="应归还时间" prop="showReturnTime"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import http from "@/assets/public/js/http";
export default {
  data() {
    return {
      dataKey: null,
      pageData: {
        pageIndex: 1,
        pageSize: 20,
      },//分页参数
      tableData: [],//列表项
      postForm: {},
      borrowData: {}
    }
  },
  props: ['id'],
  mounted() {
    // this.getKey();
    this.getList();
  },
  methods: {
    // 获取列表数据
    getList() {
      http.getJson('user-borrow-table-data', { userID: this.id, ...this.postForm, ...this.pageData }).then(res => {
        this.borrowData = res.data;
        let list = res.data.items || [];
        this.tableData = list;
      }).catch(err => {
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
  }
}
</script>
<style scoped lang="less">
.integral-box {
  width: 100%;
  display: table;
  margin-top: 2%;
}
.integral-num {
  padding: 0.5% 0.8%;
  float: left;
  border: 1px solid #e4e6fc;
  display: table;
  margin-right: 1.5%;
}
.integral-num span {
  display: table-cell;
  color: #f58b58;
  font-size: 15px;
  margin-top: 2px;
  text-align: left;
}
.integral-num span:first-child {
  color: #34395e;
  margin: 0;
  text-align: right;
}
.inputs,
.selects,
.times {
  float: left;
  width: 10%;
  margin-right: 1.5%;
}
.serach-btn {
  background: #6777ef;
  border: 0;
  padding: 0 3%;
  height: 37px;
  line-height: 37px;
  color: #fff;
  text-align: center;
  float: left;
}
.login-list {
  width: 100%;
  background: #fff;
  padding: 2% 0;
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
/deep/ .el-input__inner {
  height: 37px;
  line-height: 37px;
}
.w150{
  width: 150px;
  margin-right: 10px;
}
</style>