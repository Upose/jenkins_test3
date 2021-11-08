<template>
  <div class="card-box">
    <el-button type="primary" round size="medium" @click="$refs.get_card.show()">认证读者证</el-button>
    <div class="item-box" v-if="dataKey">
      <el-row :gutter="10" class="crad-item" v-for="item in cardList" :key="item.id">
        <el-col :span="6" class="number">读者证号：{{item.no}}</el-col>
        <el-col :span="2" :class="item.status==1?'green':''">{{getKeyValue(item.status)}}</el-col>
        <el-col :span="8">有效期：{{setTime(item.issueDate)}}</el-col>
        <el-col :span="2"><span class="bule">设为主卡</span></el-col>
        <el-col :span="6">
          <el-button size="mini" round class="new-btn bule-color" icon="el-icon-view" @click="$refs.card_detail.show(item.id)" v-if="item.status==1">查看</el-button>
          <el-button size="mini" round class="new-btn bule-color" icon="el-icon-edit" @click="$refs.password.show(item.id)" v-if="item.status==1">修改密码</el-button>
          <!-- <el-button size="mini" round class="new-btn grey-color" v-if="item.status==1">待审核</el-button> -->
          <!-- <el-button size="mini" round class="new-btn red-color" icon="el-icon-close" v-if="item.status==1">撤销</el-button> -->
          <!-- <el-button size="mini" round class="new-btn red-color" icon="el-icon-delete-solid" v-if="item.status==2">删除</el-button> -->
        </el-col>
      </el-row>
    </div>

    <!-- 弹窗组件 -->
    <password ref="password"></password>
    <get_card ref="get_card" @next="next"></get_card>
    <phone ref="phone" @next="$refs.get_success.show()"></phone>
    <get_success ref="get_success"></get_success>

    <card_detail ref="card_detail"></card_detail>
  </div>
</template>

<script>
import {timeFormat} from "@/assets/public/js/util";

import password from '@/components/web/view/user/account_set/model/dialog/password'
import get_card from '@/components/web/view/user/account_set/model/dialog/get_card'
import phone from '@/components/web/view/user/account_set/model/dialog/phone'
import get_success from '@/components/web/view/user/account_set/model/dialog/get_success'
import card_detail from '@/components/web/view/user/account_set/model/dialog/card_detail'

export default {
  name: "index",
  props: {},
  components: { password, get_card, phone, get_success, card_detail },
  data() {
    return {
      cardList: {},
      dataKey:null,
      setTime:timeFormat
    };
  },
  created() {
    this.getKey();
    this.getCard();
  },
  mounted() {},
  methods: {
    // 获取用户信息
    getKey() {
      this.http.getJson('forward-init-data').then((res) => {
        this.dataKey = res.data;
      }).catch((err) => {
        this.$message({ type: "error", message: "获取读者信息失败!" });
      });
    },
    // 获取读者卡数据
    getCard() {
      this.http.getJson('forward-reader-card-list-data').then((res) => {
        this.cardList = res.data;
      }).catch((err) => {
        this.$message({ type: "error", message: "获取读者信息失败!" });
      });
    },
    // 领取读者卡
    next(data) {
      this.$refs.phone.show(data);
    },
    getKeyValue(val,code='Card_Status'){
      let select = this.dataKey.groupSelect.find(item => (item.groupCode == code));
      let items = select.groupItems.find(item=>(item.value == val))
      return items?items.key:'';
    },
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
