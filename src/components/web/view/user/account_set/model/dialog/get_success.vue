<template>
  <el-dialog title="认领成功" :visible.sync="dialogVisible" width="480px" :before-close="dialogBeforeClose">
    <div class="success-tip" v-if="type==1">
      <i class="el-icon-success"></i>
      <span>认领成功</span>
    </div>
    <div class="success-tip" v-else>
      <i class="el-icon-success"></i>
      <span>提交成功</span>
      <p>请耐心等待馆员审核结果</p>
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
      type: 2
    };
  },
  created() {

  },
  mounted() {

  },
  methods: {
    show(type) {
      this.dialogVisible = true;
      this.type = type;
    }
  },
};
</script>

<style scoped lang="less">
.success-tip {
  text-align: center;
  margin: 70px auto 110px;
  i {
    font-size: 32px;
    color: #4fcd92;
    margin-right: 16px;
    vertical-align: sub;
  }
  span {
    font-size: 24px;
  }
  p {
    font-size: 15px;
    line-height: 21px;
    color: rgba(0, 0, 0, 0.65);
    text-align: center;
    margin-top: 10px;
  }
}
</style>
