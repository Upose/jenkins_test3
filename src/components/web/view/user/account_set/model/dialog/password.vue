<template>
  <el-dialog title="修改密码" :visible.sync="dialogVisible" width="480px" :before-close="dialogBeforeClose">
    <div>
      <el-form ref="form" :model="form" label-width="90px">
        <el-form-item label="旧密码">
          <el-input v-model="prePwd"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="newPwd"></el-input>
        </el-form-item>
        <el-form-item label="重复新密码">
          <el-input v-model="newPwdTwo"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="subForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "index",
  props: {},
  components: {},
  data() {
    return {
      dialogVisible: false,
      prePwd:'',//旧密码
      newPwd:'',//新密码
      newPwdTwo:'',//新密码重复
    };
  },
  created() {

  },
  mounted() {

  },
  methods: {
    show() {
      this.dialogVisible = true;
    },
    //提交
    subForm(){
      this.http.postJson('forward-change-card-password',{prePwd:this.prePwd,newPwd:this.newPwd}).then((res) => {
        this.$message({ type: "success", message: "修改成功!" });
        this.dialogVisible = false;
      }).catch((err) => {
        this.$message({ type: "error", message: "获取读者信息失败!" });
      });
    }
  },
};
</script>

<style scoped lang="less">
</style>
