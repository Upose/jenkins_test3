/***前台 项目接口地址-用户中心-个人图书馆 */

// var baseURL = 'http://192.168.21.23:5023';//请求前端地址 服务中台
// var baseURL1 = 'http://192.168.21.48:7005';//请求前端地址 应用中心
var baseURL = process.env.VUE_APP_BASE_API + 'scenemanage';//请求前端地址 服务中台
var baseURL1 = process.env.VUE_APP_BASE_API + 'appcenter';//请求前端地址 应用中心

export default {
    postUrl: {
        'forward-getmycollectionapps': baseURL1 + '/api/userapplication/getmycollectionapps',//获取我的收藏应用

        'forward-scene-detail': baseURL + '/api/scene-manage/scene-detail',//获取场景详情
        'forward-personal-scene-detail': baseURL + '/api/scene/personal-scene-detail',//获取当前用户的个人中心场景
        'forward-personal-app-list': baseURL + '/api/scene/personal-app-list',//按服务类型获取应用列表
        'forward-personal-app-widget-by-app-id': baseURL + '/api/scene/personal-app-widget-by-app-id',///{appid}获取应用组件列表
        'forward-save-personal-scene': baseURL + '/api/scene/save-personal-scene',//保存个人中心
        '': baseURL + '',//
        '': baseURL + '',//
        '': baseURL + '',//
    },
}