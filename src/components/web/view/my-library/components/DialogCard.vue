<!--
 * @Author: huyu
 * @Date: 2023-01-09 14:50:33
 * @LastEditors: huyu
 * @LastEditTime: 2023-01-09 14:56:48
 * @Description: 读者卡列表
-->
<template>
  <el-dialog append-to-body title="切换主卡" :visible.sync="dialogVisible" width="480px" :before-close="dialogBeforeClose">
    <div>
      <div class="card" v-for="(item,index) in curCardList" :key="item.id">
        <el-checkbox v-model="item.isPrincipal" class="c-box" @change="handleChange(index)"></el-checkbox>
        <h6>{{item.displayNo}}</h6>
        <p>{{item.studentNo}}</p>
        <p>有效期至 {{setTime(item.expireDate)}}</p>
        <span class="green" v-if="item.status==1">正常</span>
        <span class="yellow" v-if="item.status==2">挂失</span>
        <span class="gery" v-if="item.status==3">停用</span>
        <span class="gery" v-if="item.status==0">未激活</span>
      </div>
    </div>
    <div slot="footer">
      <el-button type="info" @click="dialogVisible = false">取 消</el-button>
      <el-button class="btn_bg_color child-border-color" type="primary" @click="handleSet" v-button-debounce>确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { timeFormat } from "@/assets/public/js/util";

export default {
  name: "index",
  props: ['dataKey', 'cardList'],
  components: {},
  computed: {
    curCardList() {
      return this.cardList
    }
  },
  data() {
    return {
      dialogVisible: false,
      setTime: timeFormat
    };
  },
  created() {

  },
  mounted() {

  },
  methods: {
    show() {
      this.dialogVisible = true;
    },
    // 选择
    handleChange(ind) {
      this.curCardList.forEach((item) => {
        item.isPrincipal = false;
      })
      this.curCardList[ind].isPrincipal = !this.curCardList[ind].isPrincipal
    },
    // 设为主卡
    handleSet() {
      let id = '';
      this.curCardList.forEach(item => {
        if (item.isPrincipal) {
          id = item.id;
        }
      })
      if (id == '') {
        this.$message({
          message: '请选择读者卡！',
          type: 'warning'
        })
        return
      }
      this.http.postJsonSelf('forward-set-principal-card', `/${id}`).then((res) => {
        this.$message({ type: "success", message: "设为主卡成功!" });
        // this.$emit('update');
        this.dialogVisible = false
      }).catch((err) => {
        this.$message({ type: "error", message: "设为主卡失败!" });
      });
    },
  },
};
</script>

<style scoped lang="less">
.card {
  width: 400px;
  height: 120px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 16px;
  padding: 20px 20px 20px 50px;
  position: relative;
  margin: 0 auto 20px;
  .c-box {
    position: absolute;
    top: 54px;
    left: 20px;
  }

  h6 {
    font-size: 18px;
  }
  p {
    color: #666;
    margin-top: 8px;
  }
  & > span {
    position: absolute;
    top: 20px;
    right: 0;
    padding: 6px 10px 6px 14px;
    border-radius: 20px 0 0 20px;
  }
  .green {
    color: #4fcd92;
    background: #e5f8ef;
  }
  .yellow {
    color: #ffa520;
    background: #fff2dd;
  }
  .gery {
    color: #555;
    background: #eee;
  }
}
</style>
