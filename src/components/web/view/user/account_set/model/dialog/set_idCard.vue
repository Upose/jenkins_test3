<template>
  <el-dialog title="修改身份证号" :visible.sync="dialogVisible" :modal-append-to-body="false" width="480px">
    <div>
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="身份证号：">
          <el-input v-model="idCard" placeholder="请输入" maxlength="30" show-word-limit></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button class="tborder-c1 tbg-c1 thover-bg-c2" type="primary" @click="subForm" v-button-debounce>确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { validator } from "@/assets/public/js/util";

export default {
  name: "index",
  components: {},
  data() {
    return {
      dialogVisible: false,
      idCard: ''
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
    // 编辑保存
    subForm() {
      this.http.postJson('forward-bind-reader-id-card', { idCard: this.idCard }).then((res) => {
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
