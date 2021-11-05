<template>
  <el-dialog title="切换主卡" :visible.sync="dialogVisible" width="480px" :before-close="dialogBeforeClose">
    <div>
      <div class="card">
        <el-checkbox v-model="e" class="c-box"></el-checkbox>
        <h6>张晓（临时卡）</h6>
        <p>0100080015036</p>
        <p>有效期至 2021-12-01</p>
        <span class="green">正常</span>
      </div>
      <div class="card">
        <el-checkbox v-model="e" class="c-box"></el-checkbox>
        <h6>张晓（临时卡）</h6>
        <p>0100080015036</p>
        <p>有效期至 2021-12-01</p>
        <span class="yellow">挂失</span>
      </div>
      <div class="card">
        <el-checkbox v-model="e" class="c-box"></el-checkbox>
        <h6>张晓（临时卡）</h6>
        <p>0100080015036</p>
        <p>有效期至 2021-12-01</p>
        <span class="gery">失效</span>
      </div>
    </div>
    <div slot="footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="next">确 定</el-button>
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
      e: '',
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
  },
};
</script>

<style scoped lang="less">
.card {
  width: 400px;
  height: 120px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 16px;
  padding: 20px 20px 20px 50px;
  position: relative;
  margin: 0 auto 20px;
  .c-box {
    position: absolute;
    top: 54px;
    left: 20px;
  }

  h6 {
    font-size: 18px;
  }
  p {
    color: #666;
    margin-top: 8px;
  }
  span {
    position: absolute;
    top: 20px;
    right: 0;
    padding: 6px 10px 6px 14px;
    border-radius: 20px 0 0 20px;
  }
  .green {
    color: #4fcd92;
    background: #e5f8ef;
  }
  .yellow {
    color: #ffa520;
    background: #fff2dd;
  }
  .gery {
    color: #555;
    background: #eee;
  }
}
</style>
