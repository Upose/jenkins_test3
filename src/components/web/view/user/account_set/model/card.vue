<template>
  <div class="card-box">
    <el-button type="primary" round size="medium" @click="$refs.get_card.show()">认证读者证</el-button>
    <div class="item-box">
      <el-row :gutter="10" class="crad-item">
        <el-col :span="6" class="number">读者证号：01111</el-col>
        <el-col :span="2" class="green">正常</el-col>
        <el-col :span="8">有效期：2013-09-12 99:00:00</el-col>
        <el-col :span="2"><span class="bule">设为主卡</span></el-col>
        <el-col :span="6">
          <el-button size="mini" round class="new-btn bule-color" icon="el-icon-view" @click="$refs.card_detail.show()">查看</el-button>
          <el-button size="mini" round class="new-btn bule-color" icon="el-icon-edit" @click="$refs.password.show()">修改密码</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="crad-item">
        <el-col :span="6" class="number">读者证号：01111</el-col>
        <el-col :span="2" class="green">正常</el-col>
        <el-col :span="8">有效期：2013-09-12 99:00:00</el-col>
        <el-col :span="2"><span class="bule">设为主卡</span></el-col>
        <el-col :span="6">
          <el-button size="mini" round class="new-btn grey-color">待审核</el-button>
          <el-button size="mini" round class="new-btn red-color" icon="el-icon-close">撤销</el-button>
          <el-button size="mini" round class="new-btn red-color" icon="el-icon-delete-solid">撤销</el-button>
        </el-col>
      </el-row>
    </div>

    <!-- 弹窗组件 -->
    <password ref="password"></password>
    <get_card ref="get_card" @next="$refs.phone.show()"></get_card>
    <phone ref="phone" @next="$refs.get_success.show()"></phone>
    <get_success ref="get_success"></get_success>

    <card_detail ref="card_detail"></card_detail>
  </div>
</template>

<script>
import password from '@/components/web/view/user/account_set/model/dialog/password'
import get_card from '@/components/web/view/user/account_set/model/dialog/get_card'
import phone from '@/components/web/view/user/account_set/model/dialog/phone'
import get_success from '@/components/web/view/user/account_set/model/dialog/get_success'
import card_detail from '@/components/web/view/user/account_set/model/dialog/card_detail'

export default {
  name: "index",
  props: {},
  components: { password, get_card, phone, get_success,card_detail },
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
.card-box {
  padding: 40px 40px 290px;

  .item-box {
    margin-top: 32px;
  }

  .crad-item {
    width: 100%;
    height: 60px;
    background: #ffffff;
    color: #666;
    border: 1px solid rgba(0, 0, 0, 0.0588235294117647);
    border-radius: 4px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    padding: 0 20px;

    .number {
      font-weight: bold;
      color: #333;
    }
    .green {
      color: #4fcd92;
    }
    .bule {
      color: #458dda;
      cursor: pointer;
    }
  }
}
.new-btn {
  background: #fafafa;
  border: none;
  &:hover {
    opacity: 0.9;
  }
}
.bule-color {
  color: #458dda;
}
.red-color {
  color: #a21e1e;
}
.grey-color {
  color: #666;
}
</style>
