<template>
  <el-dialog title="修改手机号" :visible.sync="dialogVisible" width="480px" :before-close="dialogBeforeClose">
    <div>
      <el-form ref="form" :model="form" label-width="90px">
        <el-form-item label="读者卡号">
          <el-input v-model="form"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form"></el-input>
        </el-form-item>
        <el-form-item label="有效日期">
          <el-input v-model="form"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="form"></el-input>
        </el-form-item>
        <el-form-item label="条形码">
          <el-input v-model="form"></el-input>
        </el-form-item>
        <el-form-item label="用户类型">
          <el-input v-model="form"></el-input>
        </el-form-item>
        <el-form-item label="关联信息">
          <el-input v-model="form"></el-input>
          <span><i class="red-color">*</i>与账号预留手机号码一致，可认领</span>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="sub">确定认领</el-button>
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
    },
    sub(){
        this.$emit('next');
        this.dialogVisible = false;
    }
  },
};
</script>

<style scoped lang="less">
.red-color{
    color: #A21E1E;
}
</style>
