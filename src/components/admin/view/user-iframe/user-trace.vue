<!--
 * @Author: huyu
 * @Date: 2022-11-09 15:20:27
 * @LastEditors: huyu
 * @LastEditTime: 2022-11-09 16:06:55
 * @Description: 用户追踪-iframe
-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse?'fold-menu':''">
        <serviceLMenu :isActive="6"></serviceLMenu>
      </el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{'content-collapse':$root.collapse}">
        <breadcrumb :cuMenu="'总导航管理'" :fontColor="'fff'"></breadcrumb>
        <div class="content search-table-general">
          <div class="table-w">
            <div class="t-p">
              <iframe class="iframe-box" src="http://10.5.220.18/UserCenter/%E7%94%A8%E6%88%B7%E8%BF%BD%E8%B8%AA%E7%AE%A1%E7%90%86.html" frameborder="0"></iframe>
              <!-- <iframe class="iframe-box" src="http://192.168.21.62:10001/UserCenter/%E7%94%A8%E6%88%B7%E8%BF%BD%E8%B8%AA%E7%AE%A1%E7%90%86.html" frameborder="0"></iframe> -->
            </div>
          </div>
        </div>
        <footerPage class="top20"></footerPage>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import footerPage from "@/components/admin/common/footer";
import breadcrumb from "@/components/admin/model/breadcrumb";
import serviceLMenu from "@/components/admin/model/serviceLMenu_user";

export default {
  name: 'index',
  created() {
  },
  components: { footerPage, serviceLMenu, breadcrumb },
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {

  },
}
</script>

<style lang="less" scoped>
.iframe-box {
  width: 100%;
  height: 1000px;
}
</style>