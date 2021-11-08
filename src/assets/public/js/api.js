/***后台管理系统 项目接口地址 */
import identityUrl from '@/assets/public/js/api/identity_api';//前台登录接口地址
import accountUrl from '@/assets/public/js/api/account_info_api';//前台账号设置接口地址

export default {
    postUrl: {
        ...identityUrl.postUrl,
        ...accountUrl.postUrl,
    },
}