<template>
  <el-dialog title="修改邮箱" :visible.sync="dialogVisible" width="480px" :before-close="dialogBeforeClose">
    <div>
      <el-form ref="form" :model="form" label-width="90px">
        <el-form-item label="邮箱号码">
          <el-input v-model="email" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="验证码" class="inp-box">
          <el-input v-model="code" placeholder="请输入" class="inp"></el-input>
          <span class="verification-code" @click="getCode" v-if="!hasCode">获取验证码</span>
          <span class="verification-code color-grey" v-else>{{countDown}}秒后重新获取</span>
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
import { validator } from "@/assets/public/js/util";

export default {
  name: "index",
  props: {},
  components: {},
  data() {
    return {
      dialogVisible: false,
      email: '',//邮箱
      code: '',//验证码
      key: '',//验证key
      hasCode: false,//是否一点击获取验证码
      countDown: 60,//倒计时
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
    // 获取验证码
    getCode() {
      if (!validator('email', this.email)) {
        this.$message({ type: "warning", message: "请输入正确的邮箱!" });
        return
      }
      this.http.postJsonSelf('forward-send-email-verify-code', `/${this.email}`).then((res) => {
        this.$message({ type: "success", message: "已发送!" });
        this.hasCode = true;
        this.key = res.data;
        this.countDown = 60;
        var fnCountDown = setInterval(() => {
          if (this.countDown > 1) {
            this.countDown -= 1;
          } else {
            this.hasCode = false;
            clearInterval(fnCountDown);
          }
        }, 1000);
      }).catch((err) => {
        this.$message({ type: "error", message: "发送失败!" });
      });
    },
    // 编辑保存
    subForm() {
      this.http.postJson('forward-bind-email-and-code', { email: this.email, code: this.code, key: this.key }).then((res) => {
        this.dialogVisible = false;
        this.$message({ type: "success", message: "修改成功!" });
        this.$emit('change');
      }).catch((err) => {
        this.$message({ type: "error", message: "修改失败!" });
      });
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
    color: #458dda;
    //   background: #fff;
  }
  .color-grey {
    color: #666;
  }
  /deep/ input {
    padding-right: 150px;
  }
}
</style>
