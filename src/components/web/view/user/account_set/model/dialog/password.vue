<template>
  <el-dialog title="修改密码" :visible.sync="dialogVisible" width="480px" :before-close="dialogBeforeClose">
    <div>
      <el-form ref="form" :model="form" label-width="90px">
        <el-form-item label="旧密码">
          <el-input v-model="form"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="form"></el-input>
        </el-form-item>
        <el-form-item label="重复新密码">
          <el-input v-model="form"></el-input>
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
</style>
