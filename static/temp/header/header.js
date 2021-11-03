
var user = `<div class="news-warp">
		     <div class="m-box-title">
		       <h2>
		           <span class="use"> 常用</span><span class="hint">资源</span> <span class="english">For Students</span>
		           <span class="more"><a href="javascript:;">查看更多 <i class="icon-angle-right"></i></a></span>
		       </h2>
		       <div class="bottom-line"></div>
		     </div>
		     <div class="content clearFloat">
		       <div class="col">
		         <h3><i class="icon-en cn"></i>中文数据库</h3>
		         <ul class="list">
		           <li v-for="(item,index) in zh_list" :key="'zh'+index"><a href="javascript:;" @click="openUrl(item)">{{item.name||'新闻列表标题标题标题标题标题新闻列表标题标题标题标题标题新闻列表标题标题标题标题标题'}}</a></li>
		         </ul>
		       </div>
		       <div class="col">
		         <h3><i class="icon-en en"></i>外文数据库</h3>
		         <ul class="list">
		           <li v-for="(item,index) in en_list" :key="'en'+index"><a href="javascript:;" @click="openUrl(item)">{{item.name||'新闻列表标题标题标题标题标题新闻列表标题标题标题标题标题新闻列表标题标题标题标题标题'}}</a></li>
		         </ul>
		       </div>
		       <div class="col">
		         <div class="row">
		           <h3>期刊导航 <a href="javascript:;">更多 &gt;</a></h3>
		         </div>
		         <div class="c1 clearFloat">
		           <a href="" class="width50" v-for="item in journal_list">{{item.title}}</a>
		         </div>
		         <div class="row">
		           <h3>文献导航 <a href="javascript:;">更多 &gt;</a></h3>
		         </div>
		         <div class="list-grop">
		           <div class="group-row clearFloat" v-for="item in literature_list">
		             <label>{{item.title}}：</label>
		             <div class="list clearFloat">
		               <a href="javascript:;" class="width50" v-for="item1 in item.list">{{item1.title}}</a>
		             </div>
		           </div>
		         </div>
		       </div>
		     </div>
		   </div>`;

         new Vue({
              el:'#app1',
              data:{
				  journal_list:[
					  {title:'北大核心',url:''},{title:'EI收录',url:''},{title:'CSCD收录',url:''},
					  {title:'SCI收录',url:''},{title:'S-SCI来源',url:''},
					],//期刊导航
					literature_list:[
					  {title:'工学',list:[
						{title:'建筑学',url:''},{title:'计算机科学与技术',url:''},{title:'电子科学与技术',url:''},
						{title:'电器工程',url:''},{title:'机械工程',url:''},{title:'材料科学与工程',url:''},
						{title:'环境科学与工程',url:''},
					  ]},
					  {title:'理学',list:[
						{title:'数学',url:''},{title:'生物学',url:''},{title:'化学',url:''},
						{title:'生物学',url:''},{title:'地理学',url:''},{title:'天文学',url:''},
					  ]},
					],//文献导航
					zh_list:[{},{},{},{},{},{},{},{},{},{}],//中文
					en_list:[{},{},{},{},{},{},{},{},{},{}],//英文
			  },
			  template:user,
			  methods:{
				  openUrl(val){
				        let url = val.customUrlList?val.customUrlList[0].url:'';
				        alert('尚未调用接口记录次数，为直接跳转');
				        if(url){
				         // window.open(url);
				        }else{
				          console.log('跳转地址错误');
				        }
				      },
			  }
         });