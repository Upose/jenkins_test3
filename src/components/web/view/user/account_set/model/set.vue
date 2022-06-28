<template>
  <div class="set-box" v-if="dataKey">
    <el-alert title="完成以下认证信息，可以加强您账户的安全性" type="warning" show-icon></el-alert>
    <h1>姓名：{{form.name}}</h1>
    <div class="set-item">
      <span class="img"><img v-show="form.idCardIdentity" src="../../../../../../assets/web/img/icon_safe.png" alt=""></span>
      <span class="name">身份证号</span>
      <span class="content">{{form.idCard}}</span>
      <span class="use" @click="$refs.set_idCard.show()" v-if="!isEdit('User_IdCard')">修改身份证</span>
    </div>
    <div class="set-item">
      <span class="img"><img v-show="form.mobileIdentity" src="../../../../../../assets/web/img/icon_safe.png" alt=""></span>
      <span class="name">手机号码</span>
      <span class="content">{{form.phone}}</span>
      <span class="use" @click="$refs.set_phone.show()" v-if="!isEdit('User_Phone')">修改手机</span>
    </div>
    <div class="set-item">
      <span class="img"><img v-show="form.emailIdentity" src="../../../../../../assets/web/img/icon_safe.png" alt=""></span>
      <span class="name">常用邮箱</span>
      <span class="content">{{form.email}}</span>
      <span class="use" @click="$refs.emil.show()" v-if="!isEdit('User_Email')">修改邮箱</span>
    </div>

    <template>
      <h1>社交账号绑定</h1>
      <div class="set-item">
        <span class="img big"><img src="../../../../../../assets/web/img/wex.png" alt=""></span>
        <span class="name">微信账号</span>
        <span class="content" v-if="form.weChatOpenId">{{form.weChatNickName}}</span>
        <span class="use" @click="unwxBindHandle" v-if="form.weChatOpenId">解除绑定</span>
        <span class="use" @click="openWxBindList" v-else>立即设置</span>
      </div>
      <div class="set-item" v-if="form.QQOpenId">
        <span class="img big"><img src="../../../../../../assets/web/img/qq.png" alt=""></span>
        <span class="name">QQ账号</span>
        <span class="content" v-if="form.QQOpenId">{{form.QQNickName}}</span>
        <!-- <span class="use" v-if="form.weChatOpenId">解除绑定</span> -->
        <!-- <span class="use" v-else>立即设置</span> -->
      </div>
    </template>

    <!-- 弹窗组件 -->
    <set_phone ref="set_phone" @change="getInfo"></set_phone>
    <emil ref="emil" @change="getInfo"></emil>
    <set_idCard ref="set_idCard" @change="getInfo"></set_idCard>
    <dialog_code ref="dialogCode"></dialog_code>
  </div>
</template>

<script>
import set_phone from '@/components/web/view/user/account_set/model/dialog/set_phone'
import emil from '@/components/web/view/user/account_set/model/dialog/emil'
import set_idCard from '@/components/web/view/user/account_set/model/dialog/set_idCard'
import dialog_code from '@/components/web/view/user/account_set/model/dialog_code';
export default {
  name: "index",
  props: {},
  components: { set_phone, emil, set_idCard, dialog_code },
  data() {
    return {
      form: {},
      dataKey: null,
      updateReaderInfo: false,
    };
  },
  created() {
    this.getInfo();
    this.getKey();
    this.checkModifyReaderPermit();
  },
  mounted() {
    if (this.$route.query.weChatNickName && this.$route.query.wechatOpenId) {
      this.wxBindHandle();
    }
  },
  methods: {
    // 绑定信息
    openWxBindList() {
      setTimeout(() => {
        // 二维码
        this.$refs.dialogCode.show();
      }, 100)
    },
    // 绑定用户到后端
    wxBindHandle() {
      let datas = {
        openId: this.$route.query.wechatOpenId,
        weChatNickName: this.$route.query.weChatNickName,
      };
      this.http.postJson('forward-reader-bind-wechat', datas).then((res) => {
        this.$message({ type: "success", message: "用户绑定微信成功!" });
      }).catch((err) => {
        this.$message({ type: "error", message: err.errors?err.errors:"用户绑定微信失败!" });
      });
    },
    // 解除绑定
    unwxBindHandle() {
      let datas = {
        openId: this.form.weChatOpenId,
        unionId: this.form.weChatUnionId,
        weChatNickName: this.form.weChatNickName,
      };
      this.http.postJson('reader-un-bound-we-chat', datas).then((res) => {
        this.$message({ type: "success", message: "解除微信绑定成功!" });
      }).catch((err) => {
        this.$message({ type: "error", message: err.errors?err.errors:"解除微信绑定失败!" });
      });
    },
    // 获取用户信息
    getKey() {
      this.http.getJson('forward-init-data').then((res) => {
        this.dataKey = res.data;
      }).catch((err) => {
        this.$message({ type: "error", message: "获取读者信息失败!" });
      });
    },
    // 获取用户信息
    getInfo() {
      this.http.getJson('forward-reader-account-info').then((res) => {
        this.form = res.data;
      }).catch((err) => {
        this.$message({ type: "error", message: "获取读者信息失败!" });
      });
    },
    // 获取用户修改信息权限
    checkModifyReaderPermit() {
      this.http.getJson('forward-check-modify-reader-permit').then((res) => {
        this.updateReaderInfo = res.data;
      });
    },
    // 是否不可编辑
    isEdit(code) {
      let isedit = true;
      if (this.updateReaderInfo) {
        let item = this.dataKey.readerEditProperties.find(item => (item.propertyCode == code));
        isedit = item ? false : true;
      } else {
        isedit = true;
      }
      return isedit;
    },
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

  .set-item {
    margin-bottom: 40px;
    display: flex;
    align-items: center;
    .img {
      width: 16px;
      height: 16px;
      margin-right: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .big {
      width: 30px;
      height: 30px;
    }
    .name {
      width: 80px;
    }
    .content {
      width: 250px;
    }
    .use {
      color: #458dda;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
  }
}
</style>
