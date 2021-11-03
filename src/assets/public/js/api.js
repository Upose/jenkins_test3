/***后台管理系统 项目接口地址-数据库导航 */

var baseURL = 'http://192.168.21.71:5023';//请求前端地址

export default {
    postUrl: {
        'cap-publish-event-doc': baseURL + '/api/cap-document/cap-publish-event-doc',//获取当前服务发布事件描述文档数据
        'database-initialized-model': baseURL + '/api/database-terrace/database-initialized-model',//获取数据库导航应用的下拉列表
        'database-terrace-list': baseURL + '/api/database-terrace/database-terrace-list',//获取数据库总导航的视图模型(按条件筛选)
        'database-terrace': baseURL + '/api/database-terrace/database-terrace',//根据Id获取平台/数据库 表单的数据
        'database-settings': baseURL + '/api/database-terrace/database-settings',//获取数据库导航的应用设置信息
        'save-database-settings': baseURL + '/api/database-terrace/save-database-settings',//保存数据库导航的应用设置信息
        'batch-delete-database-terrace': baseURL + '/api/database-terrace/batch-delete-database-terrace',//批量删除平台/数据库 逻辑删
        'database-columns': baseURL + '/api/database-terrace/database-columns',//获取所有的数据库栏目(总列表)
        'batch-recommend-database-terrace': baseURL + '/api/database-terrace/batch-recommend-database-terrace',//批量推荐平台/数据库
        'batch-recover-database-terrace': baseURL + '/api/database-terrace/batch-recover-database-terrace',//批量恢复平台/数据库的状态
        'database-column': baseURL + '/api/database-terrace/database-column',//根据ID获取数据库栏目
        'save-database-column': baseURL + '/api/database-terrace/save-database-column',//保存数据库导航栏目
        'database-column-preview': baseURL + '/api/database-terrace/database-column-preview',//获取数据库栏目的预览视图
        'domain-esc-tree': baseURL + '/api/database-terrace/domain-esc-tree',//从数据中心获取学科分类树
        'domain-escs': baseURL + '/api/database-terrace/domain-escs',//保存学科分类
        'save-domain-esc-dtos': baseURL + '/api/database-terrace/save-domain-esc-dtos',//获取学科分类 字符数组
        'batch-delete-coustom-label': baseURL + '/api/database-terrace/batch-delete-coustom-label',//批量删除栏目
        'coustom-labels': baseURL + '/api/database-terrace/coustom-labels',//获取在用自定义标签
        'acess-url-name': baseURL + '/api/database-terrace/acess-url-name',//获取链接名称
        'batch-delete-coustom-label': baseURL + '/api/database-terrace/batch-delete-coustom-label',//批量删除自定义标签
        'batch-delete-acess-url-name': baseURL + '/api/database-terrace/batch-delete-acess-url-name',//批量删除链接名称
        'save-custom-labels': baseURL + '/api/database-terrace/save-custom-labels',//批量编辑自定义标签，全删后新增
        'save-database-terrace': baseURL + '/api/database-terrace/save-database-terrace',//保存数据库平台
        'rearrange-database': baseURL + '/api/database-terrace/rearrange-database',//调整数据库序号到指定位置
        'sort-database-by-drag': baseURL + '/api/database-terrace/sort-database-by-drag',//前端通过拖拽方法排序
        'sort-source-from-import-by-destination': baseURL + '/api/database-terrace/sort-source-from-import-by-destination',//通过弹窗输入绝对序号实现排序
        'database-from-center': baseURL + '/api/database-terrace/database-from-center',//从中心站获取数据库的结构数据
        'database-from-center-as-model': baseURL + '/api/database-terrace/database-from-center-as-model',//从中心站获取数据库的结构数据

        // 前台
        'recommend-databases': baseURL + '/api/database-terrace/recommend-databases',//获取推荐的数据库
        'collection-database': baseURL + '/api/database-terrace/collection-database',//获取当前用户收藏的数据库
        'database-terrace-portal': baseURL + '/api/database-terrace/database-terrace-portal',//查数据库导航详情--前台
        'batch-delete-database-column': baseURL + '/api/database-terrace/batch-delete-database-column',//删除该条收藏
        'database-terrace-list-portal': baseURL + '/api/database-terrace/database-terrace-list-portal',//获取数据库总导航的视图模型(按条件筛选)
        'database-settings-portal': baseURL + '/api/database-terrace/database-settings-portal',//获取数据库导航的应用设置信息--前台
        'database-single-page-list-portal': baseURL + '/api/database-terrace/database-single-page-list-portal',//获取单页模式下的数据库列表--前台
        '': baseURL + '',//
        '': baseURL + '',//
    },
}