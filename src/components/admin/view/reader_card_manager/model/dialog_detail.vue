<template>
  <el-dialog append-to-body title="同步日志详情" :visible.sync="dialogVisible" width="700px" :before-close="dialogBeforeClose">
    <div class="pre-line">
      <span :class="{'color-red':!detail.isSucess}">{{detail.syncResult}}</span>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'index',
  components: {},
  props: {},
  data() {
    return {
      dialogVisible: false,
      detail: '',
    };
  },
  computed: {},
  created() {

  },
  mounted() { },
  methods: {
    show(detail) {
      this.dialogVisible = true;
      this.detail = detail;
    }
  },
};
</script>
<style scoped lang='less'>
.pre-line {
  white-space: pre-line;
  font-size: 14px;
}
</style>