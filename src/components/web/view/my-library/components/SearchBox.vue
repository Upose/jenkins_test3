<!--
 * @Author: huyu
 * @Date: 2022-06-02 18:25:54
 * @LastEditors: huyu
 * @LastEditTime: 2023-02-07 13:42:11
 * @Description: 个人图书馆--检索组件--从模板组件复制过来
-->
<template>
  <div class="unified_retrieval_sys_temp1-warp my-search-box">
    <div class="search-top-w">
      <div class="search-title" v-if="details.displayTitleEnabled">{{details.displayTitle}}</div>
      <!--检索标题-->

      <div class="column-w">
        <div class="box-warp c-l">
          <div class="c-box thover-bg-c1" @click="tabClick(it)" v-for="(it,i) in details.searchBoxTitleItems" :class="cu_colum.id==it.id?'box-active tbg-c1':''"><span class="tafter-border-c1">{{it.title}}</span></div>
        </div>
      </div>
      <!--检索栏目-->

      <div class="search-input-w">
        <div class="s-input-w">
          <select class="select" v-model="search" v-if="cu_colum.searchBoxFields&&cu_colum.searchBoxFields.length>0">
            <option v-for="(it,i) in cu_colum.searchBoxFields" :value="it">{{it.displayTitle}}</option>
          </select>
          <input class="input" ref="mainInput" @keyup.enter="searchClick" @blur="inputBlur" @focus="emptySearch" v-model="basicInputKeyWord" type="text" :placeholder="details.placeHolderEnabled?(cu_colum.placeholder||details.defaultPlaceHolder):''" :class="(cu_colum.searchBoxFields&&cu_colum.searchBoxFields.length>0)?'pd-l-h':'pd-l-s'" />
          <div class="s-r-btns">
            <button class="subject-btn" @click="subjectAlertOpen" v-if="search && search.symbol && (search.symbol == 'CC'||search.symbol == 'LC' || search.symbol == 'C'||search.symbol == 'L')">查看分类表</button>
            <button class="search-btn tbg-c1" @click="searchClick"></button>
            <button class="high-btn" @click="highSearch">高级检索</button>
          </div>
        </div>
        <!-- <span class="take" @click="takeSearch()">订阅此检索</span> -->
      </div>
      <!--检索输入框-->

      <div class="alert-panel panel_unified_retrieval_sys_temp1">
        <Intelligentpanel v-if="panel_model" :panelClass="'panel_unified_retrieval_sys_temp1'" @closePanel="closePanel" @searchKeyword="searchKeyword" @regexMatchSearch="regexMatchSearch" :emptySearchModel="emptySearchModel" :smartPanelEnabled="details.smartPanelEnabled" :onKeywordInputSuggestModel="onKeywordInputSuggestModel" :basicInputKeyWord="basicInputKeyWord"></Intelligentpanel>
      </div><!--智能面板-->

      <div class="search-hot-w" v-if="details.hotResourceEnabled">
        <span class="hot-title">热门检索：</span>
        <span v-for="(hotword, index) in emptySearchModel.hotKeyword" :key="index" @click="searchKeyword(hotword.word)">{{hotword.word}}</span>
      </div>
    </div>
    <div class="subject-alert-fixed" v-if="subjectAlert">
      <div class="subject-alert">

        <div class="top-title">
          <span class="l-title">{{(search && (search.symbol == 'CC'||search.symbol == 'C'))?'学科分类号':'中图分类号'}}</span>
          <span class="r-close" @click="subjectAlertClose"></span>
        </div>
        <!--头部 标题-->

        <div class="content-w c-l">
          <div class="left">
            <div class="s-title">分类表</div>
            <div class="check-box-w">
              <ul class="domtree">
                <li v-for="(ite,i) in LsubjectCheckList">
                  <span :class="ite.isOpen?'clicktale-on':'clicktale-off'" @click="openRowItem(ite)"></span><label :title="ite.domainName||''"><input type="checkbox" @change="boxChange(ite)" v-model="ite.checked" />[{{ite.domainIdCode||''}}]{{ite.domainName||''}}</label>
                  <ul v-if="ite.isOpen">
                    <li v-for="(it,x) in ite.children"><span class="clicktale-on"></span><label :title="it.domainName||''"><input type="checkbox" v-model="it.checked" @change="sboxChange(ite,it)" />[{{it.domainIdCode||''}}]{{it.domainName||''}}</label></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <!--分类表end-->
          <div class="center">
            <button @click="subjectRowAdd">&gt;&gt;</button>
            <button @click="subjectRowDel">&lt;&lt;</button>
          </div>
          <div class="right">
            <div class="s-title">所选分类</div>
            <div class="check-box-w">
              <span class="title">----=双击删除一行=----</span>
              <p v-for="(it,i) in RsubjectCheckList" @dblclick="subjectRowDblclick(i)" @click="subjectRowClick(i)" :class="subjectCheckRow==i?'p-active':''">{{it.domainName||''}}</p>
            </div>
          </div>
          <!--所选分类end-->
        </div>
        <!--中间-内容板块-->
        <div class="foot-btns">
          <button @click="subjectAlertClose">取消</button>
          <button @click="subjectSubmit">确定</button>
        </div>
      </div>
    </div>
    <!--学科分类-弹窗-->
  </div>
</template>

<script>
var columnid = '15164479-81e6-40d1-9cc5-17fefa3905ae'
export default {
  components: {},
  props: {},
  data() {
    return {
      request_of: true,//默认true，请求完成fasle
      baseUrl: "/articlesearch",
      fileUrl: window.localStorage.getItem('fileUrl'),//图片地址前缀
      webBase: location.origin + '/articlesearch/',
      searchExpressionResolver: new searchExpressionCore(),//拼接表达式
      search: null,//下拉选中条件
      basicInputKeyWord: '',//input输入框
      cu_colum: { //当前栏目列表
        searchBoxFields: [],//栏目下拉选项
      },
      details: { //页面-总详情
        searchBoxTitleItems: [],//栏目列表
      },
      /**检索条件为空的时候出来的提示面板 */
      emptySearchModel: {
        focus:false,//是否获取焦点
        show: false, //是否显示下拉弹窗
        hotComponent: null, //智能推荐-功能推荐
        hotKeyword: null,//智能推荐-检索发现
        searchHistory: null,//智能推荐-检索历史
      },
      /**当输入关键词的时候提示的项 */
      onKeywordInputSuggestModel: {
        show: false,
        autoComplete: null,//自动补全
        regexInfo: null,//智能匹配
        matchComponent: null,//智能识别 - 顶部服务和新闻
      },
      subjectAllList: [],//分类表格所有数据
      subjectAlert: false,//学科分类-弹窗显示
      subjectCheckRow: null,//右侧选中的行-下标
      LsubjectCheckList: [],//左侧选中的数据
      RsubjectCheckList: [],//添加到右侧的数据
      panel_model:false,
    };
  },
  created() {
    this.initIntelligentpanel();
  },
  mounted() {
    if (!rxjs)
      throw new Error(
        "rxjs未正确加载，请确保有对应script标签，src地址https://cdn.bootcdn.net/ajax/libs/rxjs/6.0.0/rxjs.umd.js"
      );
    this.initComponentAsync().then(() => {
      // this.emptySearch().then(() => {
      //   this.emptySearchModel.show = false;//空检索-无内容显示的弹窗
      // }); //获取热门检索
      if (this.$refs.mainInput)
        rxjs.fromEvent(this.$refs.mainInput, "keyup").pipe(
          rxjs.operators.map(() => this.basicInputKeyWord),
          rxjs.operators.debounceTime(200), //防抖
          rxjs.operators.throttleTime(200), //节流
          rxjs.operators.distinctUntilChanged()
        ).subscribe((x) => {
          this.rxAutoComplete(x);
        });
    });
    this.getJsonAsync("/api/search-const/all-available-domain-info-friendly-show", {}).then((x) => { //学科分类是0 中途分类是1
      this.subjectAllList = x.data;
    })
  },
  methods: {
    initIntelligentpanel(){
      var _that = this;
      var intelligentpanel_url = '../cdn/public/template/app_template/search_Intelligentpanel';
      var is_load = document.getElementsByClassName('intelligentpanel-css');
      if(is_load.length>0){
        _that.panel_model = true;
        return;
      }
      var link = document.createElement("link");
      link.setAttribute("rel", "stylesheet");
      link.setAttribute("type", "text/css");
      link.setAttribute("class", "intelligentpanel-css");
      link.setAttribute("href", intelligentpanel_url + '/component.css?version=' + new Date().getTime());
      document.getElementsByTagName("body")[0].appendChild(link);

      var js_element = document.createElement("script");
      js_element.setAttribute("type", "text/javascript");
      js_element.setAttribute("class", "intelligentpanel-css");
      js_element.setAttribute("src", intelligentpanel_url + '/component.js?version=' + new Date().getTime());
      document.getElementsByTagName("body")[0].appendChild(js_element);
      js_element.onload=js_element.onreadystatechange=function(){
        _that.panel_model = true;
        js_element.onload=js_element.onreadystatechange=null;
      }
    },
    /**获取页面数据 */
    initComponentAsync() {
      return Promise.all([
        this.getJsonAsync("/api/search-box-configure/web-search-configure-by-id?id=" + columnid).then((x) => {
          this.details = x.data;
          if (this.details.searchBoxTitleItems && this.details.searchBoxTitleItems.length > 0) {
            this.tabClick(this.details.searchBoxTitleItems[0])
          }
          this.request_of = false;
        }),
      ]);
    },
    //高级检索
    highSearch() {
      if (this.isSearchPage) {
        this.$emit('showHighSearch');
      } else {
        let url = this.$setHref({ type: 'dlib', url: ['articlesearch', `/web_searchingResult?high=h`] })
        location.href = url;
      }
    },
    //栏目点击
    tabClick(val) {
      this.cu_colum = val;
      if (this.cu_colum.searchBoxFields && this.cu_colum.searchBoxFields.length > 0) {
        this.search = this.cu_colum.searchBoxFields[0];
      } else {
        this.search = null;
      }
      if (this.cu_colum.actionType == 4) {
        window.location.href = this.cu_colum.link;
      }
    },
    //检索-按钮
    searchClick() {
      // console.log(this.search);
      if (!this.basicInputKeyWord) { alert('请输入检索内容'); return; } else {
        this.basicInputKeyWord = this.basicInputKeyWord.replace(/(^\s*)|(\s*$)/g, "");
        let reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
        if (reg.test(this.basicInputKeyWord)) {
          if (this.basicInputKeyWord.length > 100) {
            alert('输入字符长度不得大于100');
            return;
          }
        } else {
          if (this.basicInputKeyWord.length > 200) {
            alert('输入字符长度不得大于200');
            return;
          }
        }
      }
      if (this.cu_colum.actionType == 1) {//普通检索
        if (this.cu_colum.tableType == 2) {
          //站内检索，跳转地址,带参到站内检索页面 
          let url = this.$setHref({ type: 'dlib', url: ['articlesearch', `/web_siteSearch?keyword=${encodeURIComponent(this.basicInputKeyWord)}&type=${encodeURIComponent(this.cu_colum.articleType)}&symbol=${encodeURIComponent((this.search ? (this.search.symbol || 'U') : 'U'))}&searchMatchType=${encodeURIComponent(this.search ? (this.search.searchMatchType || searchMatchType.Fuzzy) : searchMatchType.Fuzzy)}`] })
          location.href = url;
        } else {//普通搜索
          this.searchExpressionResolver.clearConditions();//情况条件
          if (this.search && this.search.symbol != "U") {
            if (this.search.symbol == 'CC' || this.search.symbol == 'LC' || this.search.symbol == 'C' || this.search.symbol == 'L') {//表示学科分类号和中途分类
              if (this.basicInputKeyWord) {
                let rsubject_list = this.basicInputKeyWord.split('+') || [];
                if (rsubject_list.length > 0) {
                  rsubject_list.forEach(x => {
                    this.searchExpressionResolver.addSimpleSearchCondition({
                      searchType: this.search.symbol,
                      value: x.replace(/(^\s*)|(\s*$)/g, ""),//传输入项
                      matchType: this.search.searchMatchType,
                    });
                  })
                }
              }
            } else {
              this.searchExpressionResolver.addSimpleSearchCondition({
                searchType: this.search.symbol,
                value: this.basicInputKeyWord,//传输入项
                matchType: this.search.searchMatchType,
              });
            }

          } else {
            this.searchExpressionResolver.addSimpleSearchCondition({
              searchType: "U",
              value: this.basicInputKeyWord,
              matchType: searchMatchType.Fuzzy,
            });
          }
          if (this.cu_colum.predefinedSearchConditions) {
            this.cu_colum.predefinedSearchConditions.forEach(item => {
              this.searchExpressionResolver.addSimpleSearchCondition(item);
            });
          }
          this.goToSearch();
        }
      } else if (this.cu_colum.actionType == 2) {
        window.location.href = this.cu_colum.link.replace(/\{0\}/, this.basicInputKeyWord);
      }
    },
    linkTo(code, url) {
      if (url) {
        let urlInfo = JSON.parse(localStorage.getItem('urlInfo'));
        let info = urlInfo.find(item => item.code == code);
        if (code == 'index') {
          location.href = info.path + url + '?page=1';
        } else {
          location.href = info.path + url
        }
      }
    },
    /**进入到检索结果页面 */
    goToSearch() {
      var list = this.searchExpressionResolver.buildApiRules();
      if (list && list.filterRule && list.filterRule.ruleBody) {
        var result = list.filterRule.ruleBody;
        while (result.startsWith("(") && result.endsWith(")")) {
          result = result.substring(1, result.length - 1);
        }
        list.filterRule.ruleBody = result;
      }
      setSearchHistoryKey(this.basicInputKeyWord);//记录历史
      this.postJsonAsync("/api/search-const/encrypt-search-parameter", list).then((x) => {
        let keyword = this.basicInputKeyWord || "";
        // if (keyword.length >= 100) keyword = keyword.substring(0, 100);
        // window.location.href = href;
        let url = this.$setHref({ type: 'dlib', url: ['articlesearch', `/web_searchingResult?key=${x.data}&keyword=${encodeURIComponent(keyword)}&id=${encodeURIComponent(columnid)}&c=${this.cu_colum ? this.cu_colum.id : ''}&p=${this.search ? this.search.symbol : ''}`] })
        location.href = url;
      });
    },
    //当输入框获取焦点的时候
    emptySearch() {
      console.log('input 获取焦点');
      this.emptySearchModel.focus = true;
      this.emptySearchModel.searchHistory = true;
      if (this.emptySearchModel.hotComponent) {
        this.emptySearchModel.show = true;
        return Promise.resolve(null); //将热门组件和检索词缓存起来
      }
      return Promise.all([
        this.getJsonAsync("/api/search/hot-component", { limit: 4, sid: this.details.id }),
        this.getJsonAsync("/api/search/hot-words", { limit: 8 }),
      ]).then((resultArray) => {
        this.emptySearchModel.hotComponent = resultArray[0].data && resultArray[0].data.length > 0 ? resultArray[0].data : null;
        if (resultArray[1].data && resultArray[1].data.hits && resultArray[1].data.hits.source) {
          this.emptySearchModel.hotKeyword = resultArray[1].data.hits.source;
        } else {
          this.emptySearchModel.hotKeyword = null;
        }
        this.emptySearchModel.show = this.emptySearchModel.hotKeyword || this.emptySearchModel.hotComponent;
      });
    },
    //input 失去焦点
    inputBlur(){
      console.log('input 失去焦点');
      this.emptySearchModel.focus = false;
    },
    //关闭面板
    closePanel(){
      //这里还要加个判断-input失去焦点的时候，如果是点击的input框，则不关闭
      console.log('input 焦点状态：'+this.emptySearchModel.focus);
      this.emptySearchModel.show = false;
      this.onKeywordInputSuggestModel.show = false;
      this.emptySearchModel.searchHistory = false;
    },
    /**适用于rxjs防抖节流策略的下拉框 */
    rxAutoComplete(x) {
      let _this = this;
      if (x == null) return;
      Promise.all([
        Promise.resolve(searchOption.autoMapRegexInfo.find((y) => y.regex.test(x))),
        this.postJsonAsync("/api/search/match-component", { pageIndex: 1, pageSize: 5, keyword: x, }),
        this.getJsonAsync("/api/search/auto-complete", { limit: 10, keyword: x, }),
      ]).then((resultArray) => {
        _this.onKeywordInputSuggestModel.regexInfo = resultArray[0];
        _this.onKeywordInputSuggestModel.matchComponent = resultArray[1].data && resultArray[1].data.hits && resultArray[1].data.hits.source && resultArray[1].data.hits.source.length > 0 ? resultArray[1].data.hits.source : null;
        _this.onKeywordInputSuggestModel.autoComplete = resultArray[2].data && resultArray[2].data.length > 0 ? resultArray[2].data : null;
        if (!_this.onKeywordInputSuggestModel.regexInfo && !_this.onKeywordInputSuggestModel.matchComponent && !_this.onKeywordInputSuggestModel.autoComplete) {
          _this.onKeywordInputSuggestModel.show = false;
        } else {
          _this.onKeywordInputSuggestModel.show = true;
        }
      }).catch(() => {
        _this.onKeywordInputSuggestModel.show = false;
      });
    },
    /**自动补全或者热门关键词的检索 */
    searchKeyword(keyword) {
      if (!keyword) return;
      this.searchExpressionResolver.clearConditions();
      this.searchExpressionResolver.addSimpleSearchCondition({
        searchType: "U",
        value: keyword,
        matchType: searchMatchType.Fuzzy,
      });
      this.basicInputKeyWord = keyword;
      this.goToSearch();
    },
    /**正则匹配上后调用 */
    regexMatchSearch(regexInfo) {
      this.searchExpressionResolver.addSimpleSearchCondition({
        searchType: regexInfo.searchType,
        value: this.basicInputKeyWord,
        matchType: searchMatchType.Fuzzy,
      });
      this.goToSearch();
    },
    //获取学科分类弹窗
    initSubject() {
      if (this.search.symbol == 'CC' || this.search.symbol == 'C') {
        this.LsubjectCheckList = this.subjectAllList.filter(x => x.type == 0);//学科分类
      } else {
        this.LsubjectCheckList = this.subjectAllList.filter(x => x.type == 1);//中图分类
      }
    },
    /**父级选中 */
    boxChange(item) {
      if (item.children && item.children.length > 0) {
        if (item.checked) {
          item.children.forEach(item => {
            item.checked = true;
          })
        } else {
          item.children.forEach(item => {
            item.checked = false;
          })
        }
      }
    },
    /**子级选中 */
    sboxChange(parent, item) {
      if (item.checked) {//选中的时候，判断父级是否全部选中，全部选中则将父级设置为选中，取消选中时则相反操作。
        var is_check = parent.children.filter(x => !x.checked);
        if (is_check && is_check.length == 0) {
          parent['checked'] = true;
        }
      } else {//只要是false，直接将父级设置为false
        parent['checked'] = false;
      }
    },
    /***折叠展开操作 */
    openRowItem(item) {
      item['isOpen'] = !item['isOpen'];
      console.log(item);
      this.$forceUpdate();
    },
    /****学科分类弹窗 -打开 */
    subjectAlertOpen() {
      this.subjectAlert = true;
      this.initSubject();
    },
    /****学科分类弹窗 -关闭 */
    subjectAlertClose() {
      this.RsubjectCheckList = [];
      this.subjectCheckRow = null;
      this.subjectAlert = false;
    },
    /***确定 */
    subjectSubmit() {
      if (this.RsubjectCheckList.length > 0) {
        this.basicInputKeyWord = '';
        this.RsubjectCheckList.forEach(it => {
          this.basicInputKeyWord = this.basicInputKeyWord + it.domainIdCode + ' + ';
        })
        this.basicInputKeyWord = this.basicInputKeyWord.slice(0, -3);
      }
      this.subjectAlertClose();
    },
    /***双击行 */
    subjectRowDblclick(num) {
      this.subjectCheckRow = num;
      this.subjectRowDel();
    },
    /***单击行 */
    subjectRowClick(num) {
      this.subjectCheckRow = num;
    },
    /***添加到右侧的数据 */
    subjectRowAdd() {
      if (this.LsubjectCheckList.length == 0) return;
      this.RsubjectCheckList = [];
      this.subjectCheckRow = null;
      this.LsubjectCheckList.forEach(item => {
        if (item.checked) {
          this.RsubjectCheckList.push(item);
        } else {
          var check_list = item.children.filter(x => x.checked);
          if (check_list && check_list.length > 0) {
            check_list.forEach(x => {
              this.RsubjectCheckList.push(x);
            });
          }
        }
      });
    },
    /***删除行 */
    subjectRowDel() {
      if (this.subjectCheckRow || this.subjectCheckRow == 0) {
        this.RsubjectCheckList.splice(this.subjectCheckRow, 1);
        this.subjectCheckRow = null;
      }
    },
    /*******************************封装方法******************************************************************/
    //向指定的连接发起get请求
    async getJsonAsync(url, querys) {
      if (!url.startsWith("/")) url = "/" + url;
      let requestUrl = this.baseUrl + url;
      if (querys != null) {
        let queryString = Object.keys(querys).map((x) => `${x}=${querys[x]}`).join("&");
        if (queryString) requestUrl += `?${queryString}`;
      }
      return axios({ url: requestUrl, method: "GET", }).then((response) => response.data);
    },
    /**向指定的连接发起Post请求 */
    async postJsonAsync(url, data) {
      if (!url.startsWith("/")) url = "/" + url;
      let requestUrl = this.baseUrl + url;
      if (data == null) data = {};
      return axios({ url: requestUrl, method: "POST", data: data, }).then((response) => response.data);
    },
  },
};
</script>

<style scoped lang="less">
@import url("./temp1/component.css");
.my-search-box {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 865px;
  height: 102px;
  background: url("~@/assets/web/img/personal/bg-search.png") no-repeat;
  background-size: 100% 100%;
  border-radius: 16px;
  padding: 10px 20px 0;
  border: 2px solid #fff;
}
</style>
