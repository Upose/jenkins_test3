<!--
 * @Author: huyu
 * @Date: 2022-12-29 10:29:47
 * @LastEditors: huyu
 * @LastEditTime: 2022-12-29 15:14:22
 * @Description: 流程列表
-->
<template>
  <div class="fl-wrap">
    <div class="fl-box flex-row-start" ref="flBox" :style="{'left':boxLeft+'px'}">
      <div class="fl-item flex-row-center" :class="{'fl-current tbg-c2':index==curFlowIndex,'fl-prev tbg-c2':index<curFlowIndex}" v-for="(item,index) in flow" :key="index">
        <span class="fi-mask"><i class="icon-sj-mask"></i></span>
        <span class="fi-tag" :class="{'tfont-c2':index==curFlowIndex,'tbg-c2':index<curFlowIndex}">{{index+1}}</span>
        <span class="fi-title" :class="{'tfont-c2':index<curFlowIndex}">{{item.title}}</span>
        <i class="icon-sj" :class="{'tborder-c2':index<=curFlowIndex}"></i>
      </div>
      <div class="fl-item flex-row-center" :class="{'fl-current tbg-c2':flow.length==curFlowIndex}">
        <span class="fi-tag fi-tran" :class="{'tfont-c2':flow.length==curFlowIndex}"><i class="el-icon-arrow-left"></i></span>
        <span class="fi-title">激活完成</span>
        <i class="icon-sj" :class="{'tborder-c2':flow.length==curFlowIndex}"></i>
      </div>
    </div>
    <div class="fl-btn-box flex-row-center" v-if="boxWidth>1200">
      <span class="fl-btn hover-color thover-bg-c2 flex-row-center" @click="moveBox('prev')"><i class="el-icon-arrow-left"></i></span>
      <span class="fl-btn hover-color thover-bg-c2 flex-row-center" @click="moveBox('next')"><i class="el-icon-arrow-right"></i></span>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    flow: Array,
    curFlowIndex: Number,
  },
  data() {
    return {
      boxWidth: 0,
      boxLeft: 0,
    };
  },
  created() { },
  mounted() {
    this.getBoxWidth();
  },
  methods: {
    // 获取所有项的宽度
    getBoxWidth() {
      let flList = document.querySelectorAll('.fl-item');
      let boxWidth = 0;
      flList.forEach(item => {
        boxWidth += item.offsetWidth + 44;
      })
      this.boxWidth = boxWidth;
    },
    moveBox(type) {
      if (type == 'next' && -this.boxLeft + 1200 < this.boxWidth) {
        this.boxLeft -= 200;
      }
      if (type == 'prev' && -this.boxLeft > 0) {
        this.boxLeft = -this.boxLeft > 200 ? this.boxLeft + 200 : 0;
      }
    },
  },
};
</script>

<style scoped lang="less">
.fl-wrap {
  position: relative;
  width: 100%;
  height: 44px;
  overflow: hidden;
}
.fl-btn-box {
  position: absolute;
  right: 0;
  top: 0;
  height: 44px;

  .fl-btn {
    width: 30px;
    height: 30px;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0px 0px 30px rgba(255, 255, 255, 1);
    border-radius: 50%;
    color: #707070;
    margin-left: 5px;
    font-size: 15px;
  }
  .hover-color {
    cursor: pointer;
    &:hover {
      color: #fff;
    }
  }
}
.fl-box {
  position: absolute;
  left: 0;
  top: 0;
  width: auto;
  height: 44px;
  white-space: nowrap;
  transition: all 0.3s;
  .fl-item {
    margin-right: 44px;
    padding: 0 25px 0 37px;
    height: 44px;
    background: #e3e3e3;
    border-radius: 4px 0 0 4px;
    position: relative;
    .icon-sj {
      position: absolute;
      right: -44px;
      top: 0;
      width: 2px;
      height: 2px;
      border: 22px solid;
      border-top-color: transparent !important;
      border-bottom-color: transparent !important;
      border-right-color: transparent !important;
      border-left-color: #e3e3e3;
    }
    .fi-tag {
      width: 18px;
      height: 18px;
      background: #ababab;
      border-radius: 50%;
      color: #fff;
      text-align: center;
      line-height: 17px;
      font-size: 12px;
      transform: scale(70%);
      margin-right: 8px;
    }
    .fi-tran {
      transform: rotate(-45deg) scale(70%);
    }
    .fi-title {
      color: #34395e;
      font-size: 12px;
      position: relative;
      z-index: 1;
    }
  }
  .fl-prev {
    .fi-mask {
      width: calc(100% - 2px);
      height: 42px;
      background: #fff;
      border-radius: 4px 0 0 4px;
      position: absolute;
      top: 1px;
      left: 1px;
      .icon-sj-mask {
        position: absolute;
        right: -42px;
        top: 0;
        width: 2px;
        height: 2px;
        border: 21px solid;
        border-top-color: transparent !important;
        border-bottom-color: transparent !important;
        border-right-color: transparent !important;
        border-left-color: #fff;
        z-index: 1;
      }
    }
  }
  .fl-current {
    .fi-title {
      color: #fff;
    }
    .fi-tag {
      background: #fff;
    }
  }
}
</style>
