<!--
 * @Author: huyu
 * @Date: 2022-11-02 15:26:09
 * @LastEditors: huyu
 * @LastEditTime: 2022-11-02 17:14:55
 * @Description: 校友导航
-->
<template>
  <div class="sf-box">
    <div class="sf-top-box">
      <div class="sf-title">
        <span>服务简介</span>
        <i class="sf-icon-triangle"></i>
      </div>
      <div class="sf-top-info">校友服务是重庆大学针对毕业校友推出的服务，毕业校友凭借身份证复印件办理校友借阅卡，继续享受同在校生一样的服务，包括部分免费的数字资源服务、文献传递服务、会议服务、参观访问、展览服务、移动图书馆服务、微信服务等，还可凭校友借阅卡提前一天预约使用信息检索室免费检索数字资源。校友卡一经办理，终身有效。</div>
      <div class="sf-top-call">
        <div class="sf-call-info"><i class="sf-icon-fwbm"></i>服务部门：网络服务部</div>
        <div class="sf-call-info"><i class="sf-icon-lxfs"></i>联系方式：023-65106455</div>
        <div class="sf-call-info"><i class="sf-icon-email"></i>Email：xyfw@cqu.edu.cn</div>
      </div>
    </div>
    <i class="sf-icon-line"></i>
    <div class="sf-bottom-box">
      <div class="sf-title">
        <span>{{data.columnName}}</span>
        <i class="sf-icon-triangle"></i>
      </div>
      <div class="sf-bottom-info">
        <div class="sf-navi-box" v-for="(item,index) in data.catalogueList" :key="item.id" v-if="index<9">
          <div class="sf-navi-icon">
            <img :src="fileUrl+item.cover" alt="">
          </div>
          <div class="sf-navi-title">{{item.title}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      imgPath: window.localStorage.getItem('fileUrl') + '/public/image/',//公共图片路径
      fileUrl: window.localStorage.getItem('fileUrl'),//图片地址前缀
      post_url_vip: window.apiDomainAndPort,
      data: {},
    };
  },
  created() { },
  mounted() {
    this.initData([{ count: 12, columnId: "41ead105-4817-4047-98d2-93bceebb07dc", sortField: "Default" }])
  },
  methods: {
    initData(list) {
      var post_url = this.post_url_vip + '/navigation/api/navigation/getprontscenescatalogue';
      axios({
        url: post_url,
        method: 'POST',
        data: list,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
        },
      }).then(res => {
        if (res.data && res.data.statusCode == 200) {
          this.data = res.data.data[0] || [];
        }
        this.request_of = false;
      }).catch(err => {
        this.request_of = false;
        console.log(err);
      });
    },
  },
};
</script>

<style scoped lang="less">
.sf-box {
  width: 1200px;
  height: 300px;
  background: #f6f7fa;
  border-radius: 16px;
  padding: 20px;
  .sf-top-box {
    height: 125px;
    padding-bottom: 20px;
    display: flex;
    position: relative;
    .sf-top-info {
      width: 780px;
      line-height: 35px;
      margin-left: 20px;
    }
    .sf-top-call {
      position: absolute;
      top: -20px;
      right: 0;
      width: 273px;
      height: 164px;
      padding: 37px 0 0 47px;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAREAAACjCAYAAACt4SpEAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFFmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDIgNzkuMTY0NDg4LCAyMDIwLzA3LzEwLTIyOjA2OjUzICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjIuMCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIyLTExLTAyVDE1OjMzOjE3KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMi0xMS0wMlQxNjoxMDo0MiswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMi0xMS0wMlQxNjoxMDo0MiswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowNDk1MjUxYy0yZjY5LThl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);

      .sf-call-info {
        display: flex;
        color: #6a50ef;
        height: 26px;
        .sf-icon-fwbm {
          width: 18px;
          height: 16px;
          margin-right: 7px;
          background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAQCAYAAAAbBi9cAAAABHNCSVQICAgIfAhkiAAAAXpJREFUOE+Nk8FRwzAQRVccgBu4goQKkhKcDkQFhBtwIakAUwHmArklVICoAJdgKsBUYDjCAfO/YiWyUCA74xlrV/u0f1dSEti5rrUSuYJ7iK/8Fplyy47IjfM1Itf3JjF+KnLWdqbrFAnPITy2xgGjmUkKF+uALnSdI3C5DQhVPaCqcRQEWQuQT7YBYc/TnUn0JtAEIPbiX0NFU1REBdY60uhAVSWcg79IgLwAwmGsTLHB+5hObpJ3etGnYSNNoUQdxGCIfSCWQlbJ+ETXh59KBgqJTTiBTbAQQpCbtGqlGJyQ+RXYk0RQ2VIm5eDTGHnl78OhGf0ELRDoQfMolOJg9O+JpE6+vw/5BdYVe9THJXzF4hRVEdoxwuiIQVDNGKE5WnNkp+Yc+M12RW5jSaHsr+XFZTtsAavxtzAGetCcQ6p9Y6F5t/+NIKcido/4aB8BOw4fZvugo7FfIFbABiJQhJNsJ5TigDSsNAqiTDSw8l83E9s7048N5Qfrfq8oHntkaQAAAABJRU5ErkJggg==);
        }
        .sf-icon-lxfs {
          width: 18px;
          height: 18px;
          margin-right: 7px;
          background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAABHNCSVQICAgIfAhkiAAAAc1JREFUOE99lM1VwkAUhWfcuAQqECsAKzBUQKhA2KmrUIF0ICt1J1RgrACoQKyAWEFwqQvjd8MkJ+RMmHPmTDLz3n33/VrjWbdhGpwZc8NT321JbbX/jFm+xJ11Xc1WL+7DtJ8Z88hlwPnJGfOeOJkudyF3Pc415/Qp7gg8XyWQQPhfIfTFjnxWpSC2KM3ZF/wOCrAcqALy/hx3xrqLwrT9A7NzrM/jzr7uyl2YLlAeFmA5EJfyuQ2IWMlqlxh98Llk77E6qwM5PbmWojewLrArgjgo3IGhFB9wUUBdBAMfUFXXiiJC/YJNxVUxMoCNeFPQvQv9PJsC2io7dfqwSgDZiXYTiDMq9kOLAvJmApCYlatwr+qyDxC5MfevjUCHrGWJNXaHkasmViVQk2suKxFuP0J5Shksfo2ZARrVmeeF6uqh12TVGVI1JwBsFFjiNi/AymD70l+1WHGx5cqhzPBR+p0L6p1WE6tDD2ZrOkqZDKm3RAZwVS31rTorW0SCBPYNsMmpdOvNgRC7bIROoH47aloHtiPl01NNS/sI5LIAEbhvjKizrxVUdpzZwxixmelyhGyNmg0ykXeMVN1xo0KF1tf80Zvmk8A5Fz62/wjCA8CasclAAAAAAElFTkSuQmCC);
        }
        .sf-icon-email {
          width: 18px;
          height: 18px;
          margin-right: 7px;
          background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAABHNCSVQICAgIfAhkiAAAAj1JREFUOE+VVE1r1FAUPTcVpqCCsQruLFqwO3VbUKs7FzKhoiKI07oQ21X8Bba/YGbVFhc6FV0oWDMLcWdFwXW7UxhltsLYKI5Q0cn13GfSNjWd0kCSl9x3zzv33A9BwXU7iMM9QEWBIQH22RauO1w3/wAL9yO/ttWNto1rsrx6RiGLnuCQqn4E5L0I3jogxVk+R0TkRKJoC3RsrnHwXea9DjRV/npNpe8xPX6oYGw+8t8Usb0TxKOiWITIftHujdnGwFPb54CMCcR7DU1elURu1iL/WxFI9i8M4gO/VB/R5yJ9LhizFChuc5NXEhzbCSQPhs/Urjvf8A9LKmw1Ac5bOO40wclejEqKFTvQwvSAJSbgrkwG8TJ16Se9YXOmcZA0p3lXisDIYKEEhBlzyvKBeq0JFx1K9Wyu4d8yx6kgnubrKB2YsDyYgaTCtmYj3/ZR3/gBs3mVjFaZJJmgob4J6B7XdTquEKyaMpvg92gKPpMB8eBx2h9uC2Sn865Tg0EDooYtgoxvBaI0IRlVC0MjgDkvGxuuozScgO+Q36f5vyi0vNgua0BtO7EtZLKbYYZbLjnluEkxO4XpXwNO9Up/P9n+l/5U+bYpzg3Hd1OQPPATu/k3C/LIRotAlgj6ktVd2QnsX4u4UrhEoc+tt4hLuzUtvCdk9p2fl3s1Le3P2bi+ILmea9pMD9e8kBcUbyBRtYrNjxHVEU9kmGPkC8fIlcIxsllc678+1gxbZ4jzYa+zKX4SuNll1ooG219QuSK+SI2xxAAAAABJRU5ErkJggg==);
        }
      }
    }
  }
  .sf-icon-line {
    display: block;
    height: 5px;
    border-top: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
  }
  .sf-bottom-box {
    height: 125px;
    padding-top: 15px;
    display: flex;
    .sf-bottom-info {
      height: 100%;
      margin-left: 20px;
      overflow: hidden;
      display: flex;
      .sf-navi-box {
        width: 110px;
        height: 110px;
        flex-shrink: 0;
        background: #fff;
        border-radius: 5px;
        margin-right: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }
        .sf-navi-icon {
          width: 53px;
          height: 54px;
          background: url(data:image/png;base64,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);
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 24px;
            height: auto;
          }
        }
        .sf-navi-title {
          width: 100%;
          margin-top: 8px;
          padding: 0 10px;
          text-align: center;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
  .sf-title {
    display: inline-block;
    width: 45px;
    height: 100%;
    padding-right: 24px;
    font-size: 16px;
    font-weight: bold;
    border-right: 1px solid #eff1f7;
    display: flex;
    align-items: center;
    .sf-icon-triangle {
      width: 0;
      height: 0;
      border: 4px solid;
      border-color: transparent transparent transparent #3a3536;
      margin-left: 5px;
    }
  }
}
</style>
