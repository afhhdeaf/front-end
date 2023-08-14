import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layouts/index.vue'
import { getToken } from '@/utils/token'

export const constRoutes = [
  {
    path: '/',
    name: 'Root',
    component: Layout,
    redirect: '/index',
    // meta: { title: '首页', icon: 'icon-home', },
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import('@/views/index.vue'),
        meta: {
          title: '首页',
          icon: 'icon-home',
          affix: true,
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      hidden: true,
    },
  },
  {
    path: '/add',
    name: 'Add',
    component: Layout,
    meta: { title: '添加', icon: 'icon-add-computer', affix: true },
    children: [
      {
        path: '/gateway',
        name: 'Gateway',
        component: () => import('@/views/index.vue'),
        meta: {
          title: '网关',
          icon: 'icon-router',
        },
      },
      {
        path: '/node',
        name: 'Node',
        component: () => import('@/views/index.vue'),
        meta: {
          title: '节点',
          icon: 'icon-database-point',
        },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constRoutes,
})

export function setupRouter(app) {
  router.beforeEach(async (to, from, next) => {
    const token = getToken()
    if (token) {
      if (to.path === '/login') {
        next({ path: '/' })
      } else next()
    } else {
      if (to.path === '/login') {
        next()
      } else {
        next({ path: '/login', replace: true })
      }
    }
  })
  app.use(router)
  return router
}

export default router
