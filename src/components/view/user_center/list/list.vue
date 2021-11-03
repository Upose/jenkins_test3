<!---服务中台-终端管理-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse?'fold-menu':''"><serviceLMenu_user_center :isActive="1"></serviceLMenu_user_center></el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{'content-collapse':$root.collapse}">
        <breadcrumb :cuMenu="'终端管理'" :fontColor="'fff'"></breadcrumb><!--面包屑导航--->
        
        <footerPage class="top20"></footerPage>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import bus from '@/assets/js/bus';
import http from "@/assets/js/http";
import footerPage from "@/common/footer";
import breadcrumb from "@/components/model/breadcrumb";
import serviceLMenu_user_center from "@/components/model/serviceLMenu_user_center";
export default {
  name: 'index',
  created(){
    bus.$on('collapse', msg => {
        this.$root.collapse = msg;
    })
  },
  components:{footerPage,serviceLMenu_user_center,breadcrumb},
  data () {
    return {}
  },
  mounted(){
  },
  methods:{
    
  },
}
</script>

<style lang="less" scoped>
@import "../../../../assets/css/color.less";/**颜色配置 */

</style>
