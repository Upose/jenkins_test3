<!--
 * @Author: huyu
 * @Date: 2022-12-28 19:10:37
 * @LastEditors: huyu
 * @LastEditTime: 2023-01-05 15:28:43
 * @Description: 账号激活
-->
<template>
  <div class="container">
    <div class="content-box">
      <TopTitle :topParms="topParms" :bList="bList"></TopTitle>
      <div class="content" v-loading="loading">
        <FlowList :flow="flow" :curFlowIndex="curFlowIndex"></FlowList>
        <template v-if="curFlowIndex<flow.length">
          <div class="act-cont">
            <div class="ac-title flex-row-start">{{curFlow.title}}<span class="ac-tip">{{tips}}</span></div>
            <div class="ac-info" @scroll="scrollContent" ref="flowBox">
              <div v-html="curFlow.contents" ref="flowCont"></div>
            </div>
          </div>
          <div class="act-btn flex-row-center tbg-c2 hover-op" :class="{'hover-no':!isToNext}" @click="goNext">
            <span class="ab-title">下一步</span>
            <span class="ab-tag flex-row-center"><i class="el-icon-right"></i></span>
            <i class="icon-sj tbg-c2"></i>
          </div>
        </template>
        <div class="act-suceess tbg-c2 flex-column-center" v-else-if="flow.length!=0">
          <div class="au-info">
            <i class="el-icon-success"></i>
            激活已完成
          </div>
          <div class="au-btn tbg-c2 hover-op" @click="goIndex">前往首页</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopTitle from '@/components/web/view/activate/components/TopTitle';
import FlowList from '@/components/web/view/activate/components/FlowList';
export default {
  components: {
    TopTitle,
    FlowList
  },
  props: {},
  data() {
    return {
      topParms: {
        bgUrl: '/public/image/search-bg/journalsubscribe.png',
        logoUrl: this.$store.state.appInfo.appIcon,
      },//顶部所需信息
      bList: [
        { name: '账号激活' },
      ],//面包屑参数

      loading: false,
      flow: [],// 流程列表
      isBlocking: true,// 流程阻塞
      curFlow: {},// 当前流程
      curFlowIndex: 0,// 当前流程下标
      isToNext: false,//是否可以点击下一步
      tips: '',//流程阻塞提示
      countdownTimer: null,//浏览倒计时
    };
  },
  created() {
    // 设置网页标题
    document.title = '账号激活-' + this.$store.getters.appInfo.appName + '-' + JSON.parse(localStorage.getItem('orgInfo')).orgName;
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      this.$http.getJson('activate-front-activate-definition-list', {}).then(res => {
        this.flow = res.data.definitionList;
        this.isBlocking = res.data.isBlocking;
        this.curFlow = res.data.definitionList[0];
        this.loading = false;
        this.$nextTick(() => {
          this.setIsNext();
        })
      }).catch(err => {
        this.loading = false;
        this.$message({ type: 'error', message: '获取激活流程失败!' });
      })
    },
    goIndex() {
      let url = this.$setHref({ type: 'dlib', url: ['index'] }) || location.origin;
      window.location.replace(url);
    },
    // 激活成功
    activateSuccess() {
      this.$http.postJson('activate-activate-reader', {}).then(res => {
        this.curFlowIndex += 1;
      }).catch(err => {
        this.$message({ type: 'error', message: '激活失败!' });
      })
    },
    goNext() {
      if (!this.isToNext) return;
      if (this.curFlowIndex < this.flow.length - 1) {
        this.curFlowIndex += 1;
        this.curFlow = this.flow[this.curFlowIndex];
        this.setIsNext();
      } else {
        this.activateSuccess();
      }
    },
    // 进入下一步
    setIsNext() {
      this.$refs.flowBox.scrollTop = 0;
      if (this.isBlocking == false) {
        this.isToNext = true;
        this.tips = '';
        return;
      }
      if (this.curFlow.finishType == 1) {
        this.isToNext = true;
        this.tips = '';
        return;
      }
      if (this.curFlow.finishType == 2) {
        this.isToNext = false;
        let countdown = this.curFlow.countdown;
        this.tips = `（需浏览${countdown}秒后进行下一步！）`;
        this.countdownTimer = setInterval(() => {
          if (countdown > 0) {
            this.tips = `（需浏览${countdown}秒后进行下一步！）`;
            countdown -= 1;
          } else {
            this.tips = '（浏览时间到，可进行下一步！）';
            this.isToNext = true;
            clearInterval(this.countdownTimer);
          }
        }, 1000);
        return;
      }
      if (this.curFlow.finishType == 3) {
        this.isToNext = false;
        this.tips = `（需浏览至内容底部后进行下一步！）`;
      }
    },
    // 滚动监听
    scrollContent() {
      if (this.isBlocking && this.curFlow.finishType == 3) {
        if (this.$refs.flowBox.scrollTop + 660 < this.$refs.flowCont.offsetHeight) {
          this.isToNext = false;
        } else {
          this.isToNext = true;
        }
      }
    }
  },
};
</script>

<style scoped lang="less">
.content {
  width: 1200px;
  margin: 0 auto;
  min-height: calc(100vh - 300px);
  padding: 20px 0 100px;
}
.act-cont {
  width: 1200px;
  height: 753px;
  background: #ffffff;
  border: 1px solid #dadce0;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  padding: 0 20px 20px;
  margin-top: 20px;
  .ac-title {
    height: 58px;
    color: #353535;
    font-size: 20px;
    font-weight: bold;
    border-bottom: 1px solid #e6e6e6;
    .ac-tip {
      color: #666;
      font-size: 14px;
      margin-left: 10px;
      font-weight: normal;
    }
  }
  .ac-info {
    margin-top: 14px;
    height: 660px;
    background: #ececec;
    overflow-y: scroll;
  }
}
.act-suceess {
  width: 1200px;
  height: 753px;
  margin-top: 20px;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  background-image: url(~@/assets/web/img/bg-success.png);
  background-size: 100% 100%;
  overflow: hidden;
  .au-info {
    font-size: 36px;
    // font-weight: bold;
    line-height: 56px;
    margin-bottom: 26px;
    i {
      font-size: 40px;
      color: #8cc63f;
    }
  }
  .au-btn {
    width: 172px;
    height: 50px;
    border-radius: 5px;
    text-align: center;
    line-height: 50px;
    color: #fff;
    font-size: 18px;
    // font-weight: bold;
  }
}
.act-btn {
  width: 150px;
  height: 50px;
  background: #e3e3e3;
  border-radius: 0 4px 4px 0;
  position: relative;
  color: #fff;
  margin-top: 20px;
  float: right;
  font-size: 18px;
  // font-weight: bold;
  .ab-tag {
    width: 18px;
    height: 18px;
    border: 1px solid #fff;
    border-radius: 50%;
    margin-left: 10px;
    font-size: 14px;
  }
  .icon-sj {
    position: absolute;
    left: -20px;
    top: 0;
    height: 50px;
    width: 40px;
    transform: skew(-32deg);
    border-radius: 4px;
  }
  &.hover-no {
    opacity: 0.6;
    &:hover {
      cursor: not-allowed;
    }
  }
}
</style>
