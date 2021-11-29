<!--左边菜单-->
<template>
    <div class="header-warp">
    
        <div class="m-menu">
    
            <div class="m-text">
    
                <span class="m">文献专题引擎</span>
    
                <span class="v">v1.0.0</span>
    
            </div>
    
        </div>
    
        <div class="s-menu">
    
            <div class="s-row" :class="isActive==(index+1)?'active':''" :title="item.title" @click="openPage(item.url)" v-for="(item,index) in dataList" :key="index+'menu'"><i class="el-icon-s-ticket"></i><span>{{item.title}}</span></div>
    
        </div>
    
    </div>
</template>

<script>
import bus from '@/assets/public/js/bus';
export default {
    name: 'test',
    props: ['isActive'],
    // created(){
    //   // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    //   bus.$on('collapse', msg => {
    //     this.$root.collapse = msg;
    //   })
    // },
    created() {
        var token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJPcmdJZCI6InN0cmluZyIsIk9yZ1NlY3JldCI6IjEyMzQ1Njc4OTk4NzY1NDMyMSIsIk9yZ0NvZGUiOiJjcXUiLCJVc2VyS2V5IjoiZDRjNWFhYmEtMWE1My00ZTVjLWE0YTUtZDA2NjFmMWI0NTY3IiwibmJmIjoxNjM0NjEzOTc1LCJleHAiOjE2Mzk4MTM5NzUsImlzcyI6IlNtYXJ0TGlicmFyeS5JZGVudGl0eUNlbnRlciIsImF1ZCI6IldlYkFwaSJ9.N8VP4Bw1sCxYOCPouCvqVj5EHA799YSacSmuFwjM0EWc0Bf3w7XdXKKDk5nNlFzQP_Vhrbhzmdo1lpi_2RU5Rgu_D0A51JQsusGPuU2nEk3_X0EDgpvyj_220PK_zmabPRVVTHXgeXGYf5VV0fh0st_74RryACOpQ53iG8wRpVX7BfpYsrG3uFx6Ht3JS4-ObonCtsF4HpfpfV9t_ppkXi1f9Og3u5xVbzKJ3oQa_V2ZsoiIQntgReA-JhYWbqyDm72ms-3VluV6-8Cikz8s-8Nj5q1zTIAH83mKJiL2hscL-c90xD_imBD9-XD3g-ntwhL_sShbOji2PfeNFa2lvQ'
        window.localStorage.setItem('token', token);
    },
    data() {
        return {
            default_img: require('@/assets/admin/img/upload/user-img.png'),
            dataList: [
                { icon: 'el-icon-warning-outline', title: '栏目管理', url: '/specialProgram' },
                { icon: 'el-icon-warning-outline', title: '馆员推荐栏目', url: '/specialInfor' },
                { icon: 'el-icon-warning-outline', title: '系统创作专题', url: '/sysCreation' },
                { icon: 'el-icon-warning-outline', title: '联盟共享专题', url: '/unionShared' },
                { icon: 'el-icon-warning-outline', title: '应用设置', url: '/specialSet' },
            ],
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        openPage(url) {
            this.$router.push(url)
        },
    },
}
</script>

<style lang="less" scoped>
@import "../../assets/admin/css/color.less";
/**颜色配置 */

.m-menu {
    padding-left: 20px;
    padding-top: 22px;
    padding-bottom: 22px;
    .m-text {
        display: inline-block;
        vertical-align: middle;
        width: 200px;
        height: 80px;
        background: @F4F7FC;
        opacity: 1;
        border-radius: 8px;
        position: relative;
        padding-left: 30px;
        padding-top: 17px;
        &::after {
            content: '';
            position: absolute;
            height: 40px;
            width: 2px;
            top: 17px;
            background-color: @6677EF;
        }
        span {
            display: block;
            color: @6677EF;
            padding-left: 16px;
        }
        .m {
            font-size: 24px;
            font-weight: bold;
        }
        .v {
            display: block;
            font-size: 12px;
        }
    }
}

.s-menu {
    .s-row {
        height: 40px;
        line-height: 40px;
        font-size: 13px;
        color: @6C757D;
        font-weight: bold;
        padding: 0 50px;
        i {
            visibility: visible;
            transition: visibility 0s .3s;
            margin-right: 8px;
        }
        &:hover {
            cursor: pointer;
            width: 245px;
            z-index: 9;
            background: #FFFFFF;
            position: relative;
            color: @6777EF  !important;
            box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
            border-radius: 0px 3px 3px 0px;
            transition: width .3s ease-in-out;
            &:after {
                content: '';
                display: block;
                width: 2px;
                height: 15px;
                position: absolute;
                right: 0;
                top: 13px;
                background-color: @6777EF;
            }
        }
    }
    .active {
        width: 245px;
        z-index: 9;
        background: #FFFFFF;
        position: relative;
        color: @6777EF  !important;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
        border-radius: 0px 3px 3px 0px;
        transition: width .3s ease-in-out;
        &:after {
            content: '';
            display: block;
            width: 2px;
            height: 15px;
            position: absolute;
            right: 0;
            top: 13px;
            background-color: @6777EF;
        }
    }
}

/***折叠后菜单**/

.fold-menu {
    .s-row {
        padding: 0;
        font-size: 12px;
        font-weight: 400;
        span {
            width: 60px;
            display: inline-block;
            overflow: hidden;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-left: 10px;
        }
        i {
            margin-right: 0;
            display: none;
        }
        &:hover {
            width: 80px;
            transition: width .3s ease-in-out;
        }
    }
    .active {
        width: 80px;
        transition: width .3s ease-in-out;
    }
    .m-menu {
        padding-left: 6px;
        .m-text {
            width: 70px;
            height: 39px;
            padding-left: 0;
            padding-top: 4px;
            border-radius: 3px;
            &::after {
                height: 28px;
                top: 4px;
            }
            span {
                padding-left: 4px;
            }
            .m {
                font-size: 13px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
}
</style>
