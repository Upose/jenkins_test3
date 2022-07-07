<template>
  <el-dialog title="修改密码" :visible.sync="dialogVisible" width="480px" :before-close="dialogBeforeClose">
    <div>
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="旧密码">
          <el-input v-model="prePwd"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="newPwd" show-password></el-input>
        </el-form-item>
        <el-form-item label="重复新密码">
          <el-input v-model="newPwdTwo" show-password></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button class="btn_bg_color child_border_color" type="primary" @click="subForm">确 定</el-button>
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
      prePwd: '',//旧密码
      newPwd: '',//新密码
      newPwdTwo: '',//新密码重复
      id: '',
    };
  },
  created() {

  },
  mounted() {

  },
  methods: {
    show(id) {
      this.dialogVisible = true;
      this.id = id;
    },
    //提交
    subForm() {
      if (this.newPwd != this.newPwdTwo) {
        this.$message({
          message: '两次密码不一致，请确认！',
          type: 'warning'
        })
        return
      }
      this.http.postJson('forward-change-card-password', { cardID: this.id, prePwd: this.prePwd, newPwd: this.newPwd }).then((res) => {
        this.$message({ type: "success", message: "修改成功!" });
        this.dialogVisible = false;
      }).catch((err) => {
        this.$message({ type: "error", message: this.handleError(err, "修改失败") });
      });
    }
  },
};
</script>

<style scoped lang="less">
</style>
