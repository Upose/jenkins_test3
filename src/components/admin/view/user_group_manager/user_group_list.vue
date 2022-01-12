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
            <h1 class="search-title">用户组管理</h1>
            <div class="search-term" v-if="dataKey">
              <el-input v-model="postForm.keyWord" placeholder="用户组名称" style="width:180px"></el-input>
              <el-date-picker v-model="postForm.CreateStartTime" type="date" placeholder="创建日期" style="width:180px" @change="postForm.CreateEndTime = postForm.CreateStartTime"></el-date-picker>
              <el-button type="primary" size="medium" icon="el-icon-search" @click="handSearch">查找</el-button>
            </div>
          </div>
          <!--顶部查询 end-->
          <div class="table-w">
            <h2 class="m-title">
              <div class="r-btn">
                <el-button type="primary" size="medium" class="blue-btn" @click="handAdd('/admin_ruleCreat')" v-if="isAuth('userGroup:create')">规则新建用户组</el-button>
                <el-button type="primary" size="medium" class="blue-btn" @click="handAdd('/admin_handCreat')" v-if="isAuth('userGroup:create')">手动新建用户组</el-button>
              </div>
            </h2>
            <div class="t-p">
              <el-table @selection-change="handleSelectionChange" v-if="dataKey" ref="singleTable" stripe :data="isAuth('userGroup:list')?tableData:[]" border :header-cell-style="{background:'#F1F3F7'}" class="admin-table">
                <el-table-column type="index" width="50" align="center" label="序号"></el-table-column>
                <el-table-column prop="name" label="用户组名称"></el-table-column>
                <el-table-column prop="userCount" label="读者数"></el-table-column>
                <el-table-column prop="sourceFrom" label="用户来源">
                  <template slot-scope="scope">
                    {{getKeyValue(scope.row.sourceFrom)}}
                  </template>
                </el-table-column>
                <el-table-column prop="createUserName" label="创建人"></el-table-column>
                <el-table-column prop="createTime" label="创建时间">
                  <template slot-scope="scope">
                    {{setTime(scope.row.createTime,'分')}}
                  </template>
                </el-table-column>
                <el-table-column prop="content" label="操作" width="300">
                  <template slot-scope="scope">
                    <el-button @click="handleDel(scope.row)" type="text" size="mini" icon="el-icon-delete" class="operate-red-btn" round v-if="isAuth('userGroup:delete')">删除</el-button>
                    <el-button @click="handleSet(scope.row)" type="text" size="mini" icon="el-icon-edit" round v-if="isAuth('userGroup:update')">编辑</el-button>
                    <el-button @click="handleUser(scope.row)" type="text" size="mini" icon="el-icon-edit" round v-if="isAuth('userGroup:userList')">用户列表</el-button>
                    <!-- <el-button @click="handleSet(scope.row)" type="text" size="mini" icon="el-icon-edit" round>用户画像</el-button> -->
                  </template>
                </el-table-column>

              </el-table>
              <!--<el-button size="small" class="default-btn-n-border next-btn">下一页</el-button>-->
              <paging :pagedata="pageData" @pagechange="pageChange" v-if="pageData.totalCount"></paging>
            </div>
          </div>
          <!--管理页列表 end--->

        </div>
        <!---顶部查询板块 end--->
        <footerPage class="top20"></footerPage>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import bus from '@/assets/public/js/bus';
import http from "@/assets/public/js/http";
import footerPage from "@/components/admin/common/footer";
import breadcrumb from "@/components/admin/model/breadcrumb";
import paging from "@/components/admin/model/paging";
import serviceLMenu from "@/components/admin/model/serviceLMenu_user";

export default {
  name: 'index',
  created() {
    bus.$on('collapse', msg => {
      this.$root.collapse = msg;
      this.$forceUpdate();
    })
  },
  components: { footerPage, serviceLMenu, breadcrumb, paging },
  data() {
    return {
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
    // 页面子权限判定
    isAuth(name){
      let authList = this.$store.getters.authList;
      let curAuth = authList.find(item=>(item.router == '/admin_userGroupList'));
      // let curAuth = authList.find(item=>(item.router == this.$route.path));
      let curSonAuth = curAuth ? curAuth.permissionNodes.find(item=>(item.permission==name)) : null;
      return curSonAuth?true:false;
    },
    initData() {
      //   this.getSysAttr()
      this.getKey();
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
    // 获取列表数据
    getList() {
      http.getJson('group-table-data', { ...this.postForm, ...this.pageData }).then(res => {
        this.tableData = res.data.items;

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
    // 数据处理
    getKeyValue(val) {
      let value = '';
      // let curItem = this.dataKey.sourceFrom.find((item) => (item == val));
      for (const item in this.dataKey.sourceFrom) {
        if (this.dataKey.sourceFrom[item] == val) {
          value = item;
        }
      }
      return value;
    },
    // 查找
    handSearch() {
      this.initGetList();
    },
    // 编辑
    handleSet(row) {
      if (row.sourceFrom == 0) {
        this.$router.push({ path: '/admin_ruleCreat', query: { id: row.id } })
      }else{
        this.$router.push({ path: '/admin_handCreat', query: { id: row.id } })
      }
    },
    // 删除
    handleDel(row) {
      this.$confirm('请谨慎执行删除操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        http.deleteJsonSelf('user-group', `/${row.id}`).then(res => {
          this.getList();
          this.$message({ type: 'success', message: '删除成功!' });
        }).catch(err => {
          console.log(err);
        })
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除!' });
      });
    },

    /** 新增读者 */
    handAdd(path) {
      // this.$router.push('/ruleCreat');
      this.$router.push(path);
    },
    // 用户列表
    handleUser(row){
      this.$router.push({path:'/admin_userList',query:{id:row.id,sourceFrom:row.sourceFrom}})
    }
  },
}
</script>

<style lang="less" scoped>
@import "../../../../assets/admin/css/color.less"; /**颜色配置 */
@import "../../../../assets/admin/css/form.less";
</style>
