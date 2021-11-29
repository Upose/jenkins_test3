/***后台路由 */
export default {
    router:[
      {
        path: '/userManager',
        name: 'userManager',
        component: r => require.ensure([], () => r(require('@/components/admin/view/user_manager/user_manager')), 'user_manager'),
        meta: { title: '用户管理', keepAlive: true },
    },
    {
        path: '/attributeList',
        name: 'attributeList',
        component: r => require.ensure([], () => r(require('@/components/admin/view/attribute_manager/attribute_list')), 'attribute_list'),
        meta: { title: '属性列表', keepAlive: true }
    },
    {
        path: '/attributeAdd',
        name: 'attributeAdd',
        component: r => require.ensure([], () => r(require('@/components/admin/view/attribute_manager/attribute_add')), 'attribute_add'),
        meta: { title: '新增属性', keepAlive: true }
    },
    {
        path: '/attributeGroupManager',
        name: 'attributeGroupManager',
        component: r => require.ensure([], () => r(require('@/components/admin/view/attribute_manager/attribute_group_manager')), 'attribute_group_manager'),
        meta: { title: '属性组管理', keepAlive: true }
    },
    {
        path: '/attributeDepManager',
        name: 'attributeDepManager',
        component: r => require.ensure([], () => r(require('@/components/admin/view/attribute_manager/attribute_dep_manger')), 'attribute_dep_manger'),
        meta: { title: '属性组管理', keepAlive: true }
    },

    {
        path: '/changeAudit',
        name: 'changeAudit',
        component: r => require.ensure([], () => r(require('@/components/admin/view/change_audit/change_audit')), 'change_audit'),
        meta: { title: '变动审核', keepAlive: true }
    },

    {
        path: '/readerList',
        name: 'readerList',
        component: r => require.ensure([], () => r(require('@/components/admin/view/reader_management/reader_list')), 'reader-list'),
        meta: { title: '读者管理', keepAlive: true }
    },
    {
        path: '/importUser',
        name: 'importUser',
        component: r => require.ensure([], () => r(require('@/components/admin/view/reader_management/import_excel')), 'import_excel'),
        meta: { title: '导入读者数据', keepAlive: true }
    },
    {
        path: '/readerManagement',
        name: 'readerManagement',
        component: r => require.ensure([], () => r(require('@/components/admin/view/reader_management/reader_management')), 'reader_management'),
        meta: { title: '读者账号管理', keepAlive: true }
    },
    
    {
        path: '/readerAdd',
        name: 'readerAdd',
        component: r => require.ensure([], () => r(require('@/components/admin/view/reader_management/reader_add')), 'reader_add'),
        meta: { title: '新增读者', keepAlive: true }
    },
    {
        path: '/readerCardList',
        name: 'readerCardList',
        component: r => require.ensure([], () => r(require('@/components/admin/view/reader_card_manager/reader_card_list')), 'reader_card_list'),
        meta: { title: '读者卡管理', keepAlive: true }
    },
    {
        path: '/readerCardAdd',
        name: 'readerCardAdd',
        component: r => require.ensure([], () => r(require('@/components/admin/view/reader_card_manager/reader_card_add')), 'reader_card_add'),
        meta: { title: '读者卡管理-新增读者卡', keepAlive: true }
    },
    {
        path: '/readerCardEdit',
        name: 'readerCardEdit',
        component: r => require.ensure([], () => r(require('@/components/admin/view/reader_card_manager/reader_card_edit')), 'reader_card_edit'),
        meta: { title: '读者卡管理-编辑读者卡', keepAlive: true }
    },
    {
        path: '/loginSettings',
        name: 'loginSettings',
        component: r => require.ensure([], () => r(require('@/components/admin/view/login_settings/login_settings')), 'login_settings'),
        meta: { title: '登录设置', keepAlive: true }
    },
    {
        path: '/registrationSettings',
        name: 'registrationSettings',
        component: r => require.ensure([], () => r(require('@/components/admin/view/registrationSettings/registrationSettings')), 'registrationSettings'),
        meta: { title: '注册设置', keepAlive: true }
    },
    
    {
        path: '/librarianManagement',
        name: 'librarianManagement',
        component: r => require.ensure([], () => r(require('@/components/admin/view/librarian_management/librarian_management')), 'librarian_management'),
        meta: { title: '馆员管理', keepAlive: true }
    },
    {
        path: '/librarianList',
        name: 'librarianList',
        component: r => require.ensure([], () => r(require('@/components/admin/view/librarian_list/librarian_list')), 'librarian_list'),
        meta: { title: '馆员管理', keepAlive: true }
    },
    {
        path: '/librarianLog',
        name: 'librarianLog',
        component: r => require.ensure([], () => r(require('@/components/admin/view/librarian_log/librarian_log')), 'librarian_log'),
        meta: { title: '馆员日志', keepAlive: true }
    },
    {
        path: '/userGroupList',
        name: 'userGroupList',
        component: r => require.ensure([], () => r(require('@/components/admin/view/user_group_manager/user_group_list')), 'user_group_list'),
        meta: { title: '用户组管理', keepAlive: true }
    },
    {
        path: '/ruleCreat',
        name: 'ruleCreat',
        component: r => require.ensure([], () => r(require('@/components/admin/view/user_group_manager/rule_creat')), 'rule_creat'),
        meta: { title: '规则创建', keepAlive: true }
    },
    {
        path: '/handCreat',
        name: 'handCreat',
        component: r => require.ensure([], () => r(require('@/components/admin/view/user_group_manager/hand_creat')), 'hand_creat'),
        meta: { title: '手动创建', keepAlive: true }
    },
    {
        path: '/userList',
        name: 'userList',
        component: r => require.ensure([], () => r(require('@/components/admin/view/user_group_manager/user_list')), 'user_list'),
        meta: { title: '用户列表', keepAlive: true }
    },
    {
        path: '/userSet',
        name: 'userSet',
        component: r => require.ensure([], () => r(require('@/components/admin/view/user_set/user_set')), 'user_set'),
        meta: { title: '基础设置', keepAlive: true }
    },
    
    {
        path: '/baseSet',
        name: 'baseSet',
        component: r => require.ensure([], () => r(require('@/components/admin/view/user_set/base_set')), 'base_set'),
        meta: { title: '基础设置', keepAlive: true }
    },
    {
        path: '/authSet',
        name: 'authSet',
        component: r => require.ensure([], () => r(require('@/components/admin/view/user_set/auth_set')), 'auth_set'),
        meta: { title: '权限管理', keepAlive: true }
    },
    {
        path: '/roleAdd',
        name: 'roleAdd',
        component: r => require.ensure([], () => r(require('@/components/admin/view/user_set/role_add')), 'role_add'),
        meta: { title: '新增角色', keepAlive: true }
    },
    {
        path: '/sendMessage',
        name: 'sendMessage',
        component: r => require.ensure([], () => r(require('@/components/admin/view/send_message/send_message')), 'send_message'),
        meta: { title: '发送消息', keepAlive: true }
    },
    ],
}