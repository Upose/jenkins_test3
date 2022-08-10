<template>
  <el-dialog title="认领读者卡" :visible.sync="dialogVisible" width="480px" :before-close="dialogBeforeClose">
    <div>
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="读者证号：">
          <el-input v-model="no" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="卡密码：">
          <el-input v-model="pwd" placeholder="请输入" show-password></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button class="tborder-c1 tbg-c1 thover-bg-c2" type="primary" @click="next" v-button-debounce>下 一 步</el-button>
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
      no: '',
      pwd: '',
    };
  },
  created() {

  },
  mounted() {

  },
  methods: {
    show() {
      this.no = '';
      this.pwd = '';
      this.dialogVisible = true;
    },
    next() {
      this.http.getJson('forward-search-card-data', { No: this.no, Pwd: this.pwd }).then((res) => {
        this.$emit('next', res.data);
        this.dialogVisible = false;
      }).catch((err) => {
        this.$message({ type: "error", message: "读者证号或密码错误!" });
      });

    }
  },
};
</script>

<style scoped lang="less">
</style>
