/***后台管理系统 项目接口地址-用户中心 */

var baseURL = 'http://192.168.21.36:8001';//请求前端地址
var baseURL1 = 'http://192.168.21.36:6001';//请求前端地址

export default {
    postUrl: {
        'init-data': baseURL + '/api/property/init-data',//属性初始化数据
        'list-data': baseURL + '/api/property/list-data',//获取属性列表数据
        'property': baseURL + '/api/property',// get:获取属性详情 delete:删除属性 post:创建自定义属性 put:编辑自定义属性
        'set-can-search': baseURL + '/api/property/set-can-search',//设置是否可搜索
        'set-show-on-table': baseURL + '/api/property/set-show-on-table',//设置是否在列表显示

        'group-init-data': baseURL + '/api/property-group/init-data',//属性组初始化数据
        'group-list-data': baseURL + '/api/property-group/list-data',//获取属性组列表数据
        'list-item-data': baseURL + '/api/property-group/list-item-data',//获取属性组明细项
        'group-item': baseURL + '/api/property-group/group-item',//创建、编辑、删除属性组明细项
        'property-change-log': baseURL + '/api/property-group/property-change-log',//获取属性组变更日志

        'change-init-data': baseURL + '/api/data-approve/init-data',//初始化数据
        'property-change-log-table-data': baseURL + '/api/data-approve/property-change-log-table-data',//获取属性变更日志记录
        'property-change-log-detail-items': baseURL + '/api/data-approve/property-change-log-detail-items',//获取属性变更详情
        'approve-property-change': baseURL + '/api/data-approve/approve-property-change',//审批变更日志
        'user-change-log-table-data': baseURL + '/api/data-approve/user-change-log-table-data',//获取读者审批变更日志记录
        'approve-user-change': baseURL + '/api/data-approve/approve-user-change',//审批读者修改日志
        'user-change-log-detail-info': baseURL + '/api/data-approve/user-change-log-detail-info',//获取读者信息变更详情
        'user-change-log-detail-items': baseURL + '/api/data-approve/user-change-log-detail-items',//获取读者变更详情
        'user-register-table-data': baseURL + '/api/data-approve/user-register-table-data',//获取注册审批列表数据
        'approve-user-register': baseURL + '/api/data-approve/approve-user-register',//审批用户注册信息
        'card-claim-table-data': baseURL + '/api/data-approve/card-claim-table-data',//获取读者领卡列表数据
        'approve-card-claim': baseURL + '/api/data-approve/approve-card-claim',//审批读者领卡信息
        'card-claim-detail-info': baseURL + '/api/data-approve/card-claim-detail-info',//读者领卡详情
        '': baseURL + '',//

        'user-init-data': baseURL + '/api/user/init-data',//用户初始化数据
        'table-data': baseURL + '/api/user/table-data',//获取用户表格数据
        'basic-user-table-data': baseURL + '/api/user/basic-user-table-data',//获取基础用户表格数据
        'user-select-list-data': baseURL + '/api/user/user-select-list-data',//获取下拉用户数据
        'user-points-table-data': baseURL + '/api/user/user-points-table-data',//获取获取积分详情数据
        'user-borrow-table-data': baseURL + '/api/user/user-borrow-table-data',//获取用户借阅明细记录
        'user-auth-app-list-data': baseURL + '/api/user/user-auth-app-list-data',//获取用户授权应用信息
        'user-log-table-data': baseURL + '/api/user/user-log-table-data',//获取用户行为日志
        'by-id-for-edit': baseURL + '/api/user/by-id-for-edit',//获取用户数据用于编辑展示，不掩饰敏感信息
        'user': baseURL + '/api/user',//获取、删除、编辑、创建用户详情
        'batch-update': baseURL + '/api/user/batch-update',//用户信息批量修改
        'batch-set-user-as-staff': baseURL + '/api/user/batch-set-user-as-staff',//批量设置用户为馆员
        'download-user-import-template': baseURL + '/api/user/download-user-import-template',//用户数据导入模板下载
        'import-user': baseURL + '/api/user/import-user',//用户数据导入
        'import-temp-user-data': baseURL + '/api/user/import-temp-user-data',//获取待导入数据
        'import-user-confirm': baseURL + '/api/user/import-user-confirm',//用户数据导入确认
        'export-user-data': baseURL + '/api/user/export-user-data',//用户数据导出
        'export-user-data-brief-info': baseURL + '/api/user/export-user-data-brief-info',//获取待导出简要信息



        'card-table-data': baseURL + '/api/card/table-data',//获取用户读者卡信息列表
        'card-init-data': baseURL + '/api/card/init-data',//用户初始化数据
        'user-card-list-data': baseURL + '/api/card/user-card-list-data',//获取用户读者卡信息
        'card': baseURL + '/api/card',//获取、删除、修改、新增读者卡信息
        'card-batch-update': baseURL + '/api/card/batch-update',//批量修改读者卡数据
        'export-card-data': baseURL + '/api/card/export-card-data',//卡数据导出
        'export-card-data-brief-info': baseURL + '/api/card/export-card-data-brief-info',//卡数据导出简要信息

        'staff-init-data': baseURL + '/api/staff/init-data',//馆员数据初始化
        'staff1-table-data': baseURL + '/api/staff/table-data',//获取馆员表格数据
        'batch-set-department': baseURL + '/api/staff/batch-set-department',//批量设置用户
        'departments-list-data': baseURL + '/api/staff/departments-list-data',//获取部门信息
        'staff': baseURL + '/api/staff',//删除馆员身份
        'temp-staff': baseURL + '/api/staff/temp-staff',//添加临时馆员


        'group-table-data': baseURL + '/api/user-group/table-data',//获取用户组数据
        'user-group': baseURL + '/api/user-group',//创建、编辑、删除用户组
        'all-permission-tree': baseURL + '/api/permission/all-permission-tree',//获取应用中所有权限列表树
        'user-permission-list': baseURL + '/api/permission/user-permission-list',//获取馆员权限列表
        'user-group-init-data': baseURL + '/api/user-group/init-data',//数据初始化
        'by-id': baseURL + '/api/user-group/by-id',//获取用户组数据详情
        'download-group-import-template': baseURL + '/api/user-group/download-user-import-template',//用户数据导入模板下载1103
        'import-group-user': baseURL + '/api/user-group/import-group-user',//用户组数据导入1103
        'group-users': baseURL + '/api/user-group/group-users',//删除用户到用户组1103
        'user-to-group': baseURL + '/api/user-group/user-to-group',//添加用户到用户组
        '': baseURL + '',//


        'set-init-data': baseURL + '/api/basic-config/init-data',//获取初始化数据
        'basic-config': baseURL + '/api/basic-config/basic-config',//获取用户配置信息
        'set-basic-config': baseURL + '/api/basic-config/set-basic-config',//配置应用设置
        'card-claim-reader': baseURL + '/api/basic-config/card-claim-reader',//查询可认领读者卡的用户
        'set-card-claim-reader': baseURL + '/api/basic-config/set-card-claim-reader',//设置认领读者卡用户
        'info-append-reader': baseURL + '/api/basic-config/info-append-reader',//查询可自己补全信息的用户
        'set-info-append-reader': baseURL + '/api/basic-config/set-info-append-reader',//设置补充读者信息的用户
        'reader-edit-property': baseURL + '/api/basic-config/reader-edit-property',//获取读者可编辑信息
        'set-reader-edit-property': baseURL + '/api/basic-config/set-reader-edit-property',//设置可编辑属性


        'role-table-data': baseURL + '/api/role/role-table-data',//获取角色表格数据
        'staff-table-data': baseURL + '/api/role/staff-table-data',//查询馆员数据
        'role-data': baseURL + '/api/role/role-data',//获取角色信息
        'role-data-by-code': baseURL + '/api/role/role-data-by-code',//通过编码获取角色

        'role': baseURL + '/api/role',//创建角色数据
        'role-users': baseURL + '/api/role/role-users',//添加角色馆员
        'user-role': baseURL + '/api/role/user-role',//删除用户角色
        'set-user-roles': baseURL + '/api/role/set-user-roles',//设置用户角色


        'login-list-data': baseURL1 + '/api/login-config/list-data',//获取登录设置列表
        'set-is-open': baseURL1 + '/api/login-config/set-is-open',//设置是否开启


        'org-list': baseURL + '/api/property-group/org-list',//获取组织机构
        'org': baseURL + '/api/property-group/org',//创建、修改、删除组织机构

        'region-list': baseURL + '/api/property-group/region-list',//获取地址
        '': baseURL + '',//
        '': baseURL + '',//
        '': baseURL + '',//
        '': baseURL + '',//

    },
}