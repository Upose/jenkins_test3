/***前台 项目接口地址-用户中心-个人图书馆 */

// var baseURL = 'http://192.168.21.23:5023';//请求前端地址 服务中台
// var baseURL1 = 'http://192.168.21.48:7005';//请求前端地址 应用中心
var baseURL = '/scenemanage';//请求前端地址 服务中台
var baseURL1 = '/appcenter';//请求前端地址 应用中心
var baseURL2 = '/scenemanage';//请求前端地址 服务中台
var baseURL3 = '/databaseguide';//请求前端地址 数据库导航
var baseURL4 = '/noticecenter';//请求前端地址 消息中心
var baseURL5 = '/news';//请求前端地址 消息中心

export default {
    postUrl: {
        'forward-getmycollectionapps': baseURL1 + '/api/baseinfo/getmycollectionapps',//获取我的收藏应用


        'forward-set-personal-default-scene': baseURL2 + '/api/scene/set-personal-default-scene',//设置/取消个人默认首页 /{sceneid}/{isdefault}

        'forward-scene-detail': baseURL + '/api/scene-manage/scene-detail',//获取场景详情
        'forward-personal-scene-detail': baseURL + '/api/scene/personal-scene-detail',//获取当前用户的个人中心场景
        'forward-personal-app-list': baseURL + '/api/scene/personal-app-list',//按服务类型获取应用列表
        'forward-personal-app-widget-by-app-id': baseURL + '/api/scene/personal-app-widget-by-app-id',///{appid}获取应用组件列表
        'forward-save-personal-scene': baseURL + '/api/scene/save-personal-scene',//保存个人中心
        'my-favorite-databases': baseURL3 + '/api/database-terrace/my-favorite-databases',//获取我的数据库
        'visit-databases': baseURL3 + '/api/database-terrace/visit-databases',//跳转记录访问次数
        'notice-center-scene-message': baseURL4 + '/api/reader-message/notice-center-scene-message',//获取通知消息
        'pront-scenes-top-news': baseURL5 + '/api/news/pront-scenes-top-news',//获取新闻
        '': baseURL + '',//
    },
}