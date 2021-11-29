<template>
    <div>
        <div class="integral-box">
            <div class="integral-num">
                <span>总积分：</span>
                <span>3211</span>
            </div>
            <div  class="integral-num">
                <span>消耗积分：</span>
                <span>3211</span>
            </div>
            <div  class="integral-num">
                <span>过期积分：</span>
                <span>3211</span>
            </div>
            <el-input class="handle-input mr10 inputs" v-model="events" placeholder="发生事件"></el-input>
             <el-select v-model="changetype" placeholder="变更方式" class="selects">
                <el-option
                    v-for="item in changetypeOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
             </el-select>
             <el-date-picker
                v-model="value1"
                type="date"
                placeholder="选择日期" class="times">
                </el-date-picker>
            <el-button type="primary" class="serach-btn">查找</el-button>
        </div>
        <div class="login-list">
              <el-table
                :data="tableData"
                border
                style="width: 100%" class="list-table">
                <el-table-column label="序号" width="55" align="center">
                     <template slot-scope="scope">
                    {{scope.$index+1}} 
                    </template>
                </el-table-column>
               <el-table-column label="积分变化" prop="integral" width="100" align="center"></el-table-column>
               <el-table-column label="时间" prop="time" width="180"></el-table-column>
               <el-table-column label="事件" prop="events"></el-table-column>
              </el-table>
          </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            events:"",
            changetype:"",
            changetypeOption:[{
                value:1,
                label:"方式1"
            }],
            value1:"",
            tableData:[{
                integral:"+5",
                time:"2021-09-21 09:21:36",
                events:"登录门户网站"
            },{
                integral:"-5",
                time:"2021-09-21 09:21:36",
                events:"登录门户网站"
            }]
        }
    }
}
</script>
<style scoped>
    .integral-box{
        width: 100%;
        display: table;
        margin-top: 2%;
    }
    .integral-num{
        padding:0.5% 0.8%;
        float: left;
        border:1px solid #E4E6FC;
        display: table;
        margin-right: 1.5%;
    }
    .integral-num span{
        display: table-cell;
        color: #F58B58 ;
        font-size: 15px;
        margin-top:2px;
        text-align: left;
    }
    .integral-num span:first-child{
        color: #34395E;
        margin: 0;
        text-align: right;
    }
    .inputs,.selects,.times{
        float: left;
        width: 10%;
        margin-right: 1.5%;
    }
    .serach-btn{
        background: #6777EF;
        border:0;
        padding:0 3%;
        height: 37px;
        line-height: 37px;
        color:#fff;
        text-align: center;
        float: left;
    }
    .login-list{
        width: 100%;
        background:#fff ;
        padding: 2% 0;
     }
     /deep/ .el-table--border .el-table__cell{
        border-right: 1px solid #EBEEF5;
    }
    /deep/ .el-table__body-wrapper .el-table__row:nth-of-type(even){
        background:#F8FAFF;
    }
    /deep/ .el-table .cell,/deep/ .el-table th.el-table__cell>.cell{
        padding-left: 8%;
    }   
    /deep/ .el-input__inner{
        height: 37px;
        line-height: 37px;
    }
</style>