<template>
  <el-dialog title="修改邮箱" :visible.sync="dialogVisible" width="480px" :before-close="dialogBeforeClose">
    <div>
      <el-form ref="form" :model="form" label-width="90px">
        <el-form-item label="邮箱号码">
          <el-input v-model="form"></el-input>
        </el-form-item>
        <el-form-item label="验证码" class="inp-box">
          <el-input v-model="code" placeholder="验证码" class="inp"></el-input>
          <span class="verification-code">获取验证码</span>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
      form: ''
    };
  },
  created() {

  },
  mounted() {

  },
  methods: {
    show() {
      this.dialogVisible = true;
    }
  },
};
</script>

<style scoped lang="less">
.inp-box {
  position: relative;

  .verification-code {
    width: 138px;
    line-height: 24px;
    position: absolute;
    top: 8px;
    right: 1px;
    border-left: 1px solid #ddd;
    text-align: center;
    cursor: pointer;
    color: #458DDA;
    //   background: #fff;
  }
  /deep/ input {
    padding-right: 150px;
  }
}
</style>
