<template>
  <el-dialog title="读者证详情" :visible.sync="dialogVisible" width="1000px" :before-close="dialogBeforeClose">
    <div>
      <el-form ref="form" :model="form" label-width="90px" class="detail">
        <el-form-item label="统一认证">
          <el-input v-model="form" class="w-inp"></el-input>
        </el-form-item>
        <el-form-item label="读者卡号">
          <el-input v-model="form" class="w-inp"></el-input>
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="form" class="w-inp"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form" class="w-inp"></el-input>
        </el-form-item>
        <el-form-item label="有效日期">
          <el-input v-model="form" class="w-inp"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="form" class="w-inp"></el-input>
        </el-form-item>
        <el-form-item label="押金">
          <el-input v-model="form" class="w-inp"></el-input>
        </el-form-item>
        <el-form-item label="条形码">
          <el-input v-model="form" class="w-inp"></el-input>
        </el-form-item>
        <el-form-item label="物理码">
          <el-input v-model="form" class="w-inp"></el-input>
        </el-form-item>
        <el-form-item label="用户类型">
          <el-input v-model="form" class="w-inp"></el-input>
        </el-form-item>
        <el-form-item label="卡密码">
          <el-input v-model="form" class="w-inp"></el-input>
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
.w-inp{
    width: 368px;
}
.detail /deep/ .el-form-item{
    display: inline-block;
}
</style>
