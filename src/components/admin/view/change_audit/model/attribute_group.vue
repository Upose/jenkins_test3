<template>
  <div>
    <!-- <div class="m-title search-term-table">
      <div class="r-btn">
        <el-button type="primary" size="medium" @click="handleAdd">新增属性</el-button>
      </div>
    </div> -->
    <div class="t-p">
      <el-table stripe ref="singleTable" :data="tableData" @selection-change="handleSelectionApp" border class="admin-table" :header-cell-style="{background:'#F1F3F7'}">
        <!-- <el-table-column type="selection" width="45"></el-table-column> -->
        <el-table-column label="序号" align="center" width="58" type="index"></el-table-column>
        <el-table-column prop="name" label="标准化属性"></el-table-column>
        <el-table-column label="分类">
          <template slot-scope="scope">
            <span>{{ scope.row.type==1?'自定义':'默认' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="count" label="数量"></el-table-column>
        <el-table-column prop="content" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleDel(scope.row)" type="text" size="mini" icon="el-icon-delete" class="operate-red-btn" round>删除</el-button>
            <el-button @click="handleEdit(scope.row)" type="text" size="mini" icon="el-icon-edit" round>编辑</el-button>
            <el-button @click="handleEditGroup(scope.row)" type="text" size="mini" icon="el-icon-edit" v-if="scope.row.type == 3" round>编辑属性组</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="操作日志">
          <template slot-scope="scope">
            <el-button @click="handleLog(scope.row)" type="text" size="mini" icon="el-icon-view" round>查看日志</el-button>
          </template>
        </el-table-column>
      </el-table>
      <dialogLog ref="dialogLog"></dialogLog>
    </div>
  </div>
</template>
<script>
import http from "@/assets/public/js/http";
import paging from "@/components/admin/model/paging";
import dialogLog from "./dialog/dialog_log";


export default {
  name: 'index',
  components: { paging,dialogLog },
  data() {
    return {
      dataKey: null,
      pageData: {
        pageIndex: 1,
        pageSize: 20,
      },//分页参数
      tableData: [],//列表项
      multipleSelection: [],//勾选列表
      postForm: {},
      tableData: [],

      idList: []
    }
  },
  mounted() {
    // this.getKey();
    // this.getList();
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
      http.getJson('group-list-data').then(res => {
        let list = res.data || [];
        this.tableData = list;
      }).catch(err => {
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    // 键值对匹配
    getKeyValue(val) {
      for (const key in this.dataKey.propertyType) {
        if (this.dataKey.propertyType[key] == val) {
          return key;
        }
      }
    },
    // 列表展示修改
    handleCangeShow(row) {
      http.postJson('set-show-on-table', {
        "id": row.id,
        "showOnTable": row.showOnTable
      }).then(res => {
        this.$message({ type: 'success', message: '设置成功!' });
      }).catch(err => {
        this.$message({ type: 'error', message: '设置失败!' });
      })
    },
    // 列表展示修改
    handleCangeSearch(row) {
      http.postJson('set-can-search', {
        "id": row.id,
        "canSearch": row.canSearch
      }).then(res => {
        this.$message({ type: 'success', message: '设置成功!' });
      }).catch(err => {
        this.$message({ type: 'error', message: '设置失败!' });
      })
    },
    // 删除
    handleDel(row) {
      this.$confirm('请谨慎执行删除操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        http.deleteJsonSelf('property', `/${row.id}`).then(res => {
          this.getList();
          this.$message({ type: 'success', message: '删除成功!' });
        }).catch(err => {
          console.log(err);
        })
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除!' });
      });
    },
    // 查看日志
    handleLog(row) {
      this.$refs.dialogLog.show(row.id,1);
    },
    // 新增属性
    handleAdd(row) {
      this.$router.push({ path: '/admin_attributeAdd', query: { id: row.id } });
    },
    // 编辑属性
    handleEdit(row) {
      this.$router.push({ path: '/admin_attributeGroupManager', query: { id: row.id,name:row.name } });
    },
    // 编辑属性组
    handleEditGroup() {
      this.$router.push({ path: '/admin_contentEdit', query: { columnId: this.id } });
    },

  },
}
</script>
<style lang="less" scoped>
@import "../../../../../assets/admin/css/color.less"; /**颜色配置 */
@import "../../../../../assets/admin/css/form.less";

// .t-p {
//   /deep/.el-table [class*="el-table__row--level"] .el-table__expand-icon {
//     margin-left: -20px;
//     margin-right: 0px;
//   }

//   /deep/ .el-table__indent {
//     padding-left: 10px !important;
//     margin-left: -29px;
//   }
// }
.search-term-table {
  width: 100%;
  // height: 64px;
  padding: 13px 20px 10px;
  box-sizing: border-box;
  border-bottom: 1px solid #ebeef5;

  .width187 {
    width: 187px;
  }
  .width136 {
    width: 136px;
  }
  .r-btn {
    float: right;
  }
  /deep/ input {
    font-weight: normal;
  }
}
// table树形结构 下拉图标更换
/deep/ .el-table__expand-icon {
  font-size: 14px;
  color: #78828a;
}
/deep/ .el-table__expand-icon .el-icon-arrow-right:before {
  content: "\e7a0";
}
/deep/ .el-table__expand-icon .el-icon-arrow-right:before {
  content: "\e7a0";
}

/deep/ .el-table__expand-icon--expanded .el-icon-arrow-right:before {
  content: "\e7a2";
}
/deep/ .el-table__expand-icon--expanded {
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
}
.line-before {
  // position: relative;
  // &::before {
  //   content: "";
  //   width: 12px;
  //   height: 52px;
  //   border-bottom: 1px solid #78828a;
  //   border-left: 1px solid #78828a;
  //   position: absolute;
  //   left: -19px;
  //   top: -26px;
  // }
}
</style>