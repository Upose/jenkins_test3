<!--
 * @Author: huyu
 * @Date: 2022-05-18 10:29:18
 * @LastEditors: huyu
 * @LastEditTime: 2022-05-27 10:52:00
 * @Description: 标签列表
-->
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
            <h1 class="search-title">标签管理</h1>
          </div>
          <!--顶部查询 end-->
          <div class="table-w">
            <div class="t-p">
              <div class="list-box">
                <div class="nav-list">
                  <el-menu class="el-menu-vertical-demo">
                    <el-submenu :index="index" v-for="(item,index) in tagGroup" :key="item.id">
                      <span slot="title">{{item.name}}</span>
                      <el-menu-item-group v-if="item.groupList.length">
                        <el-menu-item @click="handleCategory(item1.id)" :index="item1.id" v-for="(item1) in item.groupList" :key="item1.id">{{item1.name}}</el-menu-item>
                      </el-menu-item-group>
                    </el-submenu>
                  </el-menu>
                </div>
                <div class="table-list">
                  <el-table ref="singleTable" stripe :data="isAuth('userTag:list')?tableData:[]" border class="admin-table" v-loading="loading">
                    <el-table-column type="index" width="50" align="center" label="序号"></el-table-column>
                    <el-table-column prop="name" label="标签名"></el-table-column>
                    <el-table-column prop="sourceFrom" label="用户数">
                      <template slot-scope="scope">
                        {{scope.row.userCount}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="lastSyncTime" label="最近计算时间" align="center">
                      <template slot-scope="scope">
                        {{setTime(scope.row.lastSyncTime,'分')}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="status" label="是否启用" align="center" v-if="isAuth('userTag:toogleTagStatus')">
                      <template slot-scope="scope">
                        <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0" @change="handleCangeStatus(scope.row)"></el-switch>
                      </template>
                    </el-table-column>
                    <el-table-column prop="content" label="操作" fixed="right" width="250" align="center">
                      <template slot-scope="scope">
                        <el-button @click="handleDel(scope.row)" type="text" size="mini" icon="iconfont el-icon-vip-shanchu-1" class="operate-red-btn" round v-if="isAuth('userTag:delete')">删除</el-button>
                        <!-- <el-button @click="handleSet(scope.row)" type="text" size="mini" icon="iconfont el-icon-vip-bianji" round v-if="isAuth('userTag:update')">编辑</el-button> -->
                        <el-button @click="handleUser(scope.row)" type="text" size="mini" icon="el-icon-tickets" round v-if="isAuth('userTag:userList')">用户列表</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
              <!-- <paging :pagedata="pageData" @pagechange="pageChange" v-if="pageData.totalCount"></paging> -->
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
// import bus from '@/assets/public/js/bus';;
import http from "@/assets/public/js/http";
import footerPage from "@/components/admin/common/footer";
import breadcrumb from "@/components/admin/model/breadcrumb";
import paging from "@/components/admin/model/paging";
import serviceLMenu from "@/components/admin/model/serviceLMenu_user";

export default {
  name: 'index',
  created() {
  },
  components: { footerPage, serviceLMenu, breadcrumb, paging },
  data() {
    return {
      loading: false,
      tagGroup: [],
      postForm: {
        tagGroupId: ''
      },//列表查询参数
      pageData: {
        pageIndex: 1,
        pageSize: 10000,
      },//分页参数
      tableData: [],//列表项
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    // 页面子权限判定
    isAuth(name) {
      let authList = this.$store.getters.authList;
      let curAuth = authList.find(item => (item.router == '/admin_userTagList'));
      // let curAuth = authList.find(item=>(item.router == this.$route.path));
      let curSonAuth = curAuth ? curAuth.permissionNodes.find(item => (item.permission == name)) : null;
      return curSonAuth ? true : false;
    },
    initData() {
      this.getTagGroup()
      this.getList();
    },
    // 获取一级侧边栏
    getTagGroup() {
      http.getJson('tag-category-data').then(res => {
        this.tagGroup = res.data;
      }).catch(err => {
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    // 获取列表数据
    getList() {
      this.loading = true;
      http.getJson('tag-table-data', { ...this.postForm, ...this.pageData }).then(res => {
        this.tableData = res.data.items;
        this.loading = false;
      }).catch(err => {
        this.loading = false;
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    handleCategory(id) {
      this.postForm.tagGroupId = id;
      this.getList();
    },
    // 修改状态
    handleCangeStatus(row) {
      http.postJson('toggle-tag-status', {
        "id": row.id,
        "status": row.status
      }).then(res => {
        this.$message.success(row.status == 1 ? '启用成功！' : '禁用成功！');
      }).catch(err => {
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },

    // 编辑
    handleSet(row) {
      if (row.sourceFrom == 0) {
        this.$router.push({ path: '/admin_ruleCreat', query: { id: row.id } })
      } else {
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
        http.deleteJsonSelf('user-tag', `/${row.id}`).then(res => {
          this.getList();
          this.$message({ type: 'success', message: '删除成功!' });
        }).catch(err => {
          console.log(err);
        })
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除!' });
      });
    },
    // 用户列表
    handleUser(row) {
      this.$router.push({ path: '/admin_tagUserList', query: { id: row.id, sourceFrom: row.sourceFrom } })
    }
  },
}
</script>

<style lang="less" scoped>
@import "../../../../assets/admin/css/color.less"; /**颜色配置 */
@import "../../../../assets/admin/css/form.less";

.list-box {
  display: flex;
  min-height: 600px;
  .nav-list {
    width: 18%;
    margin-right: 2%;
  }
  .table-list {
    width: 80%;
  }
}
</style>
