/***后台管理系统 项目接口地址-用户中心 */

var baseURL = 'http://192.168.21.36:8021';//请求前端地址

export default {
    postUrl: {
        'get-validate-code': baseURL + '/api/user-identity/validate-code',//获取验证码信息
        'send-phone-verify-code': baseURL + '/api/user-identity/send-mobile-verify-code',//发送手机验证码
        'send-phone-verify-code-forget': baseURL + '/api/user-identity/send-mobile-verify-code-forget',//忘记密码发送手机验证码
        'login-by-phone': baseURL + '/api/user-identity/login-by-phone',//手机验证码登录
        'login-by-account': baseURL + '/api/user-identity/login-by-account',//账号密码登录
        'login-by-idCard': baseURL + '/api/user-identity/login-by-idcard',//身份证密码登录
        'search-card-by-no': baseURL + '/api/user-identity/search-card-by-no',//查找读者卡
        'verify-phone-code': baseURL + '/api/user-identity/verify-phone-code',//验证手机验证码
        'change-card-password': baseURL + '/api/user-identity/change-card-password',//修改卡密码
        'third-part-case': baseURL + '/api/third-part-auth/cas-auth',//cas授权登录
        '': baseURL + '',//

    },
}