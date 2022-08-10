<!---信息导航-应用设置-->
<template>
  <div class="content">
    <el-form :model="postForm" ref="ruleForm" label-width="170px" class="admin-form" :disabled="!isAuth('setting:basicSet')">
      <div class="form-content">
        <el-form-item label="开启敏感信息：">
          <el-switch v-model="postForm.sensitiveFilter"></el-switch>
          <el-button type="primary" size="medium" class="mr" @click="$refs.Dialog_staff.show('SensitiveInfoVisitor')">授权馆员</el-button>
          <div class="tips">设定后，读者敏感信息只有授权馆员才可查看</div>
        </el-form-item>
        <el-form-item label="开启读者注册审批：">
          <el-switch disabled v-model="postForm.UserRegister"></el-switch>
          <el-button type="primary" size="medium" class="mr" @click="$refs.Dialog_staff.show('UserRegisterApprover')">授权审核人</el-button>
          <div class="tips">设定后，读者注册审批后才生效</div>
        </el-form-item>
        <el-form-item label="开启读者修改审批：">
          <el-switch v-model="postForm.userInfoConfirm"></el-switch>
          <el-button type="primary" size="medium" class="mr" @click="$refs.Dialog_staff.show('UserChangeLogApprover')">授权审核人</el-button>
          <div class="tips">设定后，读者信息变动需审批后才生效</div>
        </el-form-item>
        <el-form-item label="开启读者属性修改审批：">
          <el-switch v-model="postForm.propertyConfirm"></el-switch>
          <el-button type="primary" size="medium" class="mr" @click="$refs.Dialog_staff.show('PropertyChangeLogApprover')">授权审核人</el-button>
          <div class="tips">设定后，读者属性修改需审批后才生效</div>
        </el-form-item>
        <el-form-item label="允许读者认领读者卡：">
          <el-switch v-model="postForm.cardClaim"></el-switch>
          <el-button type="primary" size="medium" class="mr" @click="$refs.selectUser.show(0)">授权读者</el-button>
          <el-button type="primary" size="medium" @click="$refs.Dialog_staff.show('CardClaimApprover')">授权审核人</el-button>
          <div class="tips">设定后，读者可主动认领未关联的读者卡，认领后需馆员审核</div>
        </el-form-item>
        <el-form-item label="开放读者完善个人信息：">
          <el-switch v-model="postForm.userInfoSupply"></el-switch>
          <el-button type="primary" size="medium" class="mr" @click="$refs.selectUser.show(1)">授权读者</el-button>
          <el-button type="primary" size="medium" @click="$refs.Dialog_set.show()">设置信息编辑项</el-button>
          <div class="tips">设定后，读者可修改完善个人必填项信息</div>
        </el-form-item>
        <el-form-item>
          <el-button icon="iconfont el-icon-vip-chushi" size="medium" @click="reset">重 置</el-button>
          <el-button icon="iconfont el-icon-vip-baocun1" size="medium" type="primary" @click="submitForm" v-button-debounce>保 存</el-button>
        </el-form-item>
      </div>
    </el-form>

    <Dialog_staff ref="Dialog_staff"></Dialog_staff>
    <Dialog_set ref="Dialog_set"></Dialog_set>
    <selectUser ref="selectUser"></selectUser>
  </div>
</template>

<script>
// import bus from '@/assets/public/js/bus';;
import http from "@/assets/public/js/http";
import footerPage from "@/components/admin/common/footer";
import breadcrumb from "@/components/admin/model/breadcrumb";
import serviceLMenu from "@/components/admin/model/serviceLMenu_user";

import Dialog_staff from './model/dialog_staff';
import Dialog_set from './model/dialog_set';
import selectUser from './model/selectUser'


export default {
  name: 'index',
  created() {
    // bus.$on('collapse', msg => {
    //   this.$root.collapse = msg;
    //   this.$forceUpdate();
    // })
  },
  components: { footerPage, serviceLMenu, breadcrumb, Dialog_staff, Dialog_set, selectUser },
  data() {
    return {
      dataKey: null,// 键值对总数据
      activeName: 'base',

      postForm: {},//提交设置内容
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.getData();
    },
    // 页面子权限判定
    isAuth(name) {
      let authList = this.$store.getters.authList;
      let curAuth = authList.find(item => (item.router == '/admin_userSet'));
      // let curAuth = authList.find(item=>(item.router == this.$route.path));
      let curSonAuth = curAuth ? curAuth.permissionNodes.find(item => (item.permission == name)) : null;
      return curSonAuth ? true : false;
    },
    // 获取设置
    getData() {
      http.getJson('basic-config').then(res => {
        this.postForm = res.data;
      }).catch(err => {
        this.$message({ type: 'error', message: '获取设置失败!' });
      })
    },
    // 切换
    handleClick() {
      if (this.activeName == 'auth') {
        this.$router.push('/admin_authSet')
      }
    },
    // 重置
    reset() {
      location.reload();
    },
    //表单提交
    submitForm() {
      // let parms = this.upFromData(this.postForm, [{ name: 'introduce', datas: { '使用帮助': { key: '使用帮助', value: 1 }, '资源统计': { key: '资源统计', value: 2 } } }])
      http.postJson('set-basic-config', this.postForm).then(res => {
        this.$message({ message: '保存成功！', type: 'success' });
        this.getData();
      }).catch(err => {
        this.$message({ type: 'error', message: this.handleError(err, '保存失败') });
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
  background-color: @fff;
  border-radius: 4px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.02);
}

.tips {
  color: #666;
}
.mr {
  margin-left: 20px;
}
</style>
