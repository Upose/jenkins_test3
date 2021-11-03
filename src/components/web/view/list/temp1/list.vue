<template>
    <div class="databaseguide-warp">
      <div class="search-box">这里还有一个搜索板块</div>
     <div class="m-width">
      <div class="sub-title main_font_color">
        <div class="col">
          <i class="icon-database fonticon main_bg"></i><span class="intro main_text_color">数据库导航</span>
        </div>
      </div>
      <!-- 查询导航 start -->
      <div class="database-top-list">
        <div class="list-group clearFloat">
          <span class="label">字母导航</span>
          <ul class="clearFloat">
            <li v-for="(item,index) in letter.split(',')"><span class="check_color_hover" @click="letterClick(index,item)" :class="index==letter_check?'active check_color_bg':''">{{item}}</span></li>
          </ul>
        </div>
        <div class="list-group clearFloat">
          <span class="label">学科导航</span>
          <ul class="clearFloat">
            <li v-for="(item,index) in subject.split(',')"><span class="check_color_hover" @click="subjectClick(index,item)" :class="index==subject_check?'active check_color_bg':''">{{item}}</span></li>
          </ul>
        </div>
      </div>
      <!-- 查询导航 end -->
      <div class="db-content clearFloat">
        <div class="menu-warp">
          <div class="box-w" v-for="(item,i) in menu_list">
            <div class="box-top" :class="check_index==i?'m-active child_bg':''" @click="menuClick(i)"><span>{{item.year}}</span><i class="icon-chevron-down"></i></div>
            <div class="box-bottom" v-if="(item.list && item.list.length>0) && check_index == i">
              <p @click="subMenuClick(i,index)" v-for="(it,index) in item.list"><span class="check_color_hover" :class="item.check==index ? 'active check_color_bg':''">{{it.number}}</span></p>
            </div>
          </div><!--菜单列表头部 end-->

          <div class="box-w">
            <input_btn></input_btn>
          </div><!--推荐数据库 end-->

          <div class="box-w">
            <div class="box-top"><span>推荐数据库</span><i class="icon-chevron-down"></i></div>
            <div class="box-bottom box-top-b-c p-width50">
              <p><span class="check_color_hover">维普期刊资源整合服务平台</span></p>
              <p><span class="check_color_hover">Emerald（期刊，图书，案例）</span></p>
              <p><span class="check_color_hover">外研社外语资源库</span></p>
              <p><span class="check_color_hover">Taylor& Francis 电子书</span></p>
            </div>
          </div><!--查找数据库 end-->

        </div>
        <div class="data-list">
          <div class="filter">
            <span class="f-title">您已选择：</span>
            <a href="javascript:;" class="check_color_bg">字母导航=K<i class="icon-remove" @click="removeCheck(0)"></i></a>
            <a href="javascript:;" class="check_color_bg">学科导航=工学<i class="icon-remove" @click="removeCheck(1)"></i></a>
          </div>
          <h1 class="list-title main_text_color">全部数据库列表</h1>
          <div class="row" v-for="item in 5">
            <div class="row-title">
              <span class="c1">中国知网</span>
              <span class="c2">浏览量：7474754</span>
              <a class="c3 child1_bg" href="#/details?id=1" target="_blank"><i class="icon-tj"></i>详细</a>
            </div>
            <div class="row-content">
              综合性外文期刊、电子图书全文数据库
            </div>
          </div>
          <pages :total="5" :Cindex="'2'"></pages>
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
  name: 'detailsPage',
  components:{pages,input_btn},
  created(){},
  data () {
    return {
        letter:"A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z",
        letter_check:-1,
        subject:"哲学,经济学,法学,教育学,文学,历史学,理学,工学,农学,医学,军事学,管理学,艺术学,综合性分类",
        subject_check:-1,
        menu_list:[
          {year:'全部数据库列表',},
          {year:'按资源类型导航',list:[
            {number:'图书'},{number:'期刊'},{number:'学位论文'},{number:'标准'},{number:'会议'},{number:'专利'},
          ],},
          {year:'按语言导航',list:[
            {number:'中文'},{number:'外文'},
          ],},
          {year:'按采购类型导航',list:[
            {number:'已购'},{number:'试用'},{number:'免费'},{number:'其他'},{number:'自建'},
          ],},
        ],//收录汇总
        check_index:0,//选中的第几个菜单
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
      menuClick(index){ //左边查询条件-主菜单选择
        this.check_index = index;
        if(this.menu_list[index].list && this.menu_list[index].list.length>0){}else{
          console.log('表示无下级，查询全部,需要清空所有选中的条件');//如果页面默认查询全部，也可以直接刷新下页面即可
        }
        this.$forceUpdate();
      },
      subMenuClick(m_index,index){ //左边查询条件-子菜单选择
        this.menu_list[m_index]['check'] = index;
        this.$forceUpdate();
      },
      letterClick(index,val){//字母选择
        this.letter_check = index;
      },
      subjectClick(index,val){//学科导航选择
        this.subject_check = index;
      },
      removeCheck(index){//删除选中条件
        console.log('选中条件下标：'+index);
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
    display: flex;
    align-items: center;
    border-bottom: 1px solid @ccc;
    background: url(../../../../../assets/web/img/bg1.jpg) no-repeat right #EBE9DC;
    .col{
      width: 50%;
      height: 100%;
      float: left;
      padding: 10px 15px;
    }
    .fonticon{
      vertical-align: middle;
      color: @fff;
      display: inline-block;
      width: 40px;
      height: 40px;
      font-size: 18px;
      text-align: center;
      line-height: 40px;
      border-radius: 100%;
      //background: #a21e1e url(../../../../../assets/web/img/data.png) no-repeat center;
    }
    .intro{
      font-weight: 100;
      padding-left: 5px;
      font-size: 18px;
      vertical-align: middle;
    }
  }
  /***查询导航栏-字母导航-学科导航 */
  .database-top-list{
    overflow: hidden;
    display: table;
    width: 100%;
    margin-bottom: 10px;
    padding: 15px 0 0 15px;
    color: @666;
    font-size: 14px;
    line-height: 24px;
    background: @fff;
    border: 1px solid @dceaf5;
    border-bottom: 5px solid @dceaf5;
    zoom: 1;
    .list-group{
      margin-right: 15px;
      margin-bottom: 15px;
      border-bottom: 1px solid @eee;
      .active{
        color: @fff;
      }
      &:last-child{
        margin-bottom: 0;
        border-bottom: none;
      }
      .label{
        color: @666;
        float: left;
        margin-right: 15px;
        font-size: 16px;
        line-height: 30px;
      }
      li{
        float: left;
        padding: 0 10px 15px 0;
        span{
          cursor: pointer;
          display: inline-block;
          min-width: 25px;
          padding: 0 7px;
          color: @666;
          line-height: 30px;
          text-align: center;
          background: @eee;
          border-radius: 3px;
          &:hover{
            color: @fff;
          }
        }
      }
    }
  }
  /**body内容板块 */
  .db-content{
    .menu-warp{
      width: 250px;
      float: left;
      .box-w{
        margin-bottom: 8px;
        .box-top,.box-bottom{
          padding: 5px 10px;
          font-size: 14px;
          line-height: 26px;
          color: @555;
          border-top: none;
          border: 1px solid @d5e2e3;
        }
        .box-top{
          cursor: pointer;
          height: 40px;
          font-size: 16px;
          background: @fc;
          i.icon-chevron-down{
            float: right;
            line-height: 26px;
          }
        }
        .m-active{
          color: @fff !important;
        }
        .box-top-b-c{
          border-top: none;
        }
        .box-bottom{
          margin-bottom:8px;
          .active{
            cursor: pointer;
            color: @fff;
          }
          span{
            display: inline-block;
            width: 100%;
            line-height: 26px;
            text-align: center;
            border-radius: 4px;
            color: @aaa;
            background-color:@eee;
            &:hover{
              color: @fff;
              cursor: pointer;
            }
          }
          p{
            width:33.33%;
            padding: 3px;
            text-align: center;
            display: inline-block;
          }
        }
        h2.b-search-title{
          font-size:18px;
          font-weight: normal;
          line-height: 40px;
          i.icon-filter{
            margin-right: 5px;
          }
        }
        .p-width50{
          p{
            width: 49%;
          }
          span{
            cursor: pointer;
            color: @5f;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            padding: 0 2px;
            border: @de solid 1px;
          }
        }
      }
    }
    .data-list{
      margin-left: 270px;
      .filter{
        span.f-title{
          color: @333;
        }
        a{
          line-height: 30px;
          color: @fff;
          border-radius: 3px;
          display: inline-block;
          padding: 0 8px;
          margin: 0 8px 5px 0;
          i{
            padding-left: 8px;
            border-left: 1px solid rgba(255,255,255,0.4);
            margin-left: 8px;
            display: inline-block;
            line-height: 30px;
          }
        }
      }
      .list-title{
        height: 40px;
        font-size: 18px;
        line-height: 40px;
      }
      .row{
        color: @666;
        padding: 5px;
        line-height: 22px;
        background: @fff;
        margin-bottom: 10px;
        border: 1px solid @d5e2e3;
      }
      .row-title{
        padding: 5px 10px;
        position: relative;
        .c1{
          display: inline-block;
          color: @555;
          font-size: 16px;
          font-weight: bold;
          padding-right: 190px;
        }
        .c2{
          position: absolute;
          display: inline-block;
          width: 120px;
          right: 70px;
        }
        .c3{
          position: absolute;
          right: 10px;
          color: @fff;
          margin-right: 5px;
          padding: 0px 6px;
          font-size: 12px;
          border-radius: 2px;
          line-height: inherit;
          text-decoration: none;
        }
      }
      .row-content{
        padding: 5px 10px;
        font-size: 14px;
        vertical-align: top;
      }
    }
  }
</style>
