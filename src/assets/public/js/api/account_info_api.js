/***前台 项目接口地址-用户中心-账户设置 */

var baseURL = 'http://192.168.21.43:8011';//请求前端地址
var baseURL1 = 'http://192.168.21.48:7005';//请求前端地址

export default {
    postUrl: {
        'forward-reader-info': baseURL + '/api/reader/reader-info',//读者获取自己的读者信息 编辑读者自己的属性信息
        'forward-send-mobile-verfiy-code': baseURL + '/api/reader/send-mobile-verfiy-code',//发送手机验证码
        'forward-bind-mobile-and-code': baseURL + '/api/reader/bind-mobile-and-code',//绑定手机号码
        'forward-send-email-verify-code': baseURL + '/api/reader/send-email-verify-code',//发送邮箱验证码
        'forward-bind-email-and-code': baseURL + '/api/reader/bind-email-and-code',//绑定邮箱
        'forward-reader-card-list-data': baseURL + '/api/reader/reader-card-list-data',//查询读者卡信息
        'forward-reader-card-data': baseURL + '/api/reader/reader-card-data',//查询读者卡数据
        'forward-change-card-password': baseURL + '/api/reader/change-card-password',//修改读者卡密码
        'forward-set-principal-card': baseURL + '/api/reader/set-principal-card',//设置读者卡数据
        'forward-cancel-card-confirm': baseURL + '/api/reader/cancel-card-confirm',//取消审核
        'forward-card': baseURL + '/api/reader/card',//删除个人读者卡
        'forward-search-card-data': baseURL + '/api/reader/search-card-data',//查询卡信息
        'forward-claim-reader-card': baseURL + '/api/reader/claim-reader-card',//读者卡领取
        'forward-init-data': baseURL + '/api/reader/init-data',//读者数据
        'forward-set-principal-card': baseURL + '/api/reader/set-principal-card',//设为主卡
        'forward-reader-card-apply-list-data': baseURL + '/api/reader/reader-card-apply-list-data',//查询读者卡申请信息
        'forward-card-claim': baseURL + '/api/reader/card-claim',//删除领卡申请
        'forward-region-list': baseURL + '/api/property-group/region-list',//获取地址

        '': baseURL + '',//

    },
}