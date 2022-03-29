/***后台路由 */
async function beforeEnterImplAsync(to, from, next) {
    let response = await axios({
        url: '/appcenter/api/baseinfo/getauthinfo?appcode=navigation',
        method: 'get'
    }).then(x => x.data);
    if (response.data.canAdmin) { next(); return }
    next({ name: '403' })
}
export default {
    router: [
        {
            path: '/admin_userManager',
            name: 'admin_userManager',
            component: r => require.ensure([], () => r(require('@/components/admin/view/user_manager/user_manager')), 'user_manager'),
            meta: {
                title: [{ name: '用户中心' }, { name: '用户管理' }],
                keepAlive: true
            },
        },
        {
            path: '/admin_attributeList',
            name: 'admin_attributeList',
            component: r => require.ensure([], () => r(require('@/components/admin/view/attribute_manager/attribute_list')), 'attribute_list'),
            meta: {
                title: [{ name: '用户中心' }, { name: '属性管理' }],
                keepAlive: true
            },
        },
        {
            path: '/admin_attributeAdd',
            name: 'admin_attributeAdd',
            component: r => require.ensure([], () => r(require('@/components/admin/view/attribute_manager/attribute_add')), 'attribute_add'),
            meta: {
                title: [{ name: '用户中心' }, { name: '属性管理', path: '/admin_attributeList' }, { name: '新增属性' }],
                keepAlive: true
            },
        },
        {
            path: '/admin_attributeGroupManager',
            name: 'admin_attributeGroupManager',
            component: r => require.ensure([], () => r(require('@/components/admin/view/attribute_manager/attribute_group_manager')), 'attribute_group_manager'),
            meta: {
                title: [{ name: '用户中心' }, { name: '属性管理', path: '/admin_attributeList' }, { name: '属性组管理' }],
                keepAlive: true
            },
        },
        {
            path: '/admin_attributeDepManager',
            name: 'admin_attributeDepManager',
            component: r => require.ensure([], () => r(require('@/components/admin/view/attribute_manager/attribute_dep_manger')), 'attribute_dep_manger'),
            meta: {
                title: [{ name: '用户中心' }, { name: '属性管理', path: '/admin_attributeList' }, { name: '属性组管理' }],
                keepAlive: true
            },
        },

        {
            path: '/admin_changeAudit',
            name: 'admin_changeAudit',
            component: r => require.ensure([], () => r(require('@/components/admin/view/change_audit/change_audit')), 'change_audit'),
            meta: {
                title: [{ name: '用户中心' }, { name: '变动审核' }],
                keepAlive: true
            },
        },

        {
            path: '/admin_readerList',
            name: 'admin_readerList',
            component: r => require.ensure([], () => r(require('@/components/admin/view/reader_management/reader_list')), 'reader-list'),
            meta: {
                title: [{ name: '用户中心' }, { name: '读者管理' }],
                keepAlive: true
            },
        },
        {
            path: '/admin_importUser',
            name: 'admin_importUser',
            component: r => require.ensure([], () => r(require('@/components/admin/view/reader_management/import_excel')), 'import_excel'),
            meta: {
                title: [{ name: '用户中心' }, { name: '读者管理', path: '/admin_readerList' }, { name: '导入读者数据' }],
                keepAlive: true
            },
        },
        {
            path: '/admin_readerManagement',
            name: 'admin_readerManagement',
            component: r => require.ensure([], () => r(require('@/components/admin/view/reader_management/reader_management')), 'reader_management'),
            meta: {
                title: [{ name: '用户中心' }, { name: '读者管理', path: '/admin_readerList' }, { name: '读者账号管理' }],
                keepAlive: true
            },
        },

        {
            path: '/admin_readerAdd',
            name: 'admin_readerAdd',
            component: r => require.ensure([], () => r(require('@/components/admin/view/reader_management/reader_add')), 'reader_add'),
            meta: {
                title: [{ name: '用户中心' }, { name: '读者管理', path: '/admin_readerList' }, { name: '新增读者' }],
                keepAlive: true
            },
        },
        {
            path: '/admin_mergeReader',
            name: 'admin_mergeReader',
            component: r => require.ensure([], () => r(require('@/components/admin/view/reader_management/merge_reader')), 'merge_reader'),
            meta: {
                title: [{ name: '用户中心' }, { name: '读者管理', path: '/admin_readerList' }, { name: '合并读者' }],
                keepAlive: true
            },
        },
        {
            path: '/admin_readerCardList',
            name: 'admin_readerCardList',
            component: r => require.ensure([], () => r(require('@/components/admin/view/reader_card_manager/reader_card_list')), 'reader_card_list'),
            meta: {
                title: [{ name: '用户中心' }, { name: '读者卡管理' }],
                keepAlive: true
            },
        },
        {
            path: '/admin_readerCardSnyc',
            name: 'admin_readerCardSnyc',
            component: r => require.ensure([], () => r(require('@/components/admin/view/reader_card_manager/reader_card_snyc')), 'reader_card_snyc'),
            meta: {
                title: [{ name: '用户中心' }, { name: '读者卡管理' }, { name: '同步日志' }],
                keepAlive: true
            },
        },
        {
            path: '/admin_readerCardAdd',
            name: 'admin_readerCardAdd',
            component: r => require.ensure([], () => r(require('@/components/admin/view/reader_card_manager/reader_card_add')), 'reader_card_add'),
            meta: {
                title: [{ name: '用户中心' }, { name: '读者卡管理', path: '/admin_readerCardList' }, { name: '新增读者卡' }],
                keepAlive: true
            },
        },
        {
            path: '/admin_readerCardEdit',
            name: 'admin_readerCardEdit',
            component: r => require.ensure([], () => r(require('@/components/admin/view/reader_card_manager/reader_card_edit')), 'reader_card_edit'),
            meta: {
                title: [{ name: '用户中心' }, { name: '读者卡管理', path: '/admin_readerCardList' }, { name: '编辑读者卡' }],
                keepAlive: true
            },
        },

        {
            path: '/admin_librarianManagement',
            name: 'admin_librarianManagement',
            component: r => require.ensure([], () => r(require('@/components/admin/view/librarian_management/librarian_management')), 'librarian_management'),
            meta: {
                title: [{ name: '用户中心' }, { name: '馆员管理' }],
                keepAlive: true
            },
        },
        {
            path: '/admin_userGroupList',
            name: 'admin_userGroupList',
            component: r => require.ensure([], () => r(require('@/components/admin/view/user_group_manager/user_group_list')), 'user_group_list'),
            meta: {
                title: [{ name: '用户中心' }, { name: '用户组管理' }],
                keepAlive: true
            },
        },
        {
            path: '/admin_ruleCreat',
            name: 'admin_ruleCreat',
            component: r => require.ensure([], () => r(require('@/components/admin/view/user_group_manager/rule_creat')), 'rule_creat'),
            meta: {
                title: [{ name: '用户中心' }, { name: '用户组管理', path: '/admin_userGroupList' }, { name: '规则创建' }],
                keepAlive: true
            },
        },
        {
            path: '/admin_handCreat',
            name: 'admin_handCreat',
            component: r => require.ensure([], () => r(require('@/components/admin/view/user_group_manager/hand_creat')), 'hand_creat'),
            meta: {
                title: [{ name: '用户中心' }, { name: '用户组管理', path: '/admin_userGroupList' }, { name: '手动创建' }],
                keepAlive: true
            },
        },
        {
            path: '/admin_userList',
            name: 'admin_userList',
            component: r => require.ensure([], () => r(require('@/components/admin/view/user_group_manager/user_list')), 'user_list'),
            meta: {
                title: [{ name: '用户中心' }, { name: '用户组管理', path: '/admin_userGroupList' }, { name: '用户列表' }],
                keepAlive: true
            },
        },
        {
            path: '/admin_userSet',
            name: 'admin_userSet',
            component: r => require.ensure([], () => r(require('@/components/admin/view/user_set/user_set')), 'user_set'),
            meta: {
                title: [{ name: '用户中心' }, { name: '管理设置' }],
                keepAlive: true
            },
        },
        {
            path: '/admin_roleAdd',
            name: 'admin_roleAdd',
            component: r => require.ensure([], () => r(require('@/components/admin/view/user_set/role_add')), 'role_add'),
            meta: {
                title: [{ name: '用户中心' }, { name: '管理设置', path: '/admin_userSet' }, { name: '新增角色' }],
                keepAlive: true
            },
        },
    ].map(x => {
        x.beforeEnter = beforeEnterImplAsync;
        return x;
    })
}