<template>
  <div>
    <div class="box-title">
      <el-input class="handle-input duzhe" v-model="name" placeholder="馆员姓名"></el-input>
      <el-select v-model="types" placeholder="操作类型" class="selects">
        <el-option v-for="item in typesOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-date-picker v-model="times" value-format="yyyy-MM-dd" type="date" placeholder="操作时间">
      </el-date-picker>
      <el-button type="primary" class="searchs" v-button-debounce>
        <i class="iconfont el-icon-vip-fangdajing"></i>
        <span>查找</span>
      </el-button>
    </div>
    <div>
      <el-table :data="tableData" border style="width: 100%" class="list-table">
        <el-table-column label="序号" width="55" align="center">
          <template slot-scope="scope">
            {{scope.$index+1}}
          </template>
        </el-table-column>
        <el-table-column label="产生时间" prop="name"></el-table-column>
        <el-table-column label="用户名称" prop="derp"></el-table-column>
        <el-table-column label="登录IP" prop="zhicheng"></el-table-column>
        <el-table-column label="功能模块" prop="phone"></el-table-column>
        <el-table-column label="操作" fixed="right" prop="number"></el-table-column>
        <el-table-column label="说明" prop="jobNumber"></el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination background :current-page="pageNum" :page-size="pageSize" :total="pageTotal" :page-sizes="[10, 50, 100]" @size-change="handleSizeChange" layout="total,sizes,prev, pager, next" @current-change="handlePageChange"></el-pagination>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      types: "",
      times: "",
      typesOptions: [{
        value: 1,
        label: "操作类型"
      }],
      pageNum: 1,
      pageSize: 10,
      pageTotal: 0,
      zhuce: "1",
      tableData: [{
        name: "李四",
        derp: "技术",
        zhicheng: "部门职称",
        phone: "15896989699",
        number: "3634634",
        jobNumber: "je2352",
        status: "开通",
        date: "2021-09-21",
        role: "超级管理员"
      }, {
        name: "张三",
        derp: "技术",
        zhicheng: "部门职称",
        phone: "15896989699",
        number: "3634634",
        jobNumber: "je2352",
        status: "开通",
        date: "2021-09-21",
        role: "普通管理员"
      }, {
        name: "张三",
        derp: "技术",
        zhicheng: "部门职称",
        phone: "15896989699",
        number: "3634634",
        jobNumber: "je2352",
        status: "开通",
        date: "2021-09-21",
        role: "普通管理员"
      }, {
        name: "张三",
        derp: "技术",
        zhicheng: "部门职称",
        phone: "15896989699",
        number: "3634634",
        jobNumber: "je2352",
        status: "开通",
        date: "2021-09-21",
        role: "普通管理员"
      }, {
        name: "张三",
        derp: "技术",
        zhicheng: "部门职称",
        phone: "15896989699",
        number: "3634634",
        jobNumber: "je2352",
        status: "开通",
        date: "2021-09-21",
        role: "普通管理员"
      }, {
        name: "张三",
        derp: "技术",
        zhicheng: "部门职称",
        phone: "15896989699",
        number: "3634634",
        jobNumber: "je2352",
        status: "开通",
        date: "2021-09-21",
        role: "普通管理员"
      }, {
        name: "张三",
        derp: "技术",
        zhicheng: "部门职称",
        phone: "15896989699",
        number: "3634634",
        jobNumber: "je2352",
        status: "开通",
        date: "2021-09-21",
        role: "普通管理员"
      }, {
        name: "张三",
        derp: "技术",
        zhicheng: "部门职称",
        phone: "15896989699",
        number: "3634634",
        jobNumber: "je2352",
        status: "开通",
        date: "2021-09-21",
        role: "普通管理员"
      }, {
        name: "张三",
        derp: "技术",
        zhicheng: "部门职称",
        phone: "15896989699",
        number: "3634634",
        jobNumber: "je2352",
        status: "开通",
        date: "2021-09-21",
        role: "普通管理员"
      }, {
        name: "张三",
        derp: "技术",
        zhicheng: "部门职称",
        phone: "15896989699",
        number: "3634634",
        jobNumber: "je2352",
        status: "开通",
        date: "2021-09-21",
        role: "普通管理员"
      }],
    }
  },
  methods: {

  }
}
</script>
<style scoped>
.duzhe,
.selects {
  width: 15% !important;
  margin-right: 1.5%;
}
.box-title {
  width: 100%;
  display: table;
  margin: 1.5% 0 2.5% 0;
}
.searchs {
  background: #6777ef;
  border: 0;
  width: 88px;
  padding: 12px 15px;
  margin-left: 2%;
}
.searchs i,
.searchs span {
  display: block;
  float: left;
  color: #fff;
}
.searchs span {
  font-size: 14px;
  margin-left: 10px;
  display: block;
}

.pagination {
  float: right;
  margin-top: 1%;
  padding: 1% 0 3% 0;
}
</style>