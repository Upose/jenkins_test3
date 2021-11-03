/***后台管理系统 项目接口地址-信息导航 */

var baseURL = 'http://192.168.0.23:11002';//请求前端地址

export default {
    postUrl: {
        'navigation-settings-save': baseURL + '/api/navigation/navigation-settings-save',//保存应用设置
        'navigation-settings-get': baseURL + '/api/navigation/navigation-settings-get',//获取应用设置
        'save-navigation-column-permissions': baseURL + '/api/navigation/save-navigation-column-permissions',//保存栏目权限
        'navigation-column-permissions-list-get': baseURL + '/api/navigation/navigation-column-permissions-list-get',//获取全部栏目及其管理者
        'lable-list-get': baseURL + '/api/navigation/lable-list-get',//获取标签列表
        'lable-info-save': baseURL + '/api/navigation/lable-info-save',//保存标签
        'navigation-column-get-by-manager-id': baseURL + '/api/navigation/navigation-column-get-by-manager-id',//获取标签分组及信息导航栏目
        'navigation-column-get': baseURL + '/api/navigation/navigation-column-get',//获取信息导航栏目
        'navigation-column-add': baseURL + '/api/navigation/navigation-column-add',//新增信息导航栏目
        'navigation-column-update': baseURL + '/api/navigation/navigation-column-update',//更新信息导航栏目
        'navigation-column-delete': baseURL + '/api/navigation/navigation-column-delete',//删除信息导航栏目
        'pront-navigation-column-list-get': baseURL + '/api/navigation/pront-navigation-column-list-get',//获取前台信息导航栏目数据
        'navigation-catalogue-add': baseURL + '/api/navigation/navigation-catalogue-add',//添加信息导航目录
        'navigation-catalogue-update': baseURL + '/api/navigation/navigation-catalogue-update',//更新信息导航目录
        'navigation-catalogue-get': baseURL + '/api/navigation/navigation-catalogue-get',//获取信息导航目录
        'navigation-catalogue-list-get': baseURL + '/api/navigation/navigation-catalogue-list-get',//获取信息导航目录列表
        'all-navigation-catalogue-tree-list-get': baseURL + '/api/navigation/all-navigation-catalogue-tree-list-get',//获取全部信息导航目录树
        'change-navigation-catalogue-status': baseURL + '/api/navigation/change-navigation-catalogue-status',//批量下架/上架目录
        'navigation-catalogue-delete': baseURL + '/api/navigation/navigation-catalogue-delete',//批量删除目录
        'content-add': baseURL + '/api/navigation/content-add',//添加信息导航内容
        'content-update': baseURL + '/api/navigation/content-update',//修改信息导航内容
        'content': baseURL + '/api/navigation/content',//获取信息导航内容
        'content-list': baseURL + '/api/navigation/content-list',//获取信息导航内容
        '': baseURL + '',//
    },
}