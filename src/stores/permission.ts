/**
 * 授权
 */
import { ref } from "vue";
import { defineStore } from 'pinia'
import router from '@/router';
import JwtService from "@/core/services/JwtService";

export const usePermissionStore = defineStore('permission', () => {
    const dynamicRoutes = ref(JSON.parse(JwtService.getDynamicRoutes() || "{}"));
    // vite中获取文件
    const modules = import.meta.glob([
        '../views/*.vue',
        '../views/*/*.vue',
        '../views/*/*/*.vue',
        '../layouts/MainLayout.vue',
    ])
    function syncDynamicRoutes() {
        const routersJsonStr = JwtService.getDynamicRoutes()
        const routersJsonObj = JSON.parse(routersJsonStr || "[]")
        // 添加路由
        addDynamicRoute(routersJsonObj)
    }
    function addDynamicRoute(routes: any[]) {
        if (routes && routes.length > 0){
            routes.forEach((item) => {
              const routeName = item.name
              if (!router.hasRoute(routeName)) router.addRoute(item)
            })
        }
    }
    function generateRouter(userRouters) {
        let newRouter = null
        if (userRouters) {
            newRouter = userRouters.map((i) => {
                let route = {
                    path: i.path,
                    name: i.name,
                    meta: i.meta,
                    component:
                    i.component === undefined && i.name !== 'sys_flow'
                        ? modules[`../layouts/MainLayout.vue`]
                        : modules[`../views${i.component}.vue`],
                }
                if(i.name == "sys_flow") {
                    i.component = modules[`../views/router-view/Index.vue`]
                }
                
                if (i.children) {
                    route.children = generateRouter(i.children)
                }
                return route
            })
        }
        return newRouter
    }
    function refreshRouter() {
      // routerList在登陆成功时获取到，在跳转页面之前存起来
      let find = JSON.parse(JwtService.getDynamicRoutes() || "[]")
      let routerList = generateRouter(find)
      // 添加路由
      addDynamicRoute(routerList || [])
    }

    return {
        dynamicRoutes,
        syncDynamicRoutes,
        addDynamicRoute,
        generateRouter,
        refreshRouter
    };
})