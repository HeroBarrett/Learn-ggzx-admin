// 对外暴露配置路由(常量路由)

export const constantRoute = [
  {
    // 登录路由
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login', // 命名路由
    meta: {
      title: '登录', // 菜单标题
      hidden: false, // 路由的标题在菜单中是否隐藏
      icon: 'Promotion', // 图标
    },
  },
  {
    // 登录成功展示数据
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout', // 命名路由
    meta: {
      title: 'layout', // 菜单标题
      hidden: false, // 路由的标题在菜单中是否隐藏
      icon: 'Avatar', // 图标
    },
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页', // 菜单标题
          hidden: false, // 路由的标题在菜单中是否隐藏
          icon: 'HomeFilled', // 图标
        },
      },
      {
        path: '/ceshi',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '测试', // 菜单标题
          hidden: false, // 路由的标题在菜单中是否隐藏
          icon: 'InfoFilled', // 图标
        },
      },
    ],
  },
  {
    // 404
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404', // 命名路由
    meta: {
      title: '404', // 菜单标题
      hidden: true, // 路由的标题在菜单中是否隐藏
      icon: 'DocumentDelete', // 图标
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
      title: '任意路由', // 菜单标题
      hidden: true, // 路由的标题在菜单中是否隐藏
      icon: 'DataLine', // 图标
    },
  },
]
