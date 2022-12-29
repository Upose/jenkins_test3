<!--
 * @Author: huyu
 * @Date: 2022-12-29 18:57:29
 * @LastEditors: huyu
 * @LastEditTime: 2022-12-29 18:57:47
 * @Description: 
-->
<template>
  <el-dialog append-to-body title="馆员日志详情" :visible.sync="dialogVisible" width="700px" :before-close="dialogBeforeClose">
    <div class="pre-line">
      <span>{{detail}}</span>
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