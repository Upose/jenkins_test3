<!--
 * @Author: huyu
 * @Date: 2023-01-09 09:54:45
 * @LastEditors: huyu
 * @LastEditTime: 2023-01-09 15:11:34
 * @Description: 标题导航
-->
<template>
  <div class="head-box">
    <i class="icon-home tbg-c2"></i>
    <i class="icon-top-line tbg-c2"></i>
    <i class="icon-e-title tbg-c2">Personal Library</i>
    <span class="hb-title tfont-c2 tafter-bg-c2">{{userCenterName}}<i class="ht-line tbg-c2"></i></span>
    <div class="top-right flex-row-start">
      <a class="item flex-row-center" :href="$setHref({ type:'dlib',url:['workbench','/admin_workbench'] })" target="_blank" v-if="isStaff"><i class="icon-gy"></i>馆员工作台</a>
      <a class="item flex-row-center" :href="$setHref({ url:'/web_accountSet' })"><i class="icon-sz"></i>账号设置</a>
      <span class="set-item flex-row-center" @click="handleSetIndex" v-if="!curIsPersonalIndex"><i class="icon-swzy"></i>设为主页</span>
      <span class="set-item flex-row-center" @click="handleCancalSetIndex" v-else><i class="icon-swzy"></i>取消设为主页</span>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    isStaff: {
      default: false
    },
    tempParm: {
      default: {}
    }
  },
  data() {
    return {
      userCenterName: JSON.parse(localStorage.getItem('headerFooterInfo')).userCenterName || '个人图书馆',
      curIsPersonalIndex: this.tempParm.isPersonalIndex,
    };
  },
  created() { },
  mounted() { },
  methods: {
    // 设为首页
    handleSetIndex() {
      // this.http.postJson('forward-save-personal-scene', this.tempParm).then((res) => {
      //   this.http.getJson('forward-personal-scene-detail').then((res) => {
      //     this.http.putJsonSelf('forward-set-personal-default-scene', `/${res.data.id}/1`).then((res) => {
      //       this.curIsPersonalIndex = true;
      //     })
      //   })
      // })
      this.http.putJsonSelf('forward-set-personal-default-scene', `/${this.tempParm.id}/1`).then((res) => {
        this.curIsPersonalIndex = true;
      }).catch((err) => {
        this.$message({ type: "error", message: "设置失败!" });
      });
    },
    // 取消设为主页
    handleCancalSetIndex() {
      this.http.putJsonSelf('forward-set-personal-default-scene', `/${this.tempParm.id}/0`).then((res) => {
        this.curIsPersonalIndex = false;
      }).catch((err) => {
        this.$message({ type: "error", message: "取消失败!" });
      });
    },
  },
};
</script>

<style scoped lang="less">
.head-box {
  position: relative;
  margin-top: 10px;
  height: 76px;
  width: 1200px;
  background: linear-gradient(to right, rgba(255, 255, 255, 0.6), transparent);
  border-radius: 40px;
  .icon-home {
    position: absolute;
    top: 13px;
    left: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: url(~@/assets/web/img/personal/icon-home.png) no-repeat center;
  }
  .icon-top-line {
    position: absolute;
    top: 13px;
    left: 83px;
    width: 1px;
    height: 50px;
  }
  .icon-e-title {
    position: absolute;
    top: 13px;
    left: 98px;
    width: 100px;
    height: 23px;
    border-radius: 0 12px 0 12px;
    color: #fff;
    text-align: center;
    line-height: 23px;
    font-size: 12px;
  }
  .hb-title {
    display: block;
    float: left;
    position: relative;
    margin-top: 38px;
    margin-left: 98px;
    font-size: 20px;
    font-weight: bold;
    color: #a00404;
    .ht-line {
      position: absolute;
      top: 55%;
      left: 100%;
      margin-left: 23px;
      width: 880px;
      height: 1px;
      background-image: linear-gradient(
        to right,
        rgba(225, 225, 225, 0),
        rgba(225, 225, 225, 0.9)
      );
    }
  }
  .top-right {
    float: right;
    padding-top: 25px;
    span,
    a {
      margin-left: 20px;
      cursor: pointer;
      font-size: 16px;
      line-height: 16px;
      color: #333333;
      align-items: center;
      &:hover {
        opacity: 0.8;
      }

      i {
        display: inline-block;
        width: 16px;
        height: 16px;
        position: relative;
        margin-right: 6px;
      }
      .icon-gy {
        background: url(~@/assets/web/img/personal/icon_gy.png);
        background-size: 100% 100%;
      }
      .icon-sz {
        background: url(~@/assets/web/img/personal/icon_seting.png) no-repeat;
        background-size: 100% 100%;
      }
      .icon-swzy {
        background: url(~@/assets/web/img/personal/icon_swzy.png) no-repeat;
        background-size: 100% 100%;
      }
    }

    .set-item {
      height: 28px;
      padding: 0 16px;
      background: rgba(255, 255, 255, 0.5);
      color: #333333;
      border-radius: 16px;
    }
  }
}
</style>
