<!--
 * @Author: huyu
 * @Date: 2022-11-09 15:03:20
 * @LastEditors: huyu
 * @LastEditTime: 2022-11-09 16:06:43
 * @Description: 用户标签-iframe嵌原型图
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
              <iframe class="iframe-box" src="http://10.5.220.18/UserCenter/%E8%AF%BB%E8%80%85%E6%A0%87%E7%AD%BE%E7%AE%A1%E7%90%86.html" frameborder="0"></iframe>
              <!-- <iframe class="iframe-box" src="http://192.168.21.62:10001/UserCenter/%E8%AF%BB%E8%80%85%E6%A0%87%E7%AD%BE%E7%AE%A1%E7%90%86.html" frameborder="0"></iframe> -->
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
  height: 1200px;
}
</style>
