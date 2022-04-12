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
            <h1 class="search-title">用户列表</h1>
            <div class="user-top-box">
              <div class="title"><span>{{briefInfo.name}}</span></div>
              <div class="top-number">
                <p>{{briefInfo.count}}人<span>|</span>{{briefInfo.percent|showPercent}}</p>
                <p class="total">总人数{{briefInfo.totalCount}}</p>
              </div>
              <el-popover placement="top" width="160" v-model="visible">
                <template v-if="briefInfo.sourceFrom==1"><span>手动创建</span></template>
                <template v-else>
                  <span :key="index" v-for="(rule,index) in briefInfo.rules">{{rule.propertyName}}{{rule.compareType?'等于':'不等于'}}{{rule.propertyValue}}{{rule.unionWay?'与':'或'}}</span>
                </template>
                <div class="look" slot="reference">
                  <i class="el-icon-question"></i>
                  <span>查看用户组规则</span>
                </div>
              </el-popover>
              <div style="width:15em">更新时间：{{setTime(briefInfo.lastSyncTime,'分')}}</div>
            </div>
          </div>
          <!--顶部查询 end-->
          <div class="table-w">
            <h2 class="m-title">
              <div class="search-term" style="float:left" v-if="dataKey">
                <el-input v-model="postForm.Name" placeholder="姓名" style="width:180px" clearable></el-input>
                <el-input v-model="postForm.CardNo" placeholder="读者卡号" style="width:180px" clearable></el-input>
                <el-input v-model="postForm.StudentNo" placeholder="学号" style="width:180px" clearable></el-input>
                <!-- <el-date-picker v-model="postForm.CreateStartTime" type="date" placeholder="创建日期" style="width:180px" @change="postForm.CreateEndTime = postForm.CreateStartTime"></el-date-picker> -->
                <el-button type="primary" size="medium" icon="iconfont el-icon-vip-fangdajing" @click="handSearch">查找</el-button>
              </div>
              <div class="r-btn">
                <el-button size="medium" type="primary" @click="handMathChange">批量修改</el-button>
                <el-button size="medium" type="primary" class="admin-red-btn" @click="handMathDel">批量移除</el-button>
                <el-button type="primary" size="medium" class="blue-btn" @click="handAdd">添加用户</el-button>
                <el-button type="primary" size="medium" @click="exportExcel">导出数据</el-button>
                <!-- <el-button type="primary" size="medium" @click="importExcel">发送信息</el-button> -->
              </div>
            </h2>
            <div class="t-p">
              <el-table v-loading="loading" @selection-change="handleSelectionChange" v-if="dataKey" ref="singleTable" stripe :data="tableData" border :header-cell-style="{background:'#F1F3F7'}" class="admin-table">
                <el-table-column type="selection" width="45"></el-table-column>
                <!-- <el-table-column type="index" width="50" align="center" label="序号"></el-table-column> -->
                <el-table-column prop="name" label="姓名" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="cardNo" label="读者卡号" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="studentNo" label="学号" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="type" label="用户类型" align="center" show-overflow-tooltip>
                  <template slot-scope="scope">
                    {{getKeyValue('User_Type',scope.row.type)}}
                  </template>
                </el-table-column>
                <el-table-column prop="idCard" label="身份证" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="status" label="状态" align="center" show-overflow-tooltip>
                  <template slot-scope="scope">
                    {{getKeyValue('User_Status',scope.row.status)}}
                  </template>
                </el-table-column>
                <el-table-column prop="sourceFrom" label="用户来源" align="center" show-overflow-tooltip>
                  <template slot-scope="scope">
                    {{getKeyValue('User_SourceFrom',scope.row.sourceFrom)}}
                  </template>
                </el-table-column>
                <el-table-column prop="createTime" label="添加日期" align="center" show-overflow-tooltip>
                  <template slot-scope="scope">
                    {{setTime(scope.row.createTime)}}
                  </template>
                </el-table-column>
                <!-- <el-table-column prop="createTime" label="截止日期">
                  <template slot-scope="scope">
                    {{setTime(scope.row.createTime)}}
                  </template>
                </el-table-column> -->
                <el-table-column prop="content" label="操作" width="260">
                  <template slot-scope="scope">
                    <el-button @click="handleLook(scope.row)" type="text" size="mini" icon="iconfont el-icon-vip-yulan" round>查看</el-button>
                    <!-- <el-button @click="handleSet(scope.row)" type="text" size="mini" icon="el-icon-edit" round>用户画像</el-button> -->
                  </template>
                </el-table-column>
              </el-table>
              <paging :pagedata="pageData" @pagechange="pageChange" v-if="pageData.totalCount"></paging>
            </div>
          </div>
          <!--管理页列表 end--->
          <someChange ref="someChange" :dataKey="dataKey" :userList="multipleSelection"></someChange>
          <dialog_export ref="dialog_export"></dialog_export>
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
import dialog_export from '../model/dialog_export';
import someChange from '../model/some_change';

export default {
  name: 'index',
  created() {
    // bus.$on('collapse', msg => {
    //   this.$root.collapse = msg;
    //   this.$forceUpdate();
    // })
  },
  components: { footerPage, serviceLMenu, breadcrumb, paging, dialog_export, someChange },
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
      id: this.$route.query.id,
      sourceFrom: this.$route.query.sourceFrom,
      briefInfo: {},
      multipleSelection:[]
    }
  },
  filters: {
    showPercent(val) {
      return (Number(val || 0) * 100).toFixed(2) + '%';
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      //   this.getSysAttr()
      this.getKey();
      this.getBriefInfo();
      this.getList();
    },
    // 获取初始数据
    getKey() {
      http.getJson('user-group-init-data').then(res => {
        this.dataKey = res.data;
      }).catch(err => {
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    getBriefInfo() {
      http.getJsonSelf('user-group-brief-info', `/${this.id}`).then(res => {
        this.briefInfo = res.data;
      }).catch(err => {
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    // 获取列表数据
    getList() {
      this.loading = true;
      http.getJson('basic-user-table-data', { GroupID: this.id, ...this.postForm, ...this.pageData }).then(res => {
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
      let curItem = this.dataKey.groupSelect.find((item) => (item.groupCode == code));
      let curItems = curItem.groupItems.find((item) => (item.value == val));
      return curItems ? curItems.key : '';
    },
    // 查找
    handSearch() {
      this.initGetList();
    },
    // 查看
    handleLook(row) {
      this.$router.push({ path: '/admin_readerManagement', query: { id: row.id } })
    },
    // 添加用户
    handAdd() {
      if (this.sourceFrom == 0) {
        this.$router.push({ path: '/admin_ruleCreat', query: { id: this.id } })
      } else {
        this.$router.push({ path: '/admin_handCreat', query: { id: this.id } })
      }
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 批量修改
    handMathChange() {
      if (!this.multipleSelection.length) {
        this.$message({
          message: '请勾选需要修改的读者！',
          type: 'warning'
        })
        return;
      }
      this.$refs.someChange.show();
    },
    /** 批量删除 */
    handMathDel() {
      if (this.multipleSelection && this.multipleSelection.length) {
        this.$confirm('请谨慎执行删除操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let ids = this.multipleSelection.map(value => {
            return value.id
          })
          http.deleteJson('group-users', { groupId: this.id, userIds: ids }).then(res => {
            this.getList();
            this.$message({ type: 'success', message: '删除成功!' });
          }).catch(err => {
            this.$message({ type: 'error', message: '删除失败!' });
          })
        }).catch(() => {
          this.$message({ type: 'info', message: '已取消删除!' });
        });
      } else {
        this.$message({
          message: '请选择用户后操作',
          type: 'warning'
        });
      }
    },
    //导出excel
    exportExcel() {
      this.postForm.groupID = this.id;
      this.$refs.dialog_export.show(this.postForm, this.pageData, 'reader')
    },
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
      background: @6777EF;
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
    color: @6777EF;
    cursor: pointer;
    width: 180px;
  }
}
</style>
