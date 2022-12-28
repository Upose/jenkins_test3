<!--
 * @Author: huyu
 * @Date: 2022-12-28 14:24:33
 * @LastEditors: huyu
 * @LastEditTime: 2022-12-28 18:39:00
 * @Description: 流程列表项
-->
<template>
  <div class="fi-box flex-row-start" :class="{'fi-active':curIndex==index}" @click="$emit('chengeFlow',{index:index,type:'show'})">
    <div class="fb-left flex-column-between">
      <div class="fl-btn flex-row-center hover-op" v-if="index!=0" @click.stop="$emit('chengeFlow',{index:index,type:'up'})"><i class="el-icon-caret-top"></i>上移</div>
      <div class="fl-site" v-if="index==0||length-1==index"></div>
      <div class="fl-btn flex-row-center hover-op" v-if="length-1!=index" @click.stop="$emit('chengeFlow',{index:index,type:'down'})"><i class="el-icon-caret-bottom"></i>下移</div>
    </div>
    <i class="fi-icon-line"></i>
    <div class="fi-title ellipsis">{{item.title}}</div>
    <div class="fi-del-btn flex-row-center hover-op" @click.stop="$emit('chengeFlow',{index:index,type:'del'})" v-if="length>1"><i class="el-icon-delete-solid"></i></div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    item: Object,
    curIndex: Number,
    index: Number,
    length: Number
  },
  data() {
    return {

    };
  },
  created() { },
  mounted() { },
  methods: {

  },
};
</script>

<style scoped lang="less">
.fi-box {
  height: 80px;
  background: #ffffff;
  border-radius: 4px;
  padding: 8px 10px;
  margin-bottom: 10px;
  .fb-left {
    height: 100%;
    .fl-btn {
      width: 58px;
      height: 30px;
      border: 1px solid rgba(103, 119, 239, 0.2);
      border-radius: 4px;
      color: #6777ef;
      font-size: 12px;
      i {
        margin-right: 4px;
      }
    }
    .fl-site {
      width: 58px;
      height: 30px;
    }
  }
  .fi-icon-line {
    width: 1px;
    height: 66px;
    background: #ebeef5;
    margin: 0 10px;
  }
  .fi-title {
    width: 200px;
    color: #404040;
    font-size: 16px;
    text-align: center;
  }
  .fi-del-btn {
    width: 20px;
    height: 64px;
    background: rgba(223, 26, 26, 0.06);
    border-radius: 5px 0px 0px 5px;
    color: #df1a1a;
    margin-left: 10px;
  }
}
.fi-active {
  background: #6777ef;
  .fl-btn {
    color: #fff !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
  }
  .fi-icon-line {
    background: rgba(255, 255, 255, 0.2);
  }
  .fi-title {
    color: #fff !important;
  }
  .fi-del-btn {
    background: #fff;
  }
}
</style>
