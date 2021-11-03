<template>
  <div class="list-item-w text-color-hover list-item-w-hover">
    <span class="dr"></span>
    <span class="i-title">{{ title }}<a href="">链接1</a><a href="">链接2</a></span>
    <span class="d-btn tab-bg-active tab-item-bg-color-hover-opacity ">详细</span>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  }
};
</script>

<style lang="less" scoped>
@import "../../../../assets/web/css/style.less"; /**通用文件 */
@import "../../../../assets/web/css/color.less"; /**通用文件 */
.list-item-w {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  font-size: 14px;
  height: 45px;
  & > span:first-child::before {
    display: inline-block;
    content: "";
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: #bbbbbb;
    margin-right: 14px;
    margin-left: 8px;
  }
  &:hover {
    color: #a21e1e;
  }
  & > span:nth-child(2) {
    // padding: 15px 0;
    line-height: 45px;
    flex: 1;
    border-bottom: 1px dashed #bbbbbb;
    & > a{
      margin-left:5px;
      color: #0D79AB;
    }
  }
  .d-btn {
    width: 44px;
    height: 26px;
    text-align: center;
    line-height: 26px;
    background: #a21e1e;
    border-radius: 4px 4px 4px 4px;
    color: #fff;
    margin: 0 15px;
    cursor: pointer;
  }
}
.list-item-w:last-child {
  .i-title {
    border: none;
  }
}
</style>
