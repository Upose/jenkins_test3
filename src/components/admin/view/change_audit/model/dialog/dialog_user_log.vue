<template>
  <el-dialog append-to-body title="修改日志记录" :visible.sync="dialogVisible" width="1000px" :before-close="dialogBeforeClose">
    <!-- <div class="form-box">
      <el-form ref="form" :model="postFrom" label-width="0px">
        <el-form-item label="">
          <el-input v-model="postFrom.keyword" size="medium" placeholder="请输入搜索内容" style="width:80%"></el-input>
          <el-button type="primary" size="medium" icon="iconfont el-icon-vip-fangdajing" @click="getList">搜索</el-button>
        </el-form-item>
      </el-form>
    </div> -->
    <div style="width:40%;display: inline-block;vertical-align: top;margin-right:2%">
      <el-table v-loading="loading" :data="userList" class="admin-table" border :header-cell-style="{background:'#F1F3F7'}" stripe height="600px" @row-click="handleGetLog">
        <el-table-column prop="studentNo" label="读者账号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="name" label="读者姓名" show-overflow-tooltip></el-table-column>
        <el-table-column prop="collegeName" label="院系" show-overflow-tooltip></el-table-column>
        <!-- <el-table-column label="" align="center" width="80">
          <template slot-scope="scope">
            <el-button @click="handleGetLog(scope.row)" type="text" size="mini" round>查看</el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <div style="width:56%;display: inline-block;">
      <el-table v-loading="loading1" :data="tableData" class="admin-table" border :header-cell-style="{background:'#F1F3F7'}" stripe height="600px">
        <el-table-column prop="fieldCode" label="字段编码" show-overflow-tooltip></el-table-column>
        <el-table-column prop="fieldName" label="字段名称" show-overflow-tooltip></el-table-column>
        <el-table-column label="类型">
          <template slot-scope="scope">
            <span>{{ getKeyValue('propertyLogType',scope.row.changeType) }}</span>
            <!-- <span>{{ scope.row.changeType }}</span> -->
          </template>
        </el-table-column>
        <el-table-column prop="oldValue" label="原值">
          <template slot-scope="scope">
            <span v-if="scope.row.fieldCode=='User_Photo'"><img class="tabl-img" :src="fileUrl+scope.row.oldValue" alt=""></span>
            <span v-else>{{scope.row.oldValue}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="newValue" label="新值">
          <template slot-scope="scope">
            <span v-if="scope.row.fieldCode=='User_Photo'"><img class="tabl-img" :src="fileUrl+scope.row.newValue" alt=""></span>
            <span v-else>{{scope.row.newValue}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- <paging :pagedata="pageData" @pagechange="pageChange" v-if="pageData.totalCount"></paging> -->
  </el-dialog>
</template>
<script>
import http from "@/assets/public/js/http";
// import paging from "@/components/admin/model/paging";

export default {
  name: 'preview',
  props: ['dataKey'],
  data() {
    return {
      fileUrl: localStorage.getItem('fileUrl'),
      loading:false,
      loading1:false,
      dataKey: sessionStorage.getItem('user_dataKey'),
      dialogVisible: false,
      name: '',
      pageData: {
        pageIndex: 1,
        pageSize: 10,
      },//分页参数
      tableData: [],//列表项
      userList: [],
      postFrom: {
        // keyword: '',
        // sortField: '',
        // IsAsc: '',
      }
    }
  },
  // components: { paging },
  mounted() {
  },
  methods: {
    // 显示弹窗
    show(type, logid) {
      this.type = type;
      this.logid = logid;
      this.getList();
      this.dialogVisible = true;
    },
    // 获取列表数据
    getList() {
      this.loading = true;
      this.loading1 = true;
      http.getJsonSelf('user-change-log-detail-info', `/${this.logid}`).then(res => {
        this.tableData = res.data.details;
        this.userList = res.data.users;
        this.loading = false;
        this.loading1 = false;
      }).catch(err => {
        this.loading = false;
        this.loading1 = false;
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    // 获取其他日志
    handleGetLog(row) {
      this.loading1 = true;
      http.getJsonSelf('user-change-log-detail-items', `/${this.logid}/${row.id}`).then(res => {
        this.tableData = res.data;
        this.loading1 = false;
      }).catch(err => {
        this.loading1 = false;
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    // 键值对匹配
    getKeyValue(name, val) {
      for (const key in this.dataKey[name]) {
        if (this.dataKey[name][key] == val) {
          return key;
        }
      }
    },
  },
}
</script>
<style lang="less" scoped>
@import "../../../../../../assets/admin/css/color.less"; /**颜色配置 */
@import "../../../../../../assets/admin/css/form.less";

.name {
  padding: 10px;
  font-size: 16px;
}
.form-box {
  margin-bottom: 10px;
}
.tabl-img{
  width: 50px;
  height: 50px;
}
</style>