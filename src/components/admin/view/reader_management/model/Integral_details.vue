<!--
 * @Author: huyu
 * @Date: 2022-05-20 14:40:28
 * @LastEditors: gongqin
 * @LastEditTime: 2023-03-01 09:44:06
 * @Description: 
-->
<template>
  <div>
    <div class="integral-box">
      <div class="integral-box-num">
        <div class="integral-num" v-if="integralData">
          <span>总积分：</span>
          <span>{{ integralData.userScore }}</span>
        </div>
        <div class="integral-num" v-if="integralData">
          <span>消耗积分：</span>
          <span>{{ integralData.consumeScore }}</span>
        </div>
        <div class="integral-num" v-if="integralData">
          <span>过期积分：</span>
          <span>{{ integralData.overdueScore }}</span>
        </div>
      </div>
      <el-select v-model="postForm.userKey" placeholder="读者卡号" class="selects">
        <el-option v-for="item in cardData" :key="item.cardKey" :label="item.displayNo" :value="item.cardKey">
        </el-option>
      </el-select>
      <el-input class="handle-input mr10 inputs" v-model="postForm.keyword" placeholder="发生事件" clearable></el-input>
      <el-select v-model="postForm.type" placeholder="变更方式" class="selects" clearable>
        <el-option v-for="item in changetypeOption" :key="item.value" :label="item.key" :value="item.value">
        </el-option>
      </el-select>
      <el-date-picker v-model="postForm.triggerStartTime" type="date" value-format="yyyy-MM-dd"
        @change="postForm.triggerEndTime = postForm.triggerStartTime" placeholder="选择日期" class="times">
      </el-date-picker>
      <el-button type="primary" class="serach-btn" @click="handleSearch" v-button-debounce>查找</el-button>
    </div>
    <div class="login-list">
      <el-table :data="tableData" border style="width: 100%" class="list-table" v-loading="loading">
        <el-table-column label="序号" width="55" align="center">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="积分变化" prop="score" width="100" align="center">
          <template slot-scope="scope">
            {{ scope.row.score > 0 ? '+' + scope.row.score : scope.row.score }}
          </template>
        </el-table-column>
        <el-table-column label="时间" prop="triggerTime" width="180" align="center">
          <template slot-scope="scope">
            {{ setTime(scope.row.triggerTime, '分') }}
          </template>
        </el-table-column>
        <el-table-column label="事件" prop="eventName"></el-table-column>
      </el-table>
    </div>
    <paging :pagedata="pageData" @pagechange="pageChange" v-if="pageData.totalCount"></paging>

  </div>
</template>
<script>
import http from "@/assets/public/js/http";
import paging from "@/components/admin/model/paging";
export default {
  props: ['id', 'userKey'],
  components: {
    paging
  },
  data() {
    return {
      loading: false,
      dataKey: null,
      changetypeOption: [
        { key: '加积分', value: 1 },
        { key: '减积分', value: -1 },
      ],
      pageData: {
        pageIndex: 1,
        pageSize: 20,
      },//分页参数
      tableData: [],//列表项
      postForm: {
        userKey: "",
      },
      integralData: null,
      cardData: [],
    }
  },
  async mounted() {
    // this.getKey();
    await this.getCardData();
    this.getList();
    this.getData();
  },
  methods: {
    // 获取用户读者卡信息
    async getCardData() {
      try {
        let res = await http.getJsonSelf('user-card-list-data', `/${this.id}`);
        let list = res.data || [];
        if (list.length) {
          let principal = list.find(item => item.isPrincipal) || {};
          this.postForm.userKey = principal.cardKey ? principal.cardKey : "";
        }
        this.cardData = list;
      } catch (err) {
        this.loading = false;
        this.$message({ type: 'error', message: '获取用户读者卡信息失败!' });
      }
    },
    // 获取数据
    getData() {
      http.getJsonSelf('reader-score-summary', `/${this.postForm.userKey}`).then(res => {
        this.integralData = res.data;
      }).catch(err => {
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    // 获取列表数据
    getList() {
      this.loading = true;
      http.getJson('reader-event-score-table-data', { ...this.postForm, ...this.pageData }).then(res => {
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
    // 查找
    handleSearch() {
      this.postForm.keyword = this.postForm.keyword != '' ? this.postForm.keyword : null;
      this.initGetList();
    },
    // 初始化分页数据 并刷新列表
    initGetList() {
      this.pageData = {
        pageIndex: 1,
        pageSize: 20,
      }
      this.getList();
      this.getData();
    },
  }
}
</script>
<style scoped>
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

/* /deep/ .el-table--border .el-table__cell {
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
} */
</style>