// 对外暴露配置路由(常量路由)

export const constantRoute = [
  {
    // 登录路由
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login', // 命名路由
    meta: {
      title: '登录', // 菜单标题
      hidden: true, // 路由的标题在菜单中是否隐藏
      icon: 'Promotion', // 图标
    },
  },
  {
    // 登录成功展示数据
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout', // 命名路由
    redirect: '/home',
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
      // {
      //   path: '/ceshi',
      //   component: () => import('@/views/home/index.vue'),
      //   meta: {
      //     title: '测试', // 菜单标题
      //     hidden: false, // 路由的标题在菜单中是否隐藏
      //     icon: 'InfoFilled', // 图标
      //   },
      // },
    ],
  },
  {
    path: '/screen',
    component: () => import('@/views/screen/index.vue'),
    name: 'Screen',
    meta: {
      title: '数据大屏', // 菜单标题
      hidden: false, // 路由的标题在菜单中是否隐藏
      icon: 'Platform', // 图标
    },
  },
  {
    path: '/acl',
    component: () => import('@/layout/index.vue'),
    name: 'Acl',
    meta: {
      title: '权限管理', // 菜单标题
      hidden: false, // 路由的标题在菜单中是否隐藏
      icon: 'Lock', // 图标
    },
    children: [
      {
        path: '/acl/user',
        component: () => import('@/views/acl/user/index.vue'),
        name: 'User',
        meta: {
          title: '用户管理', // 菜单标题
          hidden: false, // 路由的标题在菜单中是否隐藏
          icon: 'User', // 图标
        },
      },
      {
        path: '/acl/role',
        component: () => import('@/views/acl/role/index.vue'),
        name: 'Role',
        meta: {
          title: '角色管理', // 菜单标题
          hidden: false, // 路由的标题在菜单中是否隐藏
          icon: 'UserFilled', // 图标
        },
      },
      {
        path: '/acl/permission',
        component: () => import('@/views/acl/permission/index.vue'),
        name: 'Permission',
        meta: {
          title: '菜单管理', // 菜单标题
          hidden: false, // 路由的标题在菜单中是否隐藏
          icon: 'List', // 图标
        },
      },
    ],
  },
  {
    path: '/product',
    component: () => import('@/layout/index.vue'),
    name: 'Product',
    meta: {
      title: '商品管理',
      icon: 'Goods',
      hidden: false
    },
    children: [
      {
        path: '/product/trademark',
        component: () => import('@/views/product/trademark/index.vue'),
        name: 'Trademark',
        meta: {
          title: '品牌管理', // 菜单标题
          hidden: false, // 路由的标题在菜单中是否隐藏
          icon: 'ShoppingCartFull', // 图标
        },
      },
      {
        path: '/product/attr',
        component: () => import('@/views/product/attr/index.vue'),
        name: 'Attr',
        meta: {
          title: '属性管理', // 菜单标题
          hidden: false, // 路由的标题在菜单中是否隐藏
          icon: 'ChromeFilled', // 图标
        },
      },
      {
        path: '/product/spu',
        component: () => import('@/views/product/spu/index.vue'),
        name: 'Spu',
        meta: {
          title: 'SPU管理', // 菜单标题
          hidden: false, // 路由的标题在菜单中是否隐藏
          icon: 'Calendar', // 图标
        },
      },
      {
        path: '/product/sku',
        component: () => import('@/views/product/sku/index.vue'),
        name: 'Sku',
        meta: {
          title: 'SKU管理', // 菜单标题
          hidden: false, // 路由的标题在菜单中是否隐藏
          icon: 'Orange', // 图标
        },
      }
    ]

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
