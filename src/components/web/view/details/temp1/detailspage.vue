<template>
<div class="databaseguide-warp">
      <div class="search-box">
        这里有搜索板块
      </div>
     <div class="m-width">
      <div class="sub-title">
        <div class="col">
          <i class="icon-database fonticon main_bg"></i><span class="intro main_text_color">数据库导航</span>
        </div>
      </div>

      <!-- 内容板块 -->
      <div class="db-content clearFloat">
        <div class="menu-warp">
          <input_btn></input_btn>
        </div>
        <div class="data-list">
          <div class="c1">
            <h1>CNKI中国知网</h1>
            <div class="database-site">
              <button class="dz">入口地址<i class="icon-chevron-down"></i></button>
              <div class="site-list">
                <ul>
                  <li><a href="/link/163/3/0">远程站点: http://www.cnki.net/ </a></li>
                </ul>
              </div>
              <div class="database-intro">
                <p><strong>内容分类：</strong>期刊&nbsp;&nbsp;&nbsp;学位论文&nbsp;&nbsp;&nbsp;会议&nbsp;&nbsp;&nbsp;专利&nbsp;&nbsp;&nbsp;报纸&nbsp;&nbsp;&nbsp;</p>
                <p><strong>学科分类：</strong>哲学&nbsp;&nbsp;&nbsp;经济学&nbsp;&nbsp;&nbsp;理学&nbsp;&nbsp;&nbsp;工学&nbsp;&nbsp;&nbsp;农学&nbsp;&nbsp;&nbsp;医学&nbsp;&nbsp;&nbsp;军事学&nbsp;&nbsp;&nbsp;</p>
              </div>
            </div>
          </div>
          <div class="more-sel">
            <a href="javascript:void(0);" :class="more_sel_index==0?'current':''" @click="more_sel_index=0"><i class="icon-read-record"></i>资源详情</a>
            <a href="javascript:void(0);" :class="more_sel_index==1?'current':''" @click="more_sel_index=1"><i class="icon-question-circle-o"></i>常见问题</a>
            <a href="javascript:void(0);" :class="more_sel_index==2?'current':''" @click="more_sel_index=2"><i class="icon-compass"></i>使用指南</a>
          </div>
          <div class="database-box">
            富文本{{more_sel_index}}
          </div>
        </div>
      </div>
     </div>
    </div>
</template>

<script>
import http from "@/assets/public/js/http";
import pages from '@/components/web/model/pages';
import input_btn from '../../../model/input_btn';
export default {
  name: 'footerPage',
  components:{pages,input_btn},
  created(){},
  data () {
    return {
        more_sel_index:0,
    }
  },
  mounted(){
    //   this.initData();
  },
  methods:{
      initData(){
        http.getPlain('AssetNewest','PlateId=109&PageSize=9&PageIndex=1').then(res=>{ //学生专区
            this.list1 = res.result.dtos||[];
        }).catch(err=>{
            console.log(err);
        })
      },
  },
}
</script>

<style lang="less" scoped>
  @import "../../../../../assets/public/css/color.less";/**通用文件 */
.databaseguide-warp{
    background-color: #fafafa;
    min-height:700px;
  }
  /**顶部菜单 */
  .sub-title{
    height: 60px;
    margin-bottom: 10px;
    color: #a21e1e;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
    background: url(../../../../../assets/web/img/bg1.jpg) no-repeat right #EBE9DC;
    .col{
      width: 50%;
      height: 100%;
      float: left;
      padding: 10px 15px;
    }
    .fonticon{
      color: #fff;
      display: inline-block;
      width: 40px;
      height: 40px;
      font-size: 18px;
      text-align: center;
      line-height: 40px;
      border-radius: 100%;
      vertical-align: middle;
      //background: #a21e1e url(../../../../../assets/web/img/data.png) no-repeat center;
    }
    .intro{
      font-weight: 100;
      padding-left: 5px;
      font-size: 18px;
      vertical-align: middle;
    }
  }
  /**body内容板块 */
  .db-content{
    .menu-warp{
      width: 250px;
      float: left;
    }
    .data-list{
      margin-left: 270px;
      /***顶部 */
      .c1{
        font-size: 12px;
        line-height: 30px;
        margin-bottom: 10px;
        padding: 18px 10px;
        background: #fff;
        border: 1px solid #d5e2e3;
        border-bottom: 5px solid #dceaf5;
        h1{
          color: #333;
          font-weight: lighter;
        }
        /***入口地址及站点 */
        .database-site{
          margin-top: 30px;
          .dz{
            outline: none;
            padding: 8px 10px;
            font-size: 16px;
            border: 0;
            vertical-align: middle;
            cursor: pointer;
            color: #fff;
            border-radius: 0;
            background: -moz-linear-gradient(top, #18b38e 0%, #019c77 100%);
            background: -webkit-linear-gradient(top, #18b38e 0%,#019c77 100%);
          }
          .site-list{
            width: 600px;
            border: 1px solid #d5e3e0;
            li{
              height: 28px;
              line-height: 28px;
              padding: 0 13px;
              border-bottom: 1px solid #d5e3e0;
              list-style-type: decimal;
              list-style-position: inside;
              &:last-child{
                border-bottom: none;
              }
            }
            a{
              display: inline-block;
              line-height: 28px;
              color: #006aad;
              font-size: inherit;
              text-decoration: none;
            }
          }
        }
        /**分类 */
        .database-intro {
          margin-top: 30px;
          p{
            position: relative;
            margin: 0;
            padding: 5px 3px 5px 80px;
            font-size: 14px;
            line-height: 24px;
            strong{
              position: absolute;
              left: 0;
              width: 80px;
              line-height: 24px;
              *margin-top: -2px;
              _margin-top: -2px;
              color: #999999;
            }
          }
        }
      }
        /***菜单 */
      .more-sel{
        a{
          display: inline-block;
          height: 40px;
          line-height: 40px;
          padding: 0 15px;
          font-size: 16px;
          color: #777;
        }
        i{
          margin-right: 5px;
        }
        .current {
          font-weight: bold;
          font-size: 18px;
          color: #333;
          //background: url(../../../../../assets/web/img/arrow.png) no-repeat center bottom;
        }
      }
      /***菜单-对应的详情 */
      .database-box{
        font-size: 12px;
        line-height: 30px;
        background: #fff;
        margin-bottom: 10px;
        margin-top: -3px;
        padding: 18px 10px;
        border: 1px solid #d5e2e3;
        border-bottom: 5px solid #dceaf5;
      }
    }
  }
</style>
