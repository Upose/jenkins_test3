<template>
    <div>
        <div class="auth-title">应用授权</div>
        <div class="auth-box">
            <div class="auth-box-child">
                <div class="bgs"><img src="@/assets/admin/img/userManager/zise.png"/></div>
                <span>爱学术学习平台</span>
            </div>
            <div class="auth-box-child">
                <div class="bgs huangse"><img src="@/assets/admin/img/userManager/huangse.png"/></div>
                <span>爱学术学习平台</span>
            </div>
            <div class="auth-box-child">
                <div class="bgs lvse"><img src="@/assets/admin/img/userManager/lvse.png"/></div>
                <span>爱学术学习平台</span>
            </div>
            <div class="auth-box-child">
                <div class="bgs lanse"><img src="@/assets/admin/img/userManager/lanse.png"/></div>
                <span>爱学术学习平台</span>
            </div>
            <div class="auth-box-child">
                <div class="bgs hongse"><img src="@/assets/admin/img/userManager/icon-sy2x.png"/></div>
                <span>爱学术学习平台</span>
            </div>
            <div class="auth-box-child">
                <div class="bgs"><img src="@/assets/admin/img/userManager/zise.png"/></div>
                <span>爱学术学习平台</span>
            </div>
             <div class="auth-box-child">
                <div class="bgs huangse"><img src="@/assets/admin/img/userManager/huangse.png"/></div>
                <span>爱学术学习平台</span>
            </div>
            <div class="auth-box-child">
                <div class="bgs lvse"><img src="@/assets/admin/img/userManager/lvse.png"/></div>
                <span>爱学术学习平台</span>
            </div>
        </div>
        <div class="auth-title">馆员授权</div>
        <div class="auth-box">
            <div class="auth-box-child">
                <img src="@/assets/admin/img/userManager/icon_assets2x.png" class="child-img"/>
                <span>数字资产管理</span>
            </div>
            <div class="auth-box-child">
                <img src="@/assets/admin/img/userManager/duzhe.png" class="child-img"/>
                <span>用户业务管理</span>
            </div>
            <div class="auth-box-child">
                <img src="@/assets/admin/img/userManager/icon_data2x.png" class="child-img"/>
                <span>运行数据管理</span>
            </div>
             <div class="auth-box-child">
                <img src="@/assets/admin/img/userManager/icon_content2x.png" class="child-img"/>
                <span>门户内容管理</span>
            </div>
            <div class="auth-box-child">
                <img src="@/assets/admin/img/userManager/icon_bigdata2x.png" class="child-img"/>
                <span>大数据发布</span>
            </div>
            <div class="auth-box-child">
                <img src="@/assets/admin/img/userManager/icon_import2x.png" class="child-img"/>
                <span>电子资源采购管理</span>
            </div>
            <div class="auth-box-child">
                <img src="@/assets/admin/img/userManager/icon_service2x.png" class="child-img"/>
                <span>服务平台</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
    .bgs{
        width: 58px;
        height: 58px;
        background: #F1EEFF;
        border-radius:15px;
        text-align: center;
        line-height: 58px;
        float: left;
    }
    .child-img{
        width: 58px;
        height: 58px;
        float: left;
        border-radius:15px;
    }
    .huangse{
        background: #FFF4E3;
    }
    .lvse{
        background: #DCF6F1;
    }
    .lanse{
        background: #E3F2FF;
    }
    .hongse{
        background: #FFF1F8;
    }
    .bgs img{
        width: 31px;
        height: 29px;
        margin: 12px auto 0;
    }
    .auth-title{
        width: 100%;
        display: table;
        margin:1% auto;
        color: #6C757D;
        font-size: 15px;
    }
    .auth-box{
        width:100%;
        display: table;
        margin:1.2% auto;
    }
    .auth-box-child{
        width: 25%;
        float: left;
        margin: 0 0 1.5%  0;
    }
    .auth-box-child span{
        color:#34395E;
        font-size: 14px;
        margin:5% 0 0 3%;
        display: block;
        float: left;
    }
</style>