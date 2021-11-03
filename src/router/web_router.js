/***门户路由 */
export default {
  router: [
    // {
    //   path: "/list1",
    //   name: "list1",
    //   component: r =>
    //     require.ensure(
    //       [],
    //       () => r(require("@/components/web/view/temp1/list")),
    //       "list"
    //     ),
    //   meta: { title: "列表页面-模板1", keepAlive: true }
    // },
    // {
    //   path: "/topicList",
    //   name: "topicList",
    //   component: r =>
    //     require.ensure(
    //       [],
    //       () => r(require("@/components/web/view/literatureTopic/TopicList")),
    //       "topicList"
    //     ),
    //   meta: { title: "文献专题", keepAlive: true }
    // },
    // {
    //   path: "/topicDetail",
    //   name: "topicDetail",
    //   component: r =>
    //     require.ensure(
    //       [],
    //       () => r(require("@/components/web/view/literatureTopic/TopicDetail")),
    //       "topicDetail"
    //     ),
    //   meta: { title: "专题详情", keepAlive: true }
    // },
    // {
    //   path: "/topicDetail2",
    //   name: "topicDetail2",
    //   component: r =>
    //     require.ensure(
    //       [],
    //       () =>
    //         r(require("@/components/web/view/literatureTopic/TopicDetail2")),
    //       "topicDetail2"
    //     ),
    //   meta: { title: "专题详情2", keepAlive: true }
    // },
    // {
    //   path: "/myTopic",
    //   name: "myTopic",
    //   component: r =>
    //     require.ensure(
    //       [],
    //       () => r(require("@/components/web/view/literatureTopic/MyTopic")),
    //       "myTopic"
    //     ),
    //   meta: { title: "我的专题", keepAlive: true }
    // },
    // {
    //   path: "/recommendList",
    //   name: "recommendList",
    //   component: r =>
    //     require.ensure(
    //       [],
    //       () => r(require("@/components/web/view/literatureRecommend/List")),
    //       "recommendList"
    //     ),
    //   meta: { title: "文件推荐列表", keepAlive: true }
    // },
    // {
    //   path: "/recommendList2",
    //   name: "recommendList2",
    //   component: r =>
    //     require.ensure(
    //       [],
    //       () => r(require("@/components/web/view/literatureRecommend/List2")),
    //       "recommendList2"
    //     ),
    //   meta: { title: "文件推荐列表2", keepAlive: true }
    // },
    // {
    //   path: "/recommendList3",
    //   name: "recommendList3",
    //   component: r =>
    //     require.ensure(
    //       [],
    //       () => r(require("@/components/web/view/literatureRecommend/List3")),
    //       "recommendList3"
    //     ),
    //   meta: { title: "文件推荐列表3", keepAlive: true }
    // },
    {
      path: "/dataBaseHome",
      name: "dataBaseHome",
      component: r =>
        require.ensure(
          [],
          () => r(require("@/components/web/view/DataBase/Home")),
          "dataBaseHome"
        ),
      meta: { title: "数据库首页", keepAlive: true }
    },
    {
      path: "/dataBaseHome2",
      name: "dataBaseHome2",
      component: r =>
        require.ensure(
          [],
          () => r(require("@/components/web/view/DataBase/Home2")),
          "dataBaseHome2"
        ),
      meta: { title: "数据库首页2", keepAlive: true }
    },
    {
      path: "/dataBaseDetail",
      name: "dataBaseDetail",
      component: r =>
        require.ensure(
          [],
          () => r(require("@/components/web/view/DataBase/Details")),
          "dataBaseDetail"
        ),
      meta: { title: "数据库详情", keepAlive: true } 
    },
    {
      path: "/myDataBase",
      name: "myDataBase",
      component: r =>
        require.ensure(
          [],
          () => r(require("@/components/web/view/DataBase/MyDataBase")),
          "myDataBase"
        ),
      meta: { title: "我的数据库", keepAlive: true }
    },
    // {
    //   path: '/detailspage1',
    //   name: 'detailspage1',
    //   component: r => require.ensure([], () => r(require('@/components/web/view/literatureRecommend/List3')), 'list'),
    //   meta: { title: '详情页面-模板1' , keepAlive:true},
    // },
    // {
    //   path: '/list2',
    //   name: 'list2',
    //   component: r => require.ensure([], () => r(require('@/components/web/view/temp2/list')), 'list'),
    //   meta: { title: '列表页面-模板2' , keepAlive:true},
    // },
    // {
    //   path: '/detailspage2',
    //   name: 'detailspage2',
    //   component: r => require.ensure([], () => r(require('@/components/web/view/temp2/detailspage')), 'list'),
    //   meta: { title: '详情页面-模板2' , keepAlive:true},
    // },
  ]
};
