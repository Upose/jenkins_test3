/***后台管理系统 项目接口地址 */
import newsPostUrl from '@/assets/js/api/news_api';//引入新闻发布接口
import databasePostUrl from '@/assets/js/api/database_api';//引入数据库导航接口
import appsCenterPostUrl from '@/assets/js/api/apps_center';//引入应用中心接口
import infoNavigationPostUrl from '@/assets/js/api/info_api';//引入信息导航接口


export default {
    postUrl: {
        ...newsPostUrl.postUrl, ...databasePostUrl.postUrl, ...appsCenterPostUrl, ...infoNavigationPostUrl.postUrl
    },
}