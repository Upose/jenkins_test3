<!---信息导航-应用设置-->
<template>
  <div class="content">
    <!-- <h1 class="s-b-border-title"> -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="按角色" name="role">
        <role></role>
      </el-tab-pane>
      <el-tab-pane label="按馆员" name="dape">
        <staff></staff>
      </el-tab-pane>
    </el-tabs>
    <!-- </h1> -->

    <!-- <el-table stripe ref="singleTable" :data="tableData" @selection-change="handleSelectionApp" border class="admin-table" :header-cell-style="{background:'#F1F3F7'}">
      <el-table-column prop="prop" label="编码"></el-table-column>
      <el-table-column prop="prop" label="角色名称"></el-table-column>
      <el-table-column prop="prop" label="馆员"></el-table-column>
      <el-table-column prop="prop" label="角色描述"></el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button @click="handleDel(scope.row)" type="text" size="mini" icon="el-icon-delete" class="operate-red-btn" round>删除</el-button>
          <el-button @click="handleEdit(scope.row)" type="text" size="mini" icon="el-icon-edit" round>编辑</el-button>
          <el-button @click="handleEditGroup(scope.row)" type="text" size="mini" icon="el-icon-edit" v-if="scope.row.type == 3" round>编辑属性组</el-button>
        </template>
      </el-table-column>
    </el-table> -->
  </div>
</template>

<script>
// import bus from '@/assets/public/js/bus';;
import http from "@/assets/public/js/http";
import footerPage from "@/components/admin/common/footer";
import breadcrumb from "@/components/admin/model/breadcrumb";
import serviceLMenu from "@/components/admin/model/serviceLMenu_user";
import role from "./model/role";
import staff from "./model/staff";

export default {
  name: 'index',
  created() {
    // bus.$on('collapse', msg => {
    //   this.$root.collapse = msg;
    //   this.$forceUpdate();
    // })
  },
  components: { footerPage, serviceLMenu, breadcrumb, role, staff },
  data() {
    return {
      // dataKey: JSON.parse(sessionStorage.getItem('dataKey')),// 键值对总数据
      activeName: 'role',

      postForm: {},//提交设置内容
    }
  },
  mounted() {
    // this.initData();
  },
  methods: {
    initData() {
      this.getList();
    },
    // 获取列表数据
    getList() {
      http.getJson('role-table-data').then(res => {
        let list = res.data || [];
        this.tableData = list;
      }).catch(err => {
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../../../assets/admin/css/color.less"; /**颜色配置 */
@import "../../../../assets/admin/css/form.less";
.content {
  min-height: 600px;
  background-color: @m-col-b0;
  border-radius: 4px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.02);
  padding: 20px;
}

.tips {
  color: #666;
}
.mr {
  margin-left: 20px;
}
</style>
