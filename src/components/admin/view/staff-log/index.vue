<!--
 * @Author: huyu
 * @Date: 2022-12-28 14:05:12
 * @LastEditors: gongqin
 * @LastEditTime: 2023-03-01 11:28:35
 * @Description: 馆员日志
-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse ? 'fold-menu' : ''">
        <serviceLMenu></serviceLMenu>
      </el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{ 'content-collapse': $root.collapse }">
        <breadcrumb></breadcrumb>
        <div class="content search-table-general">
          <div class="search-table-w">
            <h1 class="search-title">馆员日志</h1>
          </div>
          <div class="table-w">
            <div class="t-p">
              <div class="content-search-box">
                <!-- 类型、操作日期、操作人姓名 -->
                <el-form :inline="true" :model="searchForm" class="demo-form-inline">
                  <el-form-item label="">
                    <el-select style="width:150px" v-model="searchForm.operationType" placeholder="操作类型" clearable>
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="">
                    <el-select clearable v-model="searchForm.userKey" filterable remote reserve-keyword placeholder="操作人"
                      :remote-method="remoteMethod" :loading="loading">
                      <el-option v-for="item in userList" :key="item.id" :label="item.name"
                        :value="item.userKey"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="">
                    <el-date-picker clearable @change="handleTime" v-model="time" type="daterange"
                      value-format="yyyy-MM-dd" range-separator="-" start-placeholder="操作日期" end-placeholder="操作日期">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" size="medium" icon="iconfont el-icon-vip-fangdajing" @click="handleSearch"
                      v-button-debounce>查找</el-button>
                  </el-form-item>
                </el-form>
              </div>
              <el-table class="admin-table" :data="tableData" border stripe v-loading="loading">
                <el-table-column type="index" label="序号" width="70" align="center">
                  <template slot-scope="scope">
                    <span>{{ (pageData.pageIndex - 1) * pageData.pageSize + scope.$index + 1 }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="operationTime" label="发生时间" show-overflow-tooltip align="center">
                  <template slot-scope="scope">
                    {{ setTime(scope.row.operationTime, '分') }}
                  </template>
                </el-table-column>
                <el-table-column prop="userName" label="操作人姓名" show-overflow-tooltip align="center">
                </el-table-column>
                <el-table-column prop="userIP" label="登录IP" show-overflow-tooltip align="center">
                </el-table-column>
                <el-table-column prop="appName" label="操作模块" show-overflow-tooltip align="center">
                </el-table-column>
                <el-table-column prop="studentNo" label="学工号" show-overflow-tooltip align="center">
                </el-table-column>
                <el-table-column prop="showOperationType" label="操作" show-overflow-tooltip align="center">
                </el-table-column>
                <el-table-column prop="content" label="说明" align="center" width="120">
                  <template slot-scope="scope">
                    <el-button @click="handleDetail(scope.row)" type="text" size="mini" icon="iconfont el-icon-vip-yulan"
                      round>查看</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <Paging :pagedata="pageData" @pagechange="pageChange" v-if="pageData.totalCount"></Paging>
            </div>
          </div>
        </div>
        <footerPage class="top20"></footerPage>
      </el-main>
    </el-container>
    <DialogDetail ref="DialogDetail"></DialogDetail>
  </div>
</template>

<script>
import breadcrumb from "@/components/admin/model/breadcrumb";
import serviceLMenu from "@/components/admin/model/serviceLMenu_user";
import Paging from "@/components/admin/model/paging";
import DialogDetail from '@/components/admin/view/staff-log/components/DialogDetail';
export default {
  components: {
    breadcrumb,
    serviceLMenu,
    Paging,
    DialogDetail
  },
  props: {},
  data() {
    return {
      loading: false,//等待框
      options: [
        { label: '新增', value: '1' },
        { label: '删除', value: '2' },
        { label: '修改', value: '3' },
        { label: '审核', value: '4' },
        { label: '全部', value: '5' },
      ],
      userList: [],
      searchForm: {
        operationType: '',
        startTime: '',
        endTime: '',
        keyword: '',
      },//检索项
      time: [],
      tableData: [],//列表项
      pageData: {
        pageIndex: 1,
        pageSize: 20,
        totalCount: 0
      },//分页参数
    };
  },
  created() { },
  mounted() {
    this.getList();
  },
  methods: {
    // 搜索用户
    remoteMethod(query) {
      if (query !== '') {
        this.$http.getJson('user-select-list-data', { keyword: query, pageIndex: 1, pageSize: 20, isStaff: true }).then(res => {
          this.userList = res.data.items;
        }).catch(err => {
          this.$message({ type: 'error', message: '获取用户失败!' });
        })
      } else {
        this.options = [];
      }
    },
    handleTime() {
      this.searchForm.startTime = this.time ? this.time[0] : '';
      this.searchForm.endTime = this.time ? this.time[1] : '';
    },
    // 获取列表数据
    getList() {
      this.loading = true;
      this.$http.getJson('staff-log-table-data', {
        ...this.searchForm,
        ...this.pageData
      }).then(res => {
        this.tableData = res.data.items;

        //分页所需  数据总条数
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
    // 搜索
    handleSearch() {
      this.pageData.pageIndex = 1;
      this.getList();
    },
    handleDetail(row) {
      this.$refs.DialogDetail.show(row.content)
    }
  },
};
</script>

<style scoped lang="less"></style>

