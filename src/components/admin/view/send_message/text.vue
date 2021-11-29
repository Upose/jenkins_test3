<template>
    <div>

          <!-- <div class="editdiv">
                    <ul>
                        <li>
                            <span>选择推送渠道 <i>*</i></span>
                            <div class="xuanze qudao">
                                <span v-for="(item,index) in list" :key="index" :class="clickIndex==index?'xuanzhong':''" @click="changes(index)">{{item}}</span>
                            </div>
                        </li>
                         <li v-if="isEmai">
                            <span>通知标题 <i>*</i></span>
                            <el-input class="handle-input mr10" v-model="title"></el-input>
                        </li>
                         <li v-if="isEmai==false">
                            <span>选择消息模板 <i>*</i></span>
                             <el-select v-model="message" placeholder="请选择" class="timeList">
                                <el-option
                                    v-for="item in messageOption"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                              </el-select>
                        </li>
                         <li>
                            <span>消息预览</span>
                            <div class="ueditors-div">
                                <vue-ueditor-wrap v-model="msg" :config="myConfig" class="ueditors"></vue-ueditor-wrap>
                                <div class="ueditors-box">
                                   <span>变量：</span>
                                   <span>用户名</span>
                                   <span>读者学号</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <span>发送时间 <i>*</i></span>
                            <el-radio v-model="radio" label="1" @change="changeRaido">立即发送</el-radio>
                            <el-radio v-model="radio" label="2" @change="changeRaido">定时发送</el-radio>
                            <div class="time-right" v-if="isShowTime">
                               <el-select v-model="times" placeholder="请选择" class="timeList">
                                  <el-option
                                      v-for="item in timeOption"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value">
                                  </el-option>
                               </el-select>
                               <el-date-picker
                                  v-model="date"
                                  type="date"
                                  placeholder="选择日期" class="datelist">
                                </el-date-picker>
                            </div>
                        </li>
                        <li class="jieshou" v-if="isEmai">
                            <span>接收用户 <i>*</i></span>
                            <el-radio v-model="sendTime" label="1">全部用户</el-radio>
                            <el-radio v-model="sendTime" label="2">用户标签</el-radio>
                            <el-radio v-model="sendTime" label="3">用户分群</el-radio>
                            <el-radio v-model="sendTime" label="4">指定用户</el-radio>
                        </li>
                        <li class="jieshou" v-if="isEmai==false">
                            <span>接收用户 <i>*</i></span>
                            <div class="jieshou-div">
                                 <div class="xuanze">
                                      <span v-for="(item,index) in userlist" :key="index" :class="userIndex==index?'xuanzhong':''" @click="changesUser(index)">{{item}}</span>
                                  </div>
                                  <div class="right-box">
                                      <span v-for="(item,index) in labellist" :key="index" @click="changeStatus($event,index,item)" :class="item.ischecked?'xuanzhongLabel':''">
                                        {{item.name}}
                                        <i class="el-icon-check duihao" v-if="item.ischecked"></i>
                                      </span>
                                      <span class="jiazai"><i class="el-icon-refresh"></i>加载更多</span>
                                  </div>
                                  <div>
                                      <el-table
                                          :data="tableData"
                                          border
                                          style="width: 100%" class="list-table">
                                          <el-table-column
                                          type="selection"
                                          width="55"
                                          align="center"
                                          ></el-table-column>
                                          <el-table-column label="姓名" prop="name"></el-table-column>
                                          <el-table-column label="用户来源" prop="derp"></el-table-column>
                                          <el-table-column label="手机" prop="phone"></el-table-column>
                                          <el-table-column label="用户类型" prop="number"></el-table-column>
                                          <el-table-column label="注册日期" prop="date"></el-table-column>
                                      </el-table>
                                  </div>
                                 <div class="fenye">
                                     <div></div>
                                     <div class="pagination">
                                          <el-pagination
                                              background
                                              :current-page="pageNum"
                                              :page-size="pageSize"
                                              :total="pageTotal"
                                              :page-sizes="[10, 50, 100]"
                                              @size-change="handleSizeChange"
                                              layout="total,sizes,prev, pager, next"
                                              @current-change="handlePageChange"
                                          ></el-pagination>
                                      </div>
                                 </div>
                                  
                            </div>
                        </li>
                        <li>
                          <span>.</span>
                          <div class="caozuo"> 
                            <el-button  class="btns quxiao">
                                <img src="@/assets/web/img/quxiao.png"/>
                                <span>取消</span>
                            </el-button>
                            <el-button type="primary" class="btns">
                               <img src="@/assets/web/img/icon-bc2x.png"/>
                               <span>保存</span>
                            </el-button>
                          </div>
                        </li>
                    </ul>
               </div> -->
    </div>
</template>