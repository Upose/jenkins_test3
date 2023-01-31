<!---数据库导航-总导航管理-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse?'fold-menu':''">
        <serviceLMenu :isActive="6"></serviceLMenu>
      </el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{'content-collapse':$root.collapse}">
        <breadcrumb :cuMenu="'总导航管理'" :fontColor="'fff'"></breadcrumb>
        <!--面包屑导航--->
        <div class="content search-table-general">
          <div class="search-table-w">
            <h1 class="search-title"><span class="tab-nav" @click="$router.push('/admin_readerCardList')">读者卡管理</span><span class="tab-nav current">同步日志</span></h1>
          </div>
          <!--顶部查询 end-->
          <div class="table-w">
            <h2 class="m-title">
              <!-- <div class="search-term" style="float:left">
                <el-input v-model="postForm.Name" placeholder="姓名" style="width:180px" clearable></el-input>
                <el-button type="primary" size="medium" icon="iconfont el-icon-vip-fangdajing" @click="handSearch">查找</el-button>
              </div> -->
              <div class="r-btn">
                <el-button type="primary" size="medium" @click="$refs.dialog_set.show()" v-has="'card:increatSync'">同步配置</el-button>
              </div>
            </h2>
            <div class="t-p">
              <el-table v-loading="loading" @selection-change="handleSelectionChange" v-if="dataKey" ref="singleTable" stripe :data="tableData" border :header-cell-style="{background:'#F1F3F7'}" class="admin-table">
                <el-table-column label="同步日期" align="center" show-overflow-tooltip>
                  <template slot-scope="scope">
                    {{setTime(scope.row.syncStartTime,'分')}}
                  </template>
                </el-table-column>
                <el-table-column prop="syncType" label="同步类型" align="center" show-overflow-tooltip>
                  <template slot-scope="scope">
                    {{getKeyValue('syncCardType',scope.row.syncType)}}
                  </template>
                </el-table-column>
                <el-table-column prop="status" label="同步状态" align="center" show-overflow-tooltip>
                  <template slot-scope="scope">
                    {{getKeyValue('syncCardLogStatus',scope.row.status)}}
                  </template>
                </el-table-column>
                <el-table-column prop="content" label="同步结果" width="140" align="center">
                  <template slot-scope="scope">
                    <el-button @click="handleDetail(scope.row)" type="text" size="mini" icon="iconfont el-icon-vip-yulan" round>查看</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <paging :pagedata="pageData" @pagechange="pageChange" v-if="pageData.totalCount"></paging>
            </div>
          </div>
          <!--管理页列表 end--->
          <!-- 组件 -->
          <dialog_set ref="dialog_set"></dialog_set>
          <dialog_detail ref="dialog_detail"></dialog_detail>
        </div>
        <!---顶部查询板块 end--->
        <footerPage class="top20"></footerPage>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// import bus from '@/assets/public/js/bus';;
import http from "@/assets/public/js/http";
import footerPage from "@/components/admin/common/footer";
import breadcrumb from "@/components/admin/model/breadcrumb";
import paging from "@/components/admin/model/paging";
import serviceLMenu from "@/components/admin/model/serviceLMenu_user";
import dialog_set from './model/dialog_set'
import dialog_detail from './model/dialog_detail'

export default {
  name: 'index',
  created() {
    // bus.$on('collapse', msg => {
    //   this.$root.collapse = msg;
    //   this.$forceUpdate();
    // })
  },
  components: { footerPage, serviceLMenu, breadcrumb, paging, dialog_set, dialog_detail },
  data() {
    return {
      loading: false,
      dataKey: null,
      postForm: {},//列表查询参数
      pageData: {
        pageIndex: 1,
        pageSize: 20,
      },//分页参数
      tableData: [],//列表项
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.getKey();
      this.getList();
    },
    // 获取初始数据
    getKey() {
      http.getJson('card-init-data').then(res => {
        this.dataKey = res.data;
      }).catch(err => {
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    // 获取列表数据
    getList() {
      this.loading = true;
      http.getJson('sync-card-log-table-data', { ...this.postForm, ...this.pageData }).then(res => {

        this.tableData = res.data.items;

        //分页所需  数据总条数
        this.pageData.totalCount = res.data.totalCount;
        this.loading = false;
      }).catch(err => {
        this.loading = false;
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
    // 数据处理
    getKeyValue(code, val) {
      let obj = this.dataKey[code];
      for (const item in obj) {
        if (obj[item] == val) {
          return item;
        }
      }
    },
    // 查找
    handSearch() {
      this.initGetList();
    },
    // 查看
    handleDetail(row) {
      this.$refs.dialog_detail.show(row.contentInfo);
    }
  },
}
</script>

<style lang="less" scoped>
@import "../../../../assets/admin/css/color.less"; /**颜色配置 */
@import "../../../../assets/admin/css/form.less";

.user-top-box {
  display: flex;
  align-items: center;
  margin-left: 40px;
  padding: 10px 0;

  div {
    width: 150px;
  }
  .title {
    padding-right: 12px;
    span {
      padding: 10px 15px;
      color: #fff;
      background: @m-col-b7;
      border-radius: 5px;
      display: inline-block;
      width: 100%;
      text-align: center;
    }
  }
  .top-number {
    span {
      padding: 0 10px;
    }
    .total {
      color: #666;
      font-size: 12px;
    }
  }
  .look {
    color: @m-col-b7;
    cursor: pointer;
    width: 180px;
  }
}
.search-table-w .search-title .tab-nav {
  font-size: 18px;
  cursor: pointer;
  margin-right: 40px;
  padding-bottom: 10px;
}
.search-table-w .search-title .current {
  border-bottom: 2px solid @m-col-b7;
}
</style>
