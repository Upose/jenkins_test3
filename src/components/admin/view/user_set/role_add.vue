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
            <el-form ref="form" :model="postForm" label-width="150px" :rules="formRules">
              <el-form-item label="角色名称" prop="name">
                <el-input class="w500" v-model="postForm.name" maxlength="10" show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="角色描述" prop="remark">
                <el-input class="w500" type="textarea" v-model="postForm.remark" maxlength="100" show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="选择权限">
                <div class="tree-box w500">
                  <el-tree :data="auth" :default-checked-keys="postForm.menuIds" ref="tree" show-checkbox node-key="id" default-expand-all :props="defaultProps">
                    <!-- <el-tree :data="data" show-checkbox node-key="id" :default-expanded-keys="[2, 3]" :default-checked-keys="[5]" :props="defaultProps"> -->
                  </el-tree>
                </div>
              </el-form-item>
              <el-form-item>
                <el-button icon="iconfont el-icon-vip-chushi" size="medium" @click="reset">重 置</el-button>
                <el-button icon="iconfont el-icon-vip-baocun1" size="medium" type="primary" @click="submitForm">保 存</el-button>
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
    // bus.$on("collapse", (msg) => {
    //   this.$root.collapse = msg;
    //   this.$forceUpdate();
    // });
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
      formRules: {
        name: [
          { required: true, message: '必填项', trigger: 'blur' }
        ],
      }
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
    // 重置
    reset() {
      location.reload();
    },
    //表单提交
    submitForm() {
      this.$refs["form"].validate(ok => {
        if (ok) {
          this.postForm.menuIds = this.$refs.tree.getCheckedKeys();
          if (this.id) {
            http.putJson('role', this.postForm).then(res => {
              this.$message({ message: '编辑成功！', type: 'success' });
              this.$router.back();
            }).catch(err => {
              this.$message({ type: 'error', message: '编辑失败!' });
            })
          } else {
            http.postJson('role', this.postForm).then(res => {
              this.$message({ message: '新增成功！', type: 'success' });
              this.$router.back();
            }).catch(err => {
              this.$message({ type: 'error', message: '新增失败!' });
            })
          }
        }
      });

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
.tree-box {
  height: 500px;
  overflow-y: scroll;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 10px 0;
}
</style>
