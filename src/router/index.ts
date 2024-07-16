import {
    createRouter,
    createWebHashHistory,
    createWebHistory,
    type RouteRecordRaw,
} from "vue-router";
import { useAuthStore } from "@/stores/auth";
import NProgress from 'nprogress';
import {
  ComputerDesktopIcon,
  RectangleGroupIcon,
  PaintBrushIcon,
  FingerPrintIcon,
  ExclamationTriangleIcon,
  CommandLineIcon,
  InboxIcon,
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  ShoppingBagIcon,
  RectangleStackIcon,
  ScaleIcon,
  ListBulletIcon,
  PresentationChartLineIcon,
  ChartPieIcon,
  SwatchIcon,
  TableCellsIcon,
  PaperAirplaneIcon,
} from '@heroicons/vue/24/outline'
export const constantRouters: Array<RouteRecordRaw> = [
    {
      path: '/redirect',
      component: import('@/layouts/MainLayout.vue'),
      children: [
          {
              path: '/redirect/:path*',
              component: () => import('@/views/redirect/Index.vue')
          }
      ]
    },
    { 
        path: '/', 
        redirect: '/dashboard', 
        meta: {
            root: true,
            hideSidebar: false,
            icon: HomeIcon,
            pageTitle: 'Home',
            localeKey: 'menu.Home',
            // middleware: "auth",
        },
        component: () => import('@/layouts/MainLayout.vue'),
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                redirect: '/dashboard/default',
                meta: {
                    pageTitle: 'Dashboard',
                    icon: HomeIcon,
                    hideSidebar: false,
                    localeKey: 'menu.Dashboard',
                },
                children:[
                  {
                    path: '/dashboard/default',
                    name: 'default',
                    component: () => import('@/views/dashboard/Index.vue'),
                    meta: {
                        pageTitle: 'Default',
                        icon: ComputerDesktopIcon,
                        hideSidebar: false,
                        localeKey: 'menu.Dashboard.Default',
                    }
                  },
                  {
                    path: '/dashboard/e-commerce',
                    name: 'e-commerce',
                    component: () => import('@/views/dashboard/ECommerce.vue'),
                    meta: {
                        pageTitle: 'ECommerce',
                        icon: ShoppingBagIcon,
                        hideSidebar: false,
                        localeKey: 'menu.Dashboard.ECommerce',
                    }
                  },
                  {
                    path: '/dashboard/project',
                    name: 'project',
                    component: () => import('@/views/dashboard/Project.vue'),
                    meta: {
                        pageTitle: 'Project',
                        icon: RectangleStackIcon,
                        hideSidebar: false,
                        localeKey: 'menu.Dashboard.Project',
                    }
                  },
                  {
                    path: '/dashboard/marketing',
                    name: 'marketing',
                    component: () => import('@/views/dashboard/Marketing.vue'),
                    meta: {
                        pageTitle: 'Marketing',
                        icon: ScaleIcon,
                        hideSidebar: false,
                        localeKey: 'menu.Dashboard.Marketing',
                    }
                  }
                ]
            },
            {
                path: '/widgets',
                name: 'widgets',
                redirect: '/widgets/lists',
                meta: {
                    pageTitle: 'Widgets',
                    icon: RectangleGroupIcon,
                    hideSidebar: false,
                    localeKey: 'menu.Widgets'
                },
                children:[
                  {
                    path: '/widgets/lists',
                    name: 'lists',
                    component: () => import('@/views/widgets/Lists.vue'),
                    meta: {
                        pageTitle: 'Lists',
                        icon: ListBulletIcon,
                        hideSidebar: false,
                        localeKey: 'menu.Widgets.Lists'
                    }
                  },
                  {
                    path: '/widgets/statistics',
                    name: 'statistics',
                    component: () => import('@/views/widgets/Statistics.vue'),
                    meta: {
                        pageTitle: 'Statistics',
                        icon: PresentationChartLineIcon,
                        hideSidebar: false,
                        localeKey: 'menu.Widgets.Statistics'
                    }
                  },
                  {
                    path: '/widgets/charts',
                    name: 'charts',
                    component: () => import('@/views/widgets/Charts.vue'),
                    meta: {
                        pageTitle: 'Charts',
                        icon: ChartPieIcon,
                        hideSidebar: false,
                        localeKey: 'menu.Widgets.Charts'
                    }
                  },
                  {
                    path: '/widgets/mixed',
                    name: 'mixed',
                    component: () => import('@/views/widgets/Mixed.vue'),
                    meta: {
                        pageTitle: 'Mixed',
                        icon: SwatchIcon,
                        hideSidebar: false,
                        localeKey: 'menu.Widgets.Mixed'
                    }
                  },
                  {
                    path: '/widgets/tables',
                    name: 'tables',
                    component: () => import('@/views/widgets/Tables.vue'),
                    meta: {
                        pageTitle: 'Tables',
                        icon: TableCellsIcon,
                        hideSidebar: false,
                        localeKey: 'menu.Widgets.Tables'
                    }
                  },
                  {
                    path: '/widgets/feeds',
                    name: 'feeds',
                    component: () => import('@/views/widgets/Feeds.vue'),
                    meta: {
                        pageTitle: 'Feeds',
                        icon: PaperAirplaneIcon,
                        hideSidebar: false,
                        localeKey: 'menu.Widgets.Feeds'
                    }
                  }
                ]
            },
            {
              path: '/app',
              name: 'app',
              meta: {
                  pageTitle: 'Application',
                  icon: PaintBrushIcon,
                  hideSidebar: false,
              },
              children: [
                {
                  path: '/inbox',
                  name: 'inbox',
                  component: () => import('@/views/dashboard/Index.vue'),
                  meta: {
                      pageTitle: 'Inbox',
                      icon: InboxIcon,
                      hideSidebar: false
                  }
                },
                {
                  path: '/chat',
                  name: 'caht',
                  component: () => import('@/views/dashboard/Index.vue'),
                  meta: {
                      pageTitle: 'Chat',
                      icon: ChatBubbleLeftEllipsisIcon,
                      hideSidebar: false
                  }
                },
              ]
            },
            {
              path: '/auth',
              name: 'authentication',
              meta: {
                  pageTitle: 'Authentication',
                  icon: FingerPrintIcon,
                  hideSidebar: false
              },
              children: [
                {
                  path: 'signin',
                  name: 'signin',
                  component: () => import('@/views/dashboard/Index.vue'),
                  meta: {
                      pageTitle: 'Sign In',
                      icon: FingerPrintIcon,
                      hideSidebar: false
                  }
                },
                {
                  path: 'signup',
                  name: 'signup',
                  component: () => import('@/views/dashboard/Index.vue'),
                  meta: {
                      pageTitle: 'Sign Up',
                      icon: FingerPrintIcon,
                      hideSidebar: false
                  }
                },
                {
                  path: 'forgot',
                  name: 'forgot',
                  component: () => import('@/views/dashboard/Index.vue'),
                  meta: {
                      pageTitle: 'Forgot Password',
                      icon: FingerPrintIcon,
                      hideSidebar: false
                  }
                },
                {
                  path: 'resetpass',
                  name: 'resetpass',
                  component: () => import('@/views/dashboard/Index.vue'),
                  meta: {
                      pageTitle: 'Reset Password',
                      icon: FingerPrintIcon,
                      hideSidebar: false
                  }
                },
              ]
            },
            {
              path: '/error',
              name: 'error-page',
              meta: {
                  pageTitle: 'Error',
                  icon: ExclamationTriangleIcon,
                  hideSidebar: false
              },
              children: [
                {
                  path: '/error404',
                  name: 'error404',
                  component: () => import('@/views/dashboard/Index.vue'),
                  meta: {
                      pageTitle: 'Error 404',
                      icon: InboxIcon,
                      hideSidebar: false
                  }
                },
                {
                  path: '/error500',
                  name: 'error500',
                  component: () => import('@/views/dashboard/Index.vue'),
                  meta: {
                      pageTitle: 'Error 500',
                      icon: ChatBubbleLeftEllipsisIcon,
                      hideSidebar: false
                  }
                },
              ]
            }
        ]
    },
    {
        path: '/auth',
        redirect: '/auth/login',
        component: () => import('@/layouts/AuthLayout.vue'),
        meta: {
            hideSidebar: true,
        },
        children: [
            {
                path: 'login',
                component: () => import('@/views/auth/Login.vue'),
                meta: {
                    hideSidebar: true,
                }
            },
        ]
    },
    {
        path: "/error",
        component: () => import("@/layouts/SystemLayout.vue"),
        children: [
          {
            // the 404 route, when none of the above matches
            path: "/404",
            name: "404",
            component: () => import("@/views/system/Error404.vue"),
            meta: {
              pageTitle: "Error 404",
            },
          },
          {
            path: "/500",
            name: "500",
            component: () => import("@/views/system/Error500.vue"),
            meta: {
              pageTitle: "Error 500",
            },
          },
        ],
    },
    {
        path: "/:pathMatch(.*)*",
        redirect: "/error/404",
    },
];
const router = createRouter({
    history: createWebHashHistory(),//createWebHashHistory(),
    routes: constantRouters,
});
// router.isReady().then(() => {
//     const permissionStore = usePermissionStore();
//     permissionStore.refreshRouter();
//     console.log(router.getRoutes())
// });
router.beforeEach((to, from, next) => {
    NProgress.start(); // start progress bar
    const authStore = useAuthStore();
    // current page view title
    document.title = `${to.meta.pageTitle} - ${import.meta.env.VITE_APP_NAME}`;
    // verify auth token before each page change
    // authStore.verifyAuth();
    // before page access check if page requires authentication
    if (to.meta.middleware == "auth") {
      if (authStore.isAuthenticated) {
        next();
      } else {
        next({ name: "sign" });
      }
    } else {
      next();
    }
  
    // Scroll page to top on every route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
});

router.afterEach(() => {
    NProgress.done() // finish progress bar
})
export default router;








