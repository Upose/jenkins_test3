<!--
 * @Author: huyu
 * @Date: 2023-01-09 15:11:12
 * @LastEditors: huyu
 * @LastEditTime: 2023-01-09 16:28:51
 * @Description: 选择app
-->
<template>
  <div class="chance">
    <div class="title-box">
      <span class="left">选择应用</span>
    </div>
    <div class="chance-app">
      <span :class="isSelect(item.appId)?'app-select':''" v-for="item in applyList" :key="item.id" @click="handleApply(item)">{{item.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    applyIdList: Array
  },
  data() {
    return {
      applyList: [],//模板应用列表
      // applyIdList: [],//模板appid列表
    };
  },
  created() { },
  mounted() {
    this.getApplyList();
  },
  methods: {
    // 获取应用列表
    getApplyList() {
      this.http.getJsonSelf('forward-personal-app-list', `/1`).then((res) => {
        this.applyList = res.data;
      }).catch((err) => {
        this.$message({ type: "error", message: "获取应用信息失败!" });
      });
    },
    // 应用是否已选
    isSelect(id) {
      let val = this.applyIdList.includes(id);
      return val;
    },
    // 选择应用
    handleApply(item) {
      this.$emit('handleApply', item)
    },
  },
};
</script>

<style scoped lang="less">
.chance {
  background: #ffffff;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.02);
  border-radius: 16px;
  overflow: hidden;
  margin-top: 30px;
  .chance-app {
    padding: 24px 20px 40px;

    span {
      padding: 10px 16px;
      border-radius: 5px;
      border: 1px solid #ddd;
      margin: 0 20px 20px 0;
      cursor: pointer;
      color: #666;
      display: inline-block;
    }
    .app-select {
      border-color: #458dda;
      color: #458dda;
      position: relative;
      background: url("../../../../../assets/web/img/active-bottom.png")
        no-repeat right bottom;

      &::after {
        position: absolute;
        top: 0;
        right: 0;
        content: "";
        color: #458dda;
        // background: #458DDA;
        width: 12px;
        height: 10px;
        border-radius: 3px;
      }
    }
  }
}
.title-box {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 25px;
  border-bottom: 1px solid #eee;
  background: #fff;

  .left {
    font-size: 20px;
    font-weight: bold;
  }
  .right {
    font-size: 16px;
    color: #666;
    cursor: pointer;

    .font-w {
      font-weight: 600;
    }
  }
}
</style>
