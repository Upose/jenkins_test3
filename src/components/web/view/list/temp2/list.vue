<template>
  <div class="news-warp-page">
    <div class="search-box">这里还有一个搜索板块</div>
    <div class="m-width">
        <div class="sub-title main_font_color">
            <div class="col">
            <i class="icon-database fonticon main_bg"></i><span class="intro main_text_color">数据库导航</span>
            </div>
        </div>
        <div class="search-row">
            <h1 class="title main_text_color">所有类别</h1>
            <div class="right-input">
                <input type="text" placeholder="搜索数据库名称">
                <button class="submit child1_bg">确定</button>
            </div>
        </div>
        <div class="search-term c-l">
            <div class="col">
                <div class="title-text">
                    <span>按首字母类型浏览数据库：</span>
                    <!-- <span class="more">更多<i class="icon-chevron-right"></i></span> -->
                </div>
                <div class="s-list">
                    <span v-for="(item,index) in letter.split(',')">{{item}}</span>
                </div>
            </div>
            <div class="col">
                <div class="title-text">
                    <span>按首字母类型浏览数据库：</span>
                    <span class="more">更多<i class="icon-chevron-right"></i></span>
                </div>
                <div class="s-list">
                    <span v-for="(item,index) in subject.split(',')">{{item}}</span>
                </div>
            </div>
            <div class="col">
                <div class="title-text">
                    <span>按首字母类型浏览数据库：</span>
                    <span class="more">更多<i class="icon-chevron-down"></i></span>
                </div>
                <div class="s-list">
                    <span v-for="(item,index) in subject.split(',')">{{item}}</span>
                </div>
            </div>
            <div class="col">
                <div class="title-text">
                    <span>按首字母类型浏览数据库：</span>
                    <!-- <span class="more">更多<i class="icon-chevron-right"></i></span> -->
                </div>
                <div class="s-list">
                    <span>中文</span>
                    <span>外文</span>
                </div>
            </div>
        </div>
        <div class="search-list c-l">
            <div class="left">
                <div class="col-row">
                    <div class="data-title child_text_color">中文数据库</div>
                    <div class="list">
                        <div class="row" v-for="item in 20">
                            <span class="child_color_text_hover">万方学位论文</span>
                            <a href="javascript:;" class="child_color_text_hover"><i class="icon-cloud"></i>访问地址</a>
                            <a href="javascript:;" class="child_color_text_hover"><i class="icon-desktop"></i>远程访问</a>
                            <a href="javascript:;" class="right-btn">详细</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="col-row">
                    <div class="data-title child_text_color">外文数据库</div>
                    <div class="list">
                        <div class="row" v-for="item in 8">
                            <span class="child_color_text_hover">Open Access Library</span>
                            <a href="javascript:;" class="child_color_text_hover"><i class="icon-cloud"></i>访问地址</a>
                            <a href="javascript:;" class="child_color_text_hover"><i class="icon-desktop"></i>远程访问</a>
                            <a href="javascript:;" class="right-btn">详细</a>
                        </div>
                    </div>
                </div>
                <div class="col-row">
                    <div class="data-title child_text_color">试用数据库</div>
                    <div class="list">
                        <div class="row">
                            <span>海研全球科研项目数据库</span>
                            <a href="javascript:;" class="right-btn">详细</a>
                        </div>
                    </div>
                </div>
                <div class="col-row">
                    <div class="data-title child_text_color">特色数据库</div>
                    <div class="list">
                        <div class="row">
                            <span>宁波市创意产业特色数字文献资源库</span>
                            <a href="javascript:;" class="right-btn">详细</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import http from "@/assets/public/js/http";
export default {
  name: 'footerPage',
  created(){},
  data () {
    return {
      letter:"A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z",
      subject:"哲学,经济学,法学,教育学,文学,历史学,理学,工学,农学,医学,军事学,管理学,艺术学,综合性分类",
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
  .news-warp-page{
    background-color: #fafafa;
    padding-bottom: 20px;
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
/**标题+搜索**/
.search-row{
    padding: 10px 0;
    background-color: @fff;
    h1.title{
        width: 150px;
        display: inline-block;
        font-size: 18px;
        margin-left: 15px;
        line-height: 28px;
    }
    .right-input{
        float:right;
        input{
            outline: none;
            height: 27px;
            width: 460px;
            font-size: 12px;
            margin-right: 10px;
            border: 1px solid @ccc;
            border-radius: 3px;
            padding: 0 10px;
        }
        button.submit{
            cursor: pointer;
            outline: none;
            color: @fff;
            border-radius: 3px;
            height: 27px;
            width: 80px;
            font-size: 12px;
            padding: 0px 5px;
            border: none;
            &:hover{
                opacity: .9;
            }
        }
    }
}
/**条件列表**/
.search-term{
    position: relative;
    border: 1px solid @de;
    .col{
        width: 33.33%;
        padding: 10px;
        float: left;
        min-height: 170px;
    }
    .col:nth-child(4){
        width: 33.33%;
        padding: 10px;
        position: absolute;
        bottom: 0;
        min-height: auto;
    }
    .col:nth-child(1),.col:nth-child(2){
        border-right: 1px solid @de;
    }
    .col:nth-child(3){
        border-right: none;
    }
    .col{
        border-right: 1px solid @de;
        span{
            margin-right:15px;
            min-width: 20px;
            display: inline-block;
            color: @777;
            line-height: 25px;
        }
        .title-text{
            font-size: 15px;
            font-weight: bold;
            .more{
                float: right;
                font-size: 12px;
                color: @999;
                font-weight: normal;
            }
        }
    }
}
/***数据列表***/
.search-list{
    border: 1px solid @dceaf5;
    background-color: @fff;
    margin-top: 20px;
    padding-bottom: 20px;
    .left,.right{
        width: 47%;
        margin-left: 1%;
        margin-right: 1%;
        float: left;
    }
    .left{
        margin-left: 2%;
    }
    .right{
        margin-right: 2%;
    }
    .col-row{
        border: 1px solid @f8;
        margin-top: 20px;
        padding: 10px;
        .data-title{
            font-family: arial;
            font-size: 16px;
            line-height: 30px;
            font-weight: bold;
        }
        .list{
            .row{
                margin-top: 11px;
                color: @3e3f42;
                padding: 5px 0;
                .right-btn{
                    float: right;
                    display: block;
                    width: 40px;
                    color: @fff;
                    text-align: center;
                    border-radius: 4px;
                    font-size: 12px;
                    line-height: 20px;
                    background-color: @a2968e;
                    &:hover{
                        opacity: .9;
                    }
                }
                .child_color_text_hover:hover{
                    cursor: pointer;
                    font-weight: bold;
                }
                a{
                    font-weight: lighter;
                    font-size: 12px;
                    margin-left: 10px;
                    color: #35a1c3;
                    i{
                        margin-right: 5px;
                    }
                }
            }
        }
    }
}
</style>
