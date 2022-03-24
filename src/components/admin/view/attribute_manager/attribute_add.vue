<!---信息导航-应用设置-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse?'fold-menu':''">
        <serviceLMenu :isActive="5"></serviceLMenu>
      </el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{'content-collapse':$root.collapse}">
        <breadcrumb :cuMenu="'应用中心'" :fontColor="'fff'"></breadcrumb>
        <!--面包屑导航--->
        <div class="content">
          <el-form :model="postForm" :rules="rules" ref="ruleForm" label-width="170px" class="admin-form">
            <h1 class="s-b-border-title">{{(id&&id!='')?'编辑':'新增'}}用户属性</h1>
            <div class="form-content">
              <el-form-item label="属性名称" prop="name">
                <el-input v-model="postForm.name" placeholder="请输入属性名称" maxlength="20" clearable show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="描述对象" prop="propertyFor">
                <el-checkbox label="label" v-model="postForm.forReader">读者</el-checkbox>
                <el-checkbox label="label" v-model="postForm.forCard">读者卡</el-checkbox>
              </el-form-item>
              <el-form-item label="属性标识" prop="code">
                <el-input v-model="postForm.code" :disabled="(id&&id!='')?true:false" maxlength="20" clearable show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="属性说明">
                <el-input v-model="postForm.intro" maxlength="50" clearable show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="属性类型">
                <el-radio-group v-model="postForm.type" :disabled="(id&&id!='')?true:false">
                  <el-radio-button :label="value" v-for="(value,index) in dataKey.propertyType" :key="index">{{index}}</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <!-- <el-form-item label="是否可检索">
                <el-switch v-model="postForm.canSearch"></el-switch>
              </el-form-item> -->
              <el-form-item label="是否列表显示">
                <el-switch v-model="postForm.showOnTable"></el-switch>
              </el-form-item>
              <el-form-item label="是否必填">
                <el-switch v-model="postForm.required"></el-switch>
              </el-form-item>
              <el-form-item label="是否唯一">
                <el-switch v-model="postForm.unique"></el-switch>
              </el-form-item>
              <el-form-item>
                <el-button icon="iconfont el-icon-vip-chushi" size="medium" @click="reset">重置</el-button>
                <el-button icon="iconfont el-icon-vip-baocun1" size="medium" type="primary" @click="submitForm">保存</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <!---内容板块 end--->
        <footerPage class="top20"></footerPage>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import bus from '@/assets/public/js/bus';
import http from "@/assets/public/js/http";
import footerPage from "@/components/admin/common/footer";
import breadcrumb from "@/components/admin/model/breadcrumb";
import serviceLMenu from "@/components/admin/model/serviceLMenu_user";
export default {
  name: 'index',
  created() {
    // bus.$on('collapse', msg => {
    //   this.$root.collapse = msg;
    //   this.$forceUpdate();
    // })
  },
  components: { footerPage, serviceLMenu, breadcrumb },
  data() {
    return {
      dataKey: null,// 键值对总数据
      id: this.$route.query.id,//属性id
      postForm: null,//提交设置内容
      rules: {
        propertyFor: [
          { required: true, message: '请选择', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '请输入内容', trigger: 'blur' },
        ],
        read: [
          { type: 'boolean', message: '请选择活动资源', trigger: 'change' }
        ],
        code: [
          { required: true, message: '请输入内容', trigger: 'blur' },
        ],
      },
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.getKey();
      if (this.id) {
        this.getData();
      } else {
        this.postForm = {
          "name": "",
          "propertyFor": "1",
          "forReader": true,
          "forCard": false,
          "code": "",
          "intro": "",
          "type": 0,
          "canSearch": false,
          "showOnTable": false,
          "required": false,
          "unique": false
        }
      }
    },
    // 获取初始数据
    getKey() {
      http.getJson('init-data').then(res => {
        this.dataKey = res.data;
      }).catch(err => {
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    // 获取属性
    getData() {
      http.getJsonSelf('property', `/${this.id}`).then(res => {
        res.data.propertyFor = "1";
        this.postForm = res.data;
      }).catch(err => {
        this.$message({ type: 'error', message: '获取数据失败!' });
      });
    },
    // 重置
    reset() {
      location.reload();
    },
    //表单提交
    submitForm() {
      this.$refs['ruleForm'].validate((ok) => {
        if (ok) {
          if (this.id) {
            http.putJson('property', this.postForm).then(res => {
              this.$message({ message: this.dataKey.needApprove ? '已编辑成功，请等待审核！' : '编辑成功！', type: 'success' });
              this.getData();
            }).catch(err => {
              this.$message({ type: 'error', message: this.handleError(err, '编辑失败') });
            })
          } else {
            http.postJson('property', this.postForm).then(res => {
              this.$message({ message: this.dataKey.needApprove ? '已新增成功，请等待审核！' : '新增成功！', type: 'success' });
              // this.id = res.data;
              // this.getData();
              this.$router.replace('/admin_attributeList');
            }).catch(err => {
              this.$message({ type: 'error', message: this.handleError(err, '新增失败') });
            })
          }
        }
      });
    },

  },
}
</script>

<style lang="less" scoped>
@import "../../../../assets/admin/css/color.less"; /**颜色配置 */
@import "../../../../assets/admin/css/form.less";
.content {
  min-height: 600px;
  background-color: @fff;
  border-radius: 4px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.02);
}
/deep/ .el-form-item__content {
  width: 500px;
}
</style>
