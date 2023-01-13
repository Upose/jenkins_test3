<template>
  <div v-loading="loading">
    <div class="auth-title">应用授权</div>
    <div class="auth-box">
      <div class="auth-box-child" v-for="item in tableData.filter(x=>x.type==0)" :key="item">
        <div class="bgs flex-row-center"><img :src="fileUrl+item.icon" /></div>
        <span>{{item.appName}}</span>
      </div>
    </div>
    <div class="auth-title">馆员授权</div>
    <div class="auth-box">
      <div class="auth-box-child" v-for="item in tableData.filter(x=>x.type==1)" :key="item">
        <div class="bgs flex-row-center"><img :src="fileUrl+item.icon" /></div>
        <span>{{item.appName}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import http from "@/assets/public/js/http";
export default {
  data() {
    return {
      loading: true,
      fileUrl: localStorage.getItem('fileUrl'),
      dataKey: null,
      pageData: {
        pageIndex: 1,
        pageSize: 20,
      },//分页参数
      tableData: [],//列表项
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
      http.getJson('user-auth-app-list-data', { userID: this.id }).then(res => {
        this.borrowData = res.data;
        let list = res.data || [];
        this.tableData = list;
        this.loading = false;
      }).catch(err => {
        this.loading = false;
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
  }
}
</script>
<style scoped>
.bgs {
  width: 58px;
  height: 58px;
  background: #f1eeff;
  border-radius: 15px;
  text-align: center;
  line-height: 58px;
  float: left;
}
.child-img {
  width: 58px;
  height: 58px;
  float: left;
  border-radius: 15px;
}
.huangse {
  background: #fff4e3;
}
.lvse {
  background: #dcf6f1;
}
.lanse {
  background: #e3f2ff;
}
.hongse {
  background: #fff1f8;
}
.bgs img {
  width: 31px;
  height: 29px;
  /* margin: 12px auto 0; */
}
.auth-title {
  width: 100%;
  display: table;
  margin: 1% auto;
  color: #6c757d;
  font-size: 15px;
}
.auth-box {
  width: 100%;
  display: table;
  margin: 1.2% auto;
}
.auth-box-child {
  width: 25%;
  float: left;
  margin: 0 0 20px 0;
}
.auth-box-child span {
  color: #34395e;
  font-size: 14px;
  margin: 5% 0 0 3%;
  display: block;
  float: left;
}
</style>