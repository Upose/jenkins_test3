<template>
  <div>
    <div class="integral-box">
      <!-- <div class="search-box">
        <el-input v-model="postForm.title" placeholder="题名" class="w150"></el-input>
        <el-input v-model="postForm.searchNo" placeholder="索书号" class="w150"></el-input>
        <el-input v-model="postForm.collectPlace" placeholder="馆藏地" class="w150"></el-input>
        <el-date-picker v-model="postForm.BorrowStartTime" type="date" placeholder="借阅时间" class="w150"></el-date-picker>
        <el-date-picker v-model="postForm.ReturnStartTime" type="date" placeholder="归还时间" class="w150"></el-date-picker>
        <el-button type="primary" @click="getList">查找</el-button>
      </div> -->
    </div>
    <div class="login-list">
      <el-table v-loading="loading" :data="tableData" border style="width: 100%" class="list-table">
        <el-table-column label="序号" prop="sort" width="80" align="center"></el-table-column>
        <el-table-column label="时间" prop="eventTime" align="center" width="150">
          <template slot-scope="scope">
            {{dateChangeFormat(scope.row.eventTime)}}
          </template>
        </el-table-column>
        <el-table-column label="事件" prop="eventName"></el-table-column>
        <el-table-column label="日志来源" prop="logFrom"></el-table-column>
        <el-table-column label="日志说明" prop="logDesc" min-width="300"></el-table-column>
      </el-table>
    </div>
    <paging :pagedata="pageData" @pagechange="pageChange" v-if="pageData.totalCount"></paging>
  </div>
</template>
<script>
import http from "@/assets/public/js/http";
import paging from "@/components/admin/model/paging";
export default {
  components: {
    paging
  },
  data() {
    return {
      loading: false,
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
  props: ['id', 'userKey'],
  mounted() {
    // this.getKey();
    this.getList();
  },
  methods: {
    // 获取列表数据
    getList() {
      this.loading = true;
      http.getJson('user-log-table-data', { userID: this.id, userKey: this.userKey, ...this.postForm, ...this.pageData }).then(res => {
        this.borrowData = res.data;
        let list = res.data.items || [];
        this.tableData = list;
        this.pageData.totalCount = res.data.totalCount;
        this.loading = false;
      }).catch(err => {
        this.loading = false;
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    // 分页 页面修改
    pageChange(data) {
      this.pageData[data.key] = data.value;
      this.getList();
    },
    // 时间格式化
    dateChangeFormat(date, format = 'YYYY-mm-dd HH:MM') {
      date = new Date(date);
      const dataItem = {
        'Y+': date.getFullYear().toString(),
        'm+': (date.getMonth() + 1).toString(),
        'd+': date.getDate().toString(),
        'H+': date.getHours().toString(),
        'M+': date.getMinutes().toString(),
        'S+': date.getSeconds().toString(),
      };
      Object.keys(dataItem).forEach((item) => {
        const ret = new RegExp(`(${item})`).exec(format);
        if (ret) {
          format = format.replace(ret[1], ret[1].length === 1 ? dataItem[item] : dataItem[item].padStart(ret[1].length, '0'));
        }
      });
      return format;
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
  // padding-left: 8%;
}
// /deep/ .el-input__inner {
//   height: 37px;
//   line-height: 37px;
// }
.w150 {
  width: 150px;
  margin-right: 10px;
}
</style>