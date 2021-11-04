<template>
  <div class="set-box">
    <el-alert title="完成以下认证信息，可以加强您账户的安全性" type="warning" show-icon></el-alert>
    <h1>姓名：李欣欣</h1>
    <div class="set-item">
      <span class="img"><img src="../../../../../../assets/web/img/icon_safe.png" alt=""></span>
      <span class="name">身份证号</span>
      <span class="content">9398574664773378</span>
    </div>
    <div class="set-item">
      <span class="img"><img src="../../../../../../assets/web/img/icon_safe.png" alt=""></span>
      <span class="name">手机号码</span>
      <span class="content">9398574664773378</span>
      <span class="use" @click="$refs.set_phone.show()">修改手机</span>
    </div>
    <div class="set-item">
      <span class="img"><img src="../../../../../../assets/web/img/icon_safe.png" alt=""></span>
      <span class="name">常用邮箱</span>
      <span class="content">9398574664773378</span>
      <span class="use" @click="$refs.emil.show()">修改邮箱</span>
    </div>

    <h1>社交账号绑定</h1>
    <div class="set-item">
      <span class="img big"><img src="../../../../../../assets/web/img/wex.png" alt=""></span>
      <span class="name">微信账号</span>
      <span class="content">9398574664773378</span>
      <span class="use">解除绑定</span>
    </div>
    <div class="set-item">
      <span class="img big"><img src="../../../../../../assets/web/img/qq.png" alt=""></span>
      <span class="name">QQ账号</span>
      <span class="content">9398574664773378</span>
      <span class="use">立即设置</span>
    </div>
    
    <!-- 弹窗组件 -->
    <set_phone ref="set_phone"></set_phone>
    <emil ref="emil"></emil>
  </div>
</template>

<script>
import set_phone from '@/components/web/view/user/account_set/model/dialog/set_phone'
import emil from '@/components/web/view/user/account_set/model/dialog/emil'
export default {
  name: "index",
  props: {},
  components: {set_phone,emil},
  data() {
    return {

    };
  },
  created() {

  },
  mounted() {

  },
  methods: {

  },
};
</script>

<style scoped lang="less">
.set-box {
  padding: 40px 80px 230px;
  h1 {
    font-size: 18px;
    font-weight: bold;
    line-height: 25px;
    margin: 20px 0 26px;
  }

  .set-item{
      margin-bottom: 40px;
      display: flex;
      align-items: center;
      .img{
          width: 16px;
          height: 16px;
          margin-right: 10px;
          img{
              width: 100%;
              height: 100%;
          }
      }
      .big{
          width: 30px;
          height: 30px;
      }
      .name{
          width: 80px;
      }
      .content{
          width: 250px;
      }
      .use{
          color: #458DDA;
          cursor: pointer;
          &:hover{
              opacity: .8;
          }
      }
  }
}
</style>
