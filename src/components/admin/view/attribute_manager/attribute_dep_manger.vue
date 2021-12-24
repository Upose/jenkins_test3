<!---信息导航-栏目信息-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse ? 'fold-menu' : ''">
        <serviceLMenu :isActive="5"></serviceLMenu>
      </el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{ 'content-collapse': $root.collapse }">
        <breadcrumb :cuMenu="'栏目管理'" :fontColor="'fff'"></breadcrumb>
        <!--面包屑导航--->
        <div class="content search-table-general">
          <div class="search-table-w">
            <h1 class="search-title">
              属性组管理
            </h1>
          </div>
          <!--顶部查询 end-->
          <!-- 内容 -->
          <div class="table-w">
            <div class="t-p">
              <div class="name">属性组名：{{name}}
                <el-button type="primary" style="float:right;margin-bottom:10px" @click="handleAddDep">新增部门</el-button>
              </div>

              <el-table class="admin-table" stripe ref="singleTable" :data="tableData" border row-key="id" default-expand-all :tree-props="{children: 'children', hasChildren: 'hasChildren'}">>
                <el-table-column label="部门名称">
                  <template slot-scope="scope">
                    <el-input v-if="scope.row.edit || scope.row.new" v-model="scope.row.name" placeholder="" maxlength="20" clearable show-word-limit></el-input>
                    <span v-else-if="!scope.row.edit">{{ scope.row.name }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="全称" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <span>{{scope.row.fullName}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="code" label="分组编号">
                  <template slot-scope="scope">
                    <el-input v-if="scope.row.edit || scope.row.new" v-model="scope.row.code" placeholder="" maxlength="20" clearable show-word-limit></el-input>
                    <span v-else-if="!scope.row.edit">{{ scope.row.code }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="content" label="操作">
                  <template slot-scope="scope">
                    <template>
                      <!-- 正常按钮 -->
                      <el-button @click="handleDel(scope.row)" type="text" size="mini" icon="el-icon-delete" class="operate-red-btn" round v-show="!scope.row.new">删除</el-button>
                      <el-button @click="handleEdit(scope.row)" type="text" size="mini" icon="el-icon-edit" round v-show="!scope.row.edit&&!scope.row.new">编辑</el-button>
                      <el-button @click="handleSub(scope.row)" type="text" size="mini" icon="el-icon-edit" round v-show="scope.row.edit&&!scope.row.new">确定</el-button>
                      <el-button @click="handleAddChild(scope.row)" type="text" size="mini" icon="el-icon-plus" round v-show="!scope.row.edit&&!scope.row.new">新增子部门</el-button>
                      <!-- 新增时按钮 -->
                      <!-- <el-button class="operate-red-btn" @click="handleCancalAdd(scope.row)" type="text" size="mini" icon="el-icon-minus" round v-show="scope.row.new">取消新增</el-button> -->
                      <el-button @click="handleAdd(scope.row)" type="text" size="mini" icon="el-icon-plus" round v-show="scope.row.new">确认新增</el-button>
                    </template>
                    <!-- <template v-else>系统内置</template> -->
                  </template>
                </el-table-column>
              </el-table>
              <dialogLog ref="dialogLog"></dialogLog>
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
import bus from "@/assets/public/js/bus";
import http from "@/assets/public/js/http";
import footerPage from "@/components/admin/common/footer";
import breadcrumb from "@/components/admin/model/breadcrumb";
import paging from "@/components/admin/model/paging";
import serviceLMenu from "@/components/admin/model/serviceLMenu_user";

export default {
  name: "index",
  created() {
    bus.$on("collapse", (msg) => {
      this.$root.collapse = msg;
      this.$forceUpdate();
    });
  },
  components: { footerPage, serviceLMenu, breadcrumb, paging },
  data() {
    return {
      dataKey: null,
      id: this.$route.query.id,//属性id
      name: this.$route.query.name,//属性id
      tableData: [],//列表项
      groupData: {}
    };
  },
  mounted() {
    this.getKey();
    this.getList();
  },
  methods: {
    // 获取初始数据
    getKey() {
      http.getJson('group-init-data').then(res => {
        this.dataKey = res.data;
      }).catch(err => {
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    // 获取列表数据
    getList() {
      http.getJson('org-list').then(res => {
        let list = res.data || [];
        list.forEach(item => {
          item.edit = false;
        })
        this.tableData = list;
      }).catch(err => {
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    // 键值对匹配
    getKeyValue(val) {
      let status = '无'
      for (const key in this.dataKey.groupItemApproveStatus) {
        if (this.dataKey.groupItemApproveStatus[key] == val) {
          status = key;
        }
      }
      return status;
    },
    //新增一级部门
    handleAddDep() {
      this.tableData.unshift({
        "id": null,
        "pId": null,
        "name": "",
        "code": "",
        "remark": "",
        new: true
      })
    },
    //新增子部门
    handleAddChild(row) {
      row.children = row.children || [];
      row.children.push({
        "id": 0,
        "pId": row.fullPath,
        "name": "",
        "code": "",
        "remark": "",
        new: true
      })
    },
    // 取消新增
    handleCancalAdd(row) {
      this.tableData = this.tableData.filter(item => {
        return item != row;
      })
      console.log(this.tableData);
    },
    // 新增
    handleAdd(row) {
      if (row.name == '' || row.name == null) {
        this.$message({ message: '请输入名称', type: 'error' });
        return;
      }
      row.id = !row.id ? null : row.id;
      http.postJson('org', row).then(res => {
        this.$message({ message: '新增成功！', type: 'success' });
        row.new = false;
        this.getList();
      }).catch(err => {
        this.$message({ type: 'error', message: this.handleError(err, '新增失败') });
      })
    },
    // 编辑
    handleEdit(row) {
      var rowIndex = this.tableData.indexOf(row);
      row.edit = true;
      this.$set(this.tableData, rowIndex, row);
    },
    // 确定
    handleSub(row) {
      if (row.name == '' || row.name == null) {
        this.$message({ message: '请输入名称', type: 'error' });
        return;
      }
      row.edit = false;
      http.putJson('org', row).then(res => {
        this.$message({ message: '编辑成功！', type: 'success' });
        this.getList();
      }).catch(err => {
        this.$message({ type: 'error', message: this.handleError(err, '编辑失败') });
      })
    },
    // 删除
    handleDel(row) {
      this.$confirm('请谨慎执行删除操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        http.deleteJsonSelf('org', `/${row.id}`).then(res => {
          this.getList();
          this.$message({ type: 'success', message: '删除成功!' });
        }).catch(err => {
          this.$message({ type: 'error', message: this.handleError(err, '删除失败') });
        })
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除!' });
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../../../assets/admin/css/color.less"; /**颜色配置 */
@import "../../../../assets/admin/css/form.less";
.t-p {
  .name {
    margin: 20px 0;
    font-size: 16px;
  }
  //   /deep/.el-table [class*="el-table__row--level"] .el-table__expand-icon {
  //     margin-left: -20px;
  //     margin-right: 0px;
  //   }

  //   /deep/ .el-table__indent {
  //     padding-left: 10px !important;
  //     margin-left: -29px;
  //   }
}
/deep/ .cell {
  display: flex;
  align-items: center;
}
</style>
