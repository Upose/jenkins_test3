<!--
 * @Author: huyu
 * @Date: 2022-12-28 14:05:12
 * @LastEditors: huyu
 * @LastEditTime: 2022-12-29 17:48:53
 * @Description: 页面
-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse?'fold-menu':''">
        <serviceLMenu></serviceLMenu>
      </el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{'content-collapse':$root.collapse}">
        <breadcrumb></breadcrumb>
        <div class="content search-table-general">
          <div class="search-table-w">
            <h1 class="search-title">读者激活管理</h1>
          </div>
          <div class="table-w">
            <div class="t-p">

            </div>
          </div>
        </div>
        <footerPage class="top20"></footerPage>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import breadcrumb from "@/components/admin/model/breadcrumb";
import serviceLMenu from "@/components/admin/model/serviceLMenu_user";
export default {
  components: {
    breadcrumb,
    serviceLMenu,
  },
  props: {},
  data() {
    return {

    };
  },
  created() { },
  mounted() { },
  methods: {

  },
};
</script>

<style scoped lang="less">
</style>

