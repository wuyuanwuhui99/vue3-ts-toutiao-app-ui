import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        meta: {keepAlive: true},
        component: () => import('../views/Home.vue')
    },
    {
        path: '/articleDetail/:id',
        name: 'detail',
        meta: {keepAlive: false},
        component: () => import('../views/ArticleDetail.vue')
    },
    {
        path: '/recordList',
        name: 'recordList',
        meta: {keepAlive: false},
        component: () => import('../views/RecordList.vue')
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router
