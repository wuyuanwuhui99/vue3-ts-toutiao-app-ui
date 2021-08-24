import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        meta: {keepAlive: true},
        component: () => import('../pages/HomePage.vue')
    },
    {
        path: '/articleDetail/:id',
        name: 'detail',
        meta: {keepAlive: false},
        component: () => import('../pages/ArticleDetailPage.vue')
    },
    {
        path: '/recordList',
        name: 'recordList',
        meta: {keepAlive: false},
        component: () => import('../pages/RecordListPage.vue')
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router
