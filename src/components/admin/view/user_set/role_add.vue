<!---信息导航-栏目信息-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse ? 'fold-menu' : ''">
        <serviceLMenu :isActive="8"></serviceLMenu>
      </el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{ 'content-collapse': $root.collapse }">
        <breadcrumb :cuMenu="'栏目管理'" :fontColor="'fff'"></breadcrumb>
        <!--面包屑导航--->
        <div class="content search-table-general">
          <div class="search-table-w">
            <h1 class="search-title">
              新增角色
            </h1>
          </div>
          <!--顶部查询 end-->

          <!-- 目录 -->
          <div class="content-box">
            <el-form ref="form" :model="postForm" label-width="150px">
              <el-form-item label="角色名称" class="w500">
                <el-input v-model="postForm.name"></el-input>
              </el-form-item>
              <el-form-item label="角色描述" class="w500">
                <el-input type="textarea" v-model="postForm.remark"></el-input>
              </el-form-item>
              <el-form-item label="选择权限" class="w500">
                <el-tree :data="auth" :default-checked-keys="postForm.menuIds" ref="tree" show-checkbox node-key="id" default-expand-all :props="defaultProps">
                  <!-- <el-tree :data="data" show-checkbox node-key="id" :default-expanded-keys="[2, 3]" :default-checked-keys="[5]" :props="defaultProps"> -->
                </el-tree>
              </el-form-item>
              <el-form-item>
                <el-button icon="el-icon-close" size="medium" @click="reset">重置</el-button>
                <el-button icon="el-icon-check" size="medium" type="primary" @click="submitForm">保存</el-button>
              </el-form-item>
            </el-form>
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
import serviceLMenu from "@/components/admin/model/serviceLMenu_user";

export default {
  name: "index",
  created() {
    bus.$on("collapse", (msg) => {
      this.$root.collapse = msg;
    });
  },
  components: { footerPage, serviceLMenu, breadcrumb },
  data() {
    return {
      id: this.$route.query.id,
      postForm: {
        name: '',
        remark: '',
        menuIds: [],
      },
      defaultProps: {
        label: 'name',
        children: 'permissionNodes',
      },
      auth: [],
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.getAuth();
      if (this.id) {
        this.getData();
      }
    },
    // 获取数据
    getAuth() {
      http.getJson('all-permission-tree').then(res => {
        this.auth = res.data.permissionNodes;
      }).catch(err => {
        this.$message({ type: 'error', message: '获取设置失败!' });
      })
    },
    // 获取数据
    getData() {
      http.getJsonSelf('role-data', `/${this.id}`).then(res => {
        this.postForm = res.data;
      }).catch(err => {
        this.$message({ type: 'error', message: '获取设置失败!' });
      })
    },
    //表单提交
    submitForm() {
      this.postForm.menuIds = this.$refs.tree.getCheckedKeys();
      // let parms = this.upFromData(this.postForm, [{ name: 'introduce', datas: { '使用帮助': { key: '使用帮助', value: 1 }, '资源统计': { key: '资源统计', value: 2 } } }])
      if (this.id) {
        http.putJson('role', this.postForm).then(res => {
          this.$message({ message: '编辑成功！', type: 'success' });
          // this.getData();
        }).catch(err => {
          this.$message({ type: 'error', message: '编辑失败!' });
        })
      } else {
        http.postJson('role', this.postForm).then(res => {
          this.$message({ message: '新增成功！', type: 'success' });
          // this.getData();
        }).catch(err => {
          this.$message({ type: 'error', message: '新增失败!' });
        })
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../../../assets/admin/css/color.less"; /**颜色配置 */
@import "../../../../assets/admin/css/form.less";
.content-box {
  min-height: 600px;
  background-color: @fff;
  border-radius: 4px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.02);
  padding: 20px;
}
.w500 {
  width: 500px;
}
</style>
