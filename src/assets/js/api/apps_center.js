/***后台管理系统 项目接口地址-应用中心 */

var baseURL = 'http://192.168.0.23:11001';//请求前端地址

export default {
    postUrl: {
        'app-list': baseURL + '/api/appcenter/app-list', //应用列表
        'update-log': baseURL + '/api/appcenter/update-log', //更新日志
        'app-recommend-list': baseURL + '/api/appcenter/app-recommend-list', //推荐应用
        'app-recharge-remind-info': baseURL + '/api/appcenter/app-recharge-remind-info', //应用到期提醒
        'edit-app-status': baseURL + '/api/appcenter/edit-app-status', // 购买/试用/续费/延期/停用
        'app-status': baseURL + '/api/appcenter/{appId}', // 购买/试用/续费/延期/停用
        'buy-type-dict': baseURL + '/api/appcenter/buy-type-dict', //获取订购类型
        'service-type-dict': baseURL + '/api/appcenter/service-type-dict', //获取服务类型
        'edit-app-status': baseURL + '/api/appcenter/edit-app-status', //启用/停用
        'librarian-author-list': baseURL + '/api/appcenter/librarian-author-list', //馆员授权列表
        'manager-role-list': baseURL + '/api/appcenter/manager-role-list', //角色列表
        'edit-role': baseURL + '/api/appcenter/edit-role', //新增/编辑角色
        'delete-roles': baseURL + '/api/appcenter/delete-roles', //删除/批量删除角色
        'manager-detail-id': baseURL + '/api/appcenter/manager-detail/{managerId}', //馆员详情
        'edit-manager-role': baseURL + '/api/appcenter/edit-manager-role', //馆员角色编辑
        'user-author-list': baseURL + '/api/appcenter/user-author-list', //应用授权列表
        'edit-app-user': baseURL + '/api/appcenter/edit-app-user', //编辑/批量编辑应用权限
        'user-type-list': baseURL + '/api/appcenter/user-type-list', //获取用户类型
        'user-group-list': baseURL + '/api/appcenter/user-group-list', //获取用户分组
        'userset-author-list': baseURL + '/api/appcenter/userset-author-list', //读者授权列表
        'edit-userset-app': baseURL + '/api/appcenter/edit-userset-app', //编辑读者群权限
        'app-list-for-author': baseURL + '/api/appcenter/app-list-for-author', //应用查找
        'order-table-data': baseURL + '/api/order/table-data', //订单列表
        'cancel-order': baseURL + '/api/order/cancel-order', //取消订单
        'recommend-app-list': baseURL + '/api/user/recommend-app-list', //推荐应用列表
        'user-app-list': baseURL + '/api/user/app-list', //所有应用列表
        'collected-app-list': baseURL + '/api/user/collected-app-list', //收藏应用列表
        'collect': baseURL + '/api/reader/collect', //添加/取消收藏
        'thirdpartyapp-table-data': baseURL + '/api/thirdpartyapp/table-data', //第三方应用列表
        'thirdpartyapp-edit-app': baseURL + '/api/thirdpartyapp/edit-app', //第三方应用注册/编辑
        'thirdpartyapp-edit-app': baseURL + '/api/thirdpartyapp/edit-app', //删除第三方应用
        'terminal-dict': baseURL + '/api/thirdpartyapp/terminal-dict', //获取终端列表
        'settings-data-list': baseURL + '/api/settings/data-list', //获取设置
        'edit-settings': baseURL + '/api/settings/edit-settings', //修改设置
        'navagation-data-list': baseURL + '/api/navagation/data-list', //导航栏目列表
        'edit-navigation': baseURL + '/api/navagation/edit-navigation', //新增/编辑导航栏目
        'delete-navigation': baseURL + '/api/navagation/delete-navigation', //删除导航栏目
    },
}