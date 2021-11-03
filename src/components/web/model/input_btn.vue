<!----限定检索结果-下拉选择+输入框 -->
<template>
  <div class="selectinput-warp">
    <h2 class="b-search-title"><i class="icon-filter"></i><span>查找数据库</span></h2>
    <div class="box-search">
      <input type="text" placeholder="搜索数据库名称">
      <div class="btn"><button class="child1_bg">确定</button></div>
    </div><!--限定检索结果 end -->
  </div>
</template>

<script>
export default {
  name: 'selectinput',
  props:['title','datalist'],
  data () {
    return {
      left_menu_list:[],
    }
  },
  methods: {
    
  },
}
</script>

<style scoped lang="less">
@import "../../../assets/public/css/color.less";/**通用文件 */
.selectinput-warp{
    h2.b-search-title{
      font-size:18px;
      font-weight: normal;
      line-height: 40px;
      i.icon-filter{
        margin-right: 5px;
      }
    }
    .box-search{
      margin-bottom: 10px;
      padding: 20px 10px;
      background: #ffffff;
      border: 1px solid #d5e2e3;
      border-bottom: 5px solid #dceaf5;
      input{
        width: 100%;
        padding: 6px 8px;
        font-size: 14px;
        color: #303d3f;
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 3px;
        vertical-align: middle;
      }
      .btn{
        text-align: center;
        button{
          margin-top: 20px;
          outline: none;
          border: none;
          padding: 6px 5px;
          font-size: 14px;
          color: #fff;
          border-radius: 3px;
          vertical-align: middle;
          cursor: pointer;
          width: 100px;
        }
      }
    }
}
</style>



