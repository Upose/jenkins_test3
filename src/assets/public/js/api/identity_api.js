/***后台管理系统 项目接口地址-用户中心 */

var baseURL = 'http://192.168.21.36:6001';//请求前端地址

export default {
    postUrl: {
        'get-validate-code': baseURL + '/api/user-identity/validate-code',//获取验证码信息
        'send-phone-verify-code': baseURL + '/api/user-identity/send-mobile-verify-code',//发送手机验证码
        'login-by-phone': baseURL + '/api/user-identity/login-by-phone',//手机验证码登录
        'login-by-account': baseURL + '/api/user-identity/login-by-account',//账号密码登录
        'login-by-idCard':baseURL+'/api/user-identity/login-by-idcard',//身份证密码登录
        '': baseURL + '',//

    },
}