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
              <div class="name">属性组名：{{name}}</div>
              <el-table v-loading="loading" stripe ref="singleTable" :data="postForm.tableData" @selection-change="handleSelectionApp" border class="admin-table" :header-cell-style="{background:'#F1F3F7'}">
                <!-- <el-table-column type="selection" width="45"></el-table-column> -->
                <!-- <el-table-column label="序号" align="center" width="58" type="index"></el-table-column> -->
                <el-table-column label="分组名称">
                  <template slot-scope="scope">
                    <el-input v-if="scope.row.edit || scope.row.new" v-model="scope.row.name" placeholder="" maxlength="20" clearable show-word-limit></el-input>
                    <span v-else-if="!scope.row.edit">{{ scope.row.name }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="分组编号">
                  <template slot-scope="scope">
                    <el-input v-if="(scope.row.edit || scope.row.new)&&(!groupData.requiredCode||scope.row.new)" v-model="scope.row.code" placeholder="" maxlength="20" clearable show-word-limit></el-input>
                    <span v-else-if="groupData.requiredCode||!scope.row.edit">{{ scope.row.code }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="状态">
                  <template slot-scope="scope">
                    <span>{{ getKeyValue(scope.row.approveStatus) }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="content" label="操作" fixed="right" align="center">
                  <template slot-scope="scope">
                    <template v-if="!groupData.sysBuildIn&&!scope.row.sysBuildIn">
                      <el-button @click="handleDel(scope.row)" type="text" size="mini" icon="iconfont el-icon-vip-shanchu-1" class="operate-red-btn" round v-show="!scope.row.new" :disabled="!scope.row.approveStatus">删除</el-button>
                      <el-button @click="handleEdit(scope.row)" type="text" size="mini" icon="iconfont el-icon-vip-bianji" round v-show="!scope.row.edit&&!scope.row.new" :disabled="!scope.row.approveStatus">编辑</el-button>
                      <el-button @click="handleSub(scope.row)" type="text" size="mini" icon="iconfont el-icon-vip-wancheng" round v-show="scope.row.edit&&!scope.row.new">确定</el-button>
                      <el-button @click="handleAdd(scope.row)" type="text" size="mini" icon="iconfont el-icon-vip-tianjia2" round v-show="scope.row.new">新增</el-button>
                    </template>
                    <template v-else>系统内置</template>
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
    // bus.$on("collapse", (msg) => {
    //   this.$root.collapse = msg;
    //   this.$forceUpdate();
    // });
  },
  components: { footerPage, serviceLMenu, breadcrumb, paging },
  data() {
    return {
      loading: false,
      dataKey: null,
      id: this.$route.query.id,//属性id
      name: this.$route.query.name,//属性id
      postForm: {
        tableData: []
      },
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
      this.loading = true;
      http.getJsonSelf('list-item-data', `/${this.id}`).then(res => {
        this.groupData = res.data;
        let list = res.data.items || [];
        list.forEach(item => {
          item.edit = false;
        })
        if (!this.groupData.sysBuildIn) {
          list.push({
            "groupID": this.id,
            "groupName": this.name,
            "name": "",
            "code": "",
            new: true
          });
        }
        this.postForm.tableData = list;
        this.loading = false;
      }).catch(err => {
        this.loading = false;
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    // 键值对匹配
    getKeyValue(val) {
      if (!this.dataKey) return;
      let status = '无'
      for (const key in this.dataKey.groupItemApproveStatus) {
        if (this.dataKey.groupItemApproveStatus[key] == val) {
          status = key;
        }
      }
      return status;
    },
    // 编辑
    handleEdit(row) {
      var rowIndex = this.postForm.tableData.indexOf(row);
      row.edit = true;
      this.$set(this.postForm.tableData, rowIndex, row);
    },
    // 确定
    handleSub(row) {
      if (row.name == null || row.name == "") {
        this.$message({ message: '请输入名称', type: 'error' });
        return;
      }
      if (this.groupData.requiredCode && (row.code == null || row.code == "")) {
        this.$message({ message: '请输入编码', type: 'error' });
        return;
      }
      row.edit = false;
      http.putJson('group-item', row).then(res => {
        this.$message({ message: this.dataKey.needApprove ? '已编辑成功，请等待审核！' : '编辑成功！', type: 'success' });
        this.getList();
      }).catch(err => {
        this.$message({ type: 'error', message: this.handleError(err, '编辑失败') });
      })
    },
    // 新增
    handleAdd(row) {
      if (row.name == null || row.name == "") {
        this.$message({ message: '请输入名称', type: 'error' });
        return;
      }
      if (this.groupData.requiredCode && (row.code == null || row.code == "")) {
        this.$message({ message: '请输入编码', type: 'error' });
        return;
      }
      http.postJson('group-item', row).then(res => {
        this.$message({ message: this.dataKey.needApprove ? '已新增成功，请等待审核！' : '新增成功！', type: 'success' });
        this.getList();
      }).catch(err => {
        this.$message({ type: 'error', message: this.handleError(err, '新增失败') });
      })
    },
    // 删除
    handleDel(row) {
      this.$confirm('请谨慎执行删除操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        http.deleteJsonSelf('group-item', `/${row.id}`).then(res => {
          this.getList();
          this.$message({ type: 'success', message: this.dataKey.needApprove ? '已删除，请等待审核！' : '删除成功!' });
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
  /deep/.el-table [class*="el-table__row--level"] .el-table__expand-icon {
    margin-left: -20px;
    margin-right: 0px;
  }

  /deep/ .el-table__indent {
    padding-left: 10px !important;
    margin-left: -29px;
  }
}
</style>
