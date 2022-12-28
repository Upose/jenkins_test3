<!--
 * @Author: huyu
 * @Date: 2022-12-28 10:09:20
 * @LastEditors: huyu
 * @LastEditTime: 2022-12-28 16:54:39
 * @Description: 用户激活管理
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
            <h1 class="search-title">读者激活管理</h1>
          </div>
          <!--顶部查询 end-->
          <div class="table-w">
            <div class="t-p">
              <div class="ua-list" v-loading="loading">
                <ActivateItem v-for="(item,index) in list" :key="item.id" :index="index" :item="item" @openAdd="openAdd"></ActivateItem>
                <div class="ua-add" @click="openAdd()">
                  <div class="flex-column-center">
                    <div class="icon-add">+</div>
                    <div>新增激活场景</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--管理页列表 end--->
        </div>
        <!---顶部查询板块 end--->
        <footerPage class="top20"></footerPage>
      </el-main>
    </el-container>

    <ActivateAdd ref="ActivateAdd" @updateList="getList"></ActivateAdd>
  </div>
</template>

<script>
import breadcrumb from "@/components/admin/model/breadcrumb";
import serviceLMenu from "@/components/admin/model/serviceLMenu_user";
import ActivateItem from '@/components/admin/view/user-activate/components/ActivateItem';
import ActivateAdd from '@/components/admin/view/user-activate/components/ActivateAdd';
export default {
  components: {
    breadcrumb,
    serviceLMenu,
    ActivateItem,
    ActivateAdd
  },
  props: {},
  data() {
    return {
      loading: false,//等待框
      list: [],
      pageData: {
        pageIndex: 1,
        pageSize: 1000,
      },//分页参数
    };
  },
  created() { },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      this.http.getJson('activate-table-data', {
        ...this.pageData
      }).then(res => {
        this.list = res.data.items;
        this.loading = false;
      }).catch(err => {
        this.loading = false;
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    openAdd(id) {
      this.$refs.ActivateAdd.show(id)
    }
  },
};
</script>

<style scoped lang="less">
.ua-list {
  display: grid;
  grid-gap: 10px 10px;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fill, 390px);
  min-height: 500px;
}
.ua-add {
  width: 390px;
  height: 198px;
  border-radius: 5px;
  border: 1px dashed #acacac;
  padding: 4px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  & > div {
    width: 100%;
    height: 100%;
    background: #f5f8f9;
    border-radius: 3px;
    color: #b7bec1;
    font-size: 12px;
    .icon-add {
      font-size: 34px;
    }
  }
}
</style>
