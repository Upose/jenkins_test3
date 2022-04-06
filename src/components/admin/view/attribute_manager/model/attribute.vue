<template>
  <div>
    <div class="m-title search-term-table">
      <div class="r-btn">
        <el-button type="primary" size="medium" @click="handleAdd" v-if="isAuth('property:create')">新增属性</el-button>
      </div>
    </div>
    <div class="t-p">
      <el-table v-loading="loading" stripe ref="singleTable" :data=" isAuth('property:list')?tableData:[]" @selection-change="handleSelectionApp" border class="admin-table" :header-cell-style="{background:'#F1F3F7'}">
        <!-- <el-table-column type="selection" width="45"></el-table-column> -->
        <el-table-column label="序号" align="center" width="58" type="index"></el-table-column>
        <el-table-column prop="name" align="center" label="属性名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="code" align="center" label="标识符" show-overflow-tooltip></el-table-column>
        <el-table-column label="类型" align="center" width="100" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ getKeyValue(scope.row.type) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="intro" label="描述" show-overflow-tooltip></el-table-column>
        <el-table-column prop="required" align="center" label="必填">
          <template slot-scope="scope">
            <span>{{ scope.row.required?'是':'否'}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="unique" align="center" label="唯一">
          <template slot-scope="scope">
            <span>{{ scope.row.unique?'唯一':'不唯一'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="showOnTable" label="列表是否展示" align="center">
          <template slot-scope="scope">
            <!-- <span>{{ scope.row.showOnTable?'是':'否'}}</span> -->
            <span>
              <el-switch v-model="scope.row.showOnTable" @change="handleCangeShow(scope.row)"></el-switch>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="canSearch" label="是否可检索" align="center">
          <template slot-scope="scope">
            <!-- <span>{{ scope.row.canSearch?'是':'否'}}</span> -->
            <span v-if="scope.row.sysBuildIn == 1">
              <el-switch v-model="scope.row.canSearch" @change="handleCangeSearch(scope.row)"></el-switch>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="描述对象" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.forReader?'读者 ':''}} {{ scope.row.forCard?'读者卡':''}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="操作" align="center" width="300">
          <template slot-scope="scope">
            <div v-if="scope.row.approveStatus == 1">
              <template v-if="!scope.row.sysBuildIn">
                <el-button @click="handleDel(scope.row)" type="text" size="mini" icon="iconfont el-icon-vip-shanchu-1" class="operate-red-btn" round v-if="isAuth('property:delete')">删除</el-button>
                <el-button @click="handleEdit(scope.row)" type="text" size="mini" icon="iconfont el-icon-vip-bianji" round v-if="isAuth('property:update')">编辑</el-button>
              </template>
              <el-button @click="handleEditGroup(scope.row)" type="text" size="mini" icon="iconfont el-icon-vip-bianji" v-if="scope.row.type == 4&&isAuth('propertyGroup:edit')" round>编辑属性组</el-button>
            </div>
            <span v-else>
              审批中...
            </span>
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
  components: { paging, dialogLog },
  data() {
    return {
      loading: false,
      dataKey: null,
      pageData: {
        pageIndex: 1,
        pageSize: 20,
      },//分页参数
      tableData: [],//列表项
      multipleSelection: [],//勾选列表
      postForm: {},

      idList: []
    }
  },
  mounted() {
    this.getKey();
    this.getList();
  },
  methods: {
    // 页面子权限判定
    isAuth(name) {
      let authList = this.$store.getters.authList;
      let curAuth = authList.find(item => (item.router == '/admin_attributeList'));
      // let curAuth = authList.find(item=>(item.router == this.$route.path));
      let curSonAuth = curAuth ? curAuth.permissionNodes.find(item => (item.permission == name)) : null;
      return curSonAuth ? true : false;
    },
    // 获取初始数据
    getKey() {
      http.getJson('init-data').then(res => {
        this.dataKey = res.data;
      }).catch(err => {
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    // 获取列表数据
    getList() {
      this.loading = true;
      http.getJson('list-data').then(res => {
        let list = res.data || [];
        this.tableData = list;
        this.loading = false;
      }).catch(err => {
        this.loading = false;
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    // 键值对匹配
    getKeyValue(val) {
      if (!this.dataKey) return;
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
    // 新增属性
    handleAdd(row) {
      this.$router.push({ path: '/admin_attributeAdd', query: { id: row.id } });
    },
    // 编辑属性
    handleEdit(row) {
      this.$router.push({ path: '/admin_attributeAdd', query: { id: row.id } });
    },
    // 编辑属性组
    handleEditGroup(row) {
      if (row.code == 'User_Depart') {
        this.$router.push({ path: '/admin_attributeDepManager', query: { id: row.propertyGroupID, name: row.name } });
      } else {
        this.$router.push({ path: '/admin_attributeGroupManager', query: { id: row.propertyGroupID, name: row.name } });
      }
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
// .line-before {
//   // position: relative;
//   // &::before {
//   //   content: "";
//   //   width: 12px;
//   //   height: 52px;
//   //   border-bottom: 1px solid #78828a;
//   //   border-left: 1px solid #78828a;
//   //   position: absolute;
//   //   left: -19px;
//   //   top: -26px;
//   // }
// }
</style>