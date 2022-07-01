<template>
  <div class="card-box">
    <el-button v-if="cardClaimPermit" class="child_border_color btn_bg_color font-f" round size="medium" @click="$refs.get_card.show()">认领读者证</el-button>
    <div class="item-box" v-if="dataKey">
      <!-- 读者卡列表 -->
      <el-row :gutter="10" class="crad-item" v-for="item in cardList" :key="item.id">
        <el-col :span="6" class="number">{{item.typeName || '读者证号'}}：{{item.no}}</el-col>
        <el-col :span="2" :class="item.status==1?'green':''">{{getKeyValue(item.status)}}</el-col>
        <el-col :span="8">有效期：{{setTime(item.issueDate)}}至{{setTime(item.expireDate)}}</el-col>
        <el-col :span="2"><span class="bule" @click="handleSet(item.id)" v-if="!item.isPrincipal">设为主卡</span></el-col>
        <el-col :span="6">
          <el-button size="mini" round class="new-btn bule-color" icon="el-icon-view" @click="$refs.card_detail.show(item.id)" v-if="item.status==1">查看</el-button>
          <el-button size="mini" round class="new-btn bule-color" icon="el-icon-edit" @click="$refs.password.show(item.id)" v-if="item.status==1">修改密码</el-button>
        </el-col>
      </el-row>
      <h1>申请记录</h1>
      <!-- 审核的读者卡列表 -->
      <el-row :gutter="10" class="crad-item" v-for="item in reviewList" :key="item.id">
        <el-col :span="6" class="number">{{item.typeName || '读者证号'}}：{{item.no}}</el-col>
        <el-col :span="2" :class="item.status==1?'green':''">{{getKeyValue(item.status)}}</el-col>
        <el-col :span="8">有效期：{{setTime(item.issueDate)}}至{{setTime(item.expireDate)}}</el-col>
        <el-col :span="2">{{getKeyStatus(item.approveStatus)}}</el-col>
        <el-col :span="6">
          <!-- <el-button size="mini" round class="new-btn grey-color">{{getKeyStatus(item.approveStatus)}}</el-button> -->
          <el-button size="mini" round class="new-btn red-color" icon="el-icon-close" v-if="item.approveStatus==0" @click="handleCan(item.id)">撤销</el-button>
          <el-button size="mini" round class="new-btn red-color" icon="el-icon-delete-solid" v-if="item.approveStatus==-1||item.approveStatus==-2" @click="handleDel(item.id)">删除</el-button>
        </el-col>
      </el-row>
    </div>

    <!-- 弹窗组件 -->
    <password ref="password"></password>
    <get_card ref="get_card" @next="next"></get_card>
    <phone ref="phone" @next="subGet"></phone>
    <get_success ref="get_success"></get_success>

    <card_detail ref="card_detail"></card_detail>
  </div>
</template>

<script>
import { timeFormat } from "@/assets/public/js/util";

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
      cardList: [],
      reviewList: [],
      dataKey: null,
      setTime: timeFormat,
      cardClaimPermit: false,
    };
  },
  created() {
    this.getKey();
    this.checkCardClaimPermit();
    this.getCard();
    this.getCardReview();
  },
  mounted() { },
  methods: {
    // 获取用户信息
    getKey() {
      this.http.getJson('forward-init-data').then((res) => {
        this.dataKey = res.data;
      }).catch((err) => {
        this.$message({ type: "error", message: "获取读者信息失败!" });
      });
    },
    // 获取用户领卡权限
    checkCardClaimPermit() {
      this.http.getJson('forward-check-card-claim-permit').then((res) => {
        this.cardClaimPermit = res.data;
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
    // 获取读者卡审核数据
    getCardReview() {
      this.http.getJson('forward-reader-card-apply-list-data').then((res) => {
        this.reviewList = res.data;
      }).catch((err) => {
        this.$message({ type: "error", message: "获取读者信息失败!" });
      });
    },
    // 键值对匹配
    getKeyValue(val, code = 'Card_Status') {
      let select = this.dataKey.groupSelect.find(item => (item.groupCode == code));
      let items = select.groupItems.find(item => (item.value == val))
      return items ? items.key : '';
    },
    // 键值对匹配 审核状态
    getKeyStatus(val) {
      for (const key in this.dataKey.cardClaimStatus) {
        if (this.dataKey.cardClaimStatus[key] == val) {
          return key;
        }
      }
    },
    // 领取读者卡
    next(data) {
      this.$refs.phone.show(data);
    },
    //确认认领
    subGet(type) {
      this.$refs.get_success.show(type);
      this.getCardReview();
    },
    // 设为主卡
    handleSet(id) {
      this.http.postJsonSelf('forward-set-principal-card', `/${id}`).then((res) => {
        this.$message({ type: "success", message: "设为主卡成功!" });
        this.getCard();
      }).catch((err) => {
        this.$message({ type: "error", message: "设为主卡失败!" });
      });
    },
    // 撤销
    handleCan(id) {
      this.$confirm('是否确认撤销领卡申请?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.http.postJsonSelf('forward-cancel-card-confirm', `/${id}`).then((res) => {
          this.$message({ type: "success", message: "撤销成功!" });
          this.getCardReview();
        }).catch((err) => {
          this.$message({ type: "error", message: "撤销失败!" });
        });
      }).catch(() => {
        this.$message({ type: 'info', message: '已撤销领卡申请!' });
      });
    },
    // 删除
    handleDel(id) {
      this.$confirm('请谨慎执行删除操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.http.deleteJsonSelf('forward-card-claim', `/${id}`).then((res) => {
          this.$message({ type: "success", message: "删除成功!" });
          this.getCardReview();
        }).catch((err) => {
          this.$message({ type: "error", message: "删除失败!" });
        });
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除!' });
      });
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
h1 {
  font-size: 18px;
  font-weight: bold;
  line-height: 25px;
  margin: 30px 0 20px;
}
.font-f {
  color: #fff !important;
}
</style>
