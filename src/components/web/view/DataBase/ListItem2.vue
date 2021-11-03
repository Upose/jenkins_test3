<template>
  <div class="list-item-w child-border-color-hover">
    <div class="line1">
      <span class="text-color">{{ title }}</span>
      <span class="d-btn tab-bg-active" @click="$emit('handleCollege')">{{ btnText }}</span>
    </div>
    <div class="line2">
      <span>{{ desc }}</span>
      <div>
        <span>访问量：</span>
        <span class="text-color">{{ accessCount }}</span>
      </div>
    </div>
    <div
      class="line3"
      :style="{ visibility: labelType ? 'visible' : 'hidden' }"
    >
      <div>
        <el-image
          v-if="typename == '最近热门'"
          :src="require('../../../../assets/web/img/ic21.png')"
        ></el-image>
        <el-image
          v-if="typename == '经常访问'"
          :src="require('../../../../assets/web/img/ic22.png')"
        ></el-image>
        <span>{{ typename }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    desc: String,
    accessCount: String,
    typename: String, 
    btnText: {
      type: String,
      default: "详细"
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../../assets/web/css/style.less"; /**通用文件 */
@import "../../../../assets/web/css/color.less"; /**通用文件 */
.list-item-w {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #fff;
  height: 136px;
  padding: 20px;
  border: 2px solid transparent;
  margin-bottom: 15px;
  &:hover {
    border-color: #a21e1e;
  }
  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .d-btn {
    padding: 0 10px;
    height: 26px;
    text-align: center;
    line-height: 26px;
    font-size: 12px;
    background: #a21e1e;
    border-radius: 4px 4px 4px 4px;
    color: #fff;
    cursor: pointer;
    &:hover {
      background: rgba(162, 30, 30, 0.8);
    }
  }
  .line1 {
    & > span:first-child {
      font-size: 16px;
      color: #a21e1e;
    }
  }
  .line3 {
    .el-image {
      width: 16px;
      height: 16px;
      margin-right: 10px;
      float: left;
    }
    & > div >span {
      color: #999999;
      font-size: 12px;
      line-height: 16px;
      float: left;
    }
  }
 
  .line2 {
    & > span:first-child {
      font-size: 12px;
      color: #333;
    }
    & > div {
      display: flex;
      align-items: center;
      font-size: 14px;
      & > span:last-child {
        color: #a21e1e;
      }
    }
  }
}
</style>
