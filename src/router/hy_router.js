/***胡余 */
export default {
    router: [
        {
            path: '/userList',
            name: 'userList',
            component: r => require.ensure([], () => r(require('@/components/view/user_center/list/list')), 'list'), 
            meta: { title: '用户中心-列表', keepAlive: true },
        },
    ],
}