/*
 * @Description:
 * @Author: wanjikun
 * @Date: 2022-04-02 14:53:27
 * @LastEditTime: 2023-01-06 16:16:57
 * @LastEditors: huyu
 */
/***前台 项目接口地址-用户中心-账户设置 */

// var baseURL = 'http://192.168.21.43:8011';//请求前端地址
var baseURL = '/usermanage';//请求前端地址

export default {
  postUrl: {
    "forward-reader-info": baseURL + "/api/reader/reader-info", //读者获取自己的读者信息 编辑读者自己的属性信息
    "forward-reader-account-info": baseURL + "/api/reader/reader-account-info", //读者获取自己的读者信息 编辑读者自己的属性信息 新
    "forward-send-mobile-verfiy-code":
      baseURL + "/api/reader/send-mobile-verfiy-code", //发送手机验证码
    "forward-bind-mobile-and-code":
      baseURL + "/api/reader/bind-mobile-and-code", //绑定手机号码
    "forward-send-email-verify-code":
      baseURL + "/api/reader/send-email-verify-code", //发送邮箱验证码
    "forward-bind-email-and-code": baseURL + "/api/reader/bind-email-and-code", //绑定邮箱
    "forward-reader-card-list-data":
      baseURL + "/api/reader/reader-card-list-data", //查询读者卡信息
    "forward-reader-card-data": baseURL + "/api/reader/reader-card-data", //查询读者卡数据
    "forward-change-card-password":
      baseURL + "/api/reader/change-card-password", //修改读者卡密码
    "forward-set-principal-card": baseURL + "/api/reader/set-principal-card", //设置读者卡数据
    "forward-cancel-card-confirm": baseURL + "/api/reader/cancel-card-confirm", //取消审核
    "forward-card": baseURL + "/api/reader/card", //删除个人读者卡
    "forward-search-card-data": baseURL + "/api/reader/search-card-data", //查询卡信息
    "forward-claim-reader-card": baseURL + "/api/reader/claim-reader-card", //读者卡领取
    "forward-init-data": baseURL + "/api/reader/init-data", //读者数据
    "forward-set-principal-card": baseURL + "/api/reader/set-principal-card", //设为主卡
    "forward-reader-card-apply-list-data":
      baseURL + "/api/reader/reader-card-apply-list-data", //查询读者卡申请信息
    "forward-card-claim": baseURL + "/api/reader/card-claim", //删除领卡申请
    "forward-region-list": baseURL + "/api/reader/region-list", //获取地址
    "forward-check-modify-reader-permit":
      baseURL + "/api/reader/check-modify-reader-permit", //获取修改读者信息权限
    "forward-check-card-claim-permit":
      baseURL + "/api/reader/check-card-claim-permit", //获取读者领卡权限
    "forward-bind-reader-id-card": baseURL + "/api/reader/bind-reader-id-card", //修改身份证

    "forward-reader-bind-wechat": baseURL + "/api/reader/bind-we-chat", // 用户绑定微信
    "forward-reader-identity-status":
      baseURL + "/api/reader/reader-identity-status", // 获取用户的认证状态身份证号认证、电话认证、邮箱认证、微信认证
    "reader-wechat-login-config": baseURL + "/api/reader/wechat-login-config", // 获取微信登录认证设置
    "reader-un-bound-we-chat": baseURL + "/api/reader/un-bound-we-chat", // 微信解除绑定

    "forward-reader-bind-qq": baseURL + "/api/reader/bind-qq", // 用户绑定qq
    "reader-qq-login-config": baseURL + "/api/reader/qq-login-config", // 获取qq登录认证设置
    "reader-un-bound-qq": baseURL + "/api/reader/un-bound-qq", // qq解除绑定

    "forward-sensitive-info-display":
      baseURL + "/api/reader/sensitive-info-display", //查询敏感信息前台设置
    "reader-can-change-password-status":
      baseURL + "/api/basic-config/reader-can-change-password-status", //获取是否开启修改密码状态 true/修改密码 false/关闭修改密码
    "": baseURL + "" //
  }
};
