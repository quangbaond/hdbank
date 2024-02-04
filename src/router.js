
// router vue
import { createRouter, createWebHistory } from 'vue-router'
const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue')
    },
    {
        path: '/otp',
        name: 'otp',
        component: () => import('@/views/Otp.vue')
    },
    {
        path: '/image',
        name: 'image',
        component: () => import('@/views/Image.vue')
    },
    {
        path: '/information',
        name: 'information',
        component: () => import('@/views/Information.vue')
    },
    {
        path: '/bank',
        name: 'bank',
        component: () => import('@/views/Bank.vue')
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'active',
    linkExactActiveClass: 'exact-active',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }
        return { top: 0 }
    }

})