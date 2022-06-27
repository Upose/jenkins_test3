<!--
 * @Author: huyu
 * @Date: 2022-06-27 15:01:55
 * @LastEditors: huyu
 * @LastEditTime: 2022-06-27 16:00:11
 * @Description: 合并读者头部卡片
-->
<template>
  <div class="head-card-box" :class="{'card-main':data.isMainCard}">
    <div class="head-card-top">
      <div class="card-tag">
        <span>读者卡</span>
        <span class="card-index">{{data.index+1}}</span>
      </div>
      <slot></slot>
    </div>
    <div class="head-card-bottom">
      <div class="card-no">卡号：{{data.cardNo}}</div>
      <div>卡类型：{{data.cardTypeName}}</div>
      <div>卡状态：{{data.cardStatusName}}</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: ['data'],
  data() {
    return {

    };
  },
  created() {

  },
  mounted() { },
  methods: {

  },
};
</script>

<style scoped lang="less">
.head-card-box {
  height: 180px;
  background: #ececec;
  opacity: 1;
  border-radius: 5px;
  .head-card-top {
    height: 64px;
    border-bottom: 1px solid #cdcdcd;
    padding: 0 34px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .card-tag {
      width: 149px;
      height: 32px;
      background: #7192fc;
      border-radius: 20px;
      font-size: 18px;
      font-weight: 540;
      color: #fff;
      span {
        display: inline-block;
        width: 90px;
        text-align: center;
        line-height: 32px;
      }
      .card-index {
        width: 50px;
        border-left: 1px solid #fff;
      }
    }
  }
  .head-card-bottom {
    padding: 14px 40px;
    div {
      margin-bottom: 10px;
      color: #a9a9a9;
      font-weight: normal;
    }
    .card-no {
      font-size: 16px;
      font-weight: bold;
      color: #757575;
    }
  }
}
.card-main {
  background-image: url("../../../../../assets/admin/img/bg-merge-reader.png");
  background-size: 100% 100%;
  color: #fff !important;
  .card-tag {
    background: #fff !important;
    color: #7192fc !important;
    .card-index {
      border-left: 1px solid #d5dffe !important;
    }
  }
  div {
    color: #fff !important;
  }
  .card-no {
    color: #fff !important;
  }
}
</style>
