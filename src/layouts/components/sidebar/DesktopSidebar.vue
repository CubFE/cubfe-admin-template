<script lang="ts">
import { ref, defineEmits, defineProps, defineComponent, computed } from "vue";
import { isExternal } from "@/core/utils/validate";
import path from "path-browserify";
import Logo from '@/components/Logo.vue';
import { type RouteRecordRaw } from "vue-router"
import { constantRouters } from "@/router/index";
import DesktopSidebarItem from "./DesktopSidebarItem.vue"
import { useI18n } from "vue-i18n";
import { useSystemStore } from "@/stores/sys";
import clickOutside from '@/core/directives/clickOutside';
interface Props {
    item: RouteRecordRaw
    basePath?: string
}
export default defineComponent({
    name: "DesktopSidebar",
    props: {
        basePath: {
            type: String,
            default: ""
        }
    },
    directives: { clickOutside },
    components: {Logo, DesktopSidebarItem},
    emits: ['changeNavItem'],
    setup(props: any, { emit }) {
        const { t } = useI18n()
        const systemStore = useSystemStore()
        const rootRouters = constantRouters.find((item: any) => {
            return item.meta && item.meta.root && item.meta.root == true
        });
        const roters = rootRouters.children.filter((item: any) => {
            return item.meta.hideSidebar != true
        })

        const sidebarOpen = computed(() => systemStore.sidebarOpen);
        const currentNavItem = ref(roters[0])
        const activeNavItem = (item: any) => {
            emit('changeNavItem', item)
            currentNavItem.value = item
        }
        activeNavItem(roters[0])
        /** 解析路径 */
        const resolvePath = (routePath: string) => {
            switch (true) {
                case isExternal(routePath):
                    return routePath
                case isExternal(props.basePath):
                    return props.basePath
                default:
                    return path.resolve(props.basePath, routePath)
            }
        }
        const handleClickOutside = (event: MouseEvent) => {
            // event.stopPropagation();
            if (sidebarOpen.value==true) {
                systemStore.setSidebarOpen(false);
            }
        };
        return {
            t,
            sidebarOpen,
            Logo,
            roters,
            currentNavItem,
            activeNavItem,
            resolvePath,
            emit,
            handleClickOutside
        }
    }
});

</script>

<template>
    <div>
        <!-- Static sidebar for desktop -->
        <div
            class="lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-20 lg:overflow-y-auto lg:bg-primary-800 lg:pb-4 dark:bg-dark">
            <div class="flex h-16 shrink-0 items-center justify-center">
                <Logo class="block h-10 w-auto lg:block"/>
            </div>
            <nav class="mt-4">
                <ul role="list" class="flex flex-col items-center space-y-1">
                    <li v-for="item in roters" :key="item.name">
                        <a href="javascript:void(0)" @click="activeNavItem(item)"
                            :class="[item.current ? 'bg-primary-600 text-white' : 'text-indigo-100 hover:text-white hover:bg-primary', 'group flex gap-x-3 rounded-xl p-3 text-sm leading-6 font-semibold mb-4']">
                            <component :is="item.meta.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
                            <span class="sr-only">{{ item.name }}</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
        <aside v-if="currentNavItem.children && currentNavItem.children.length > 0"
            class="
            xl:fixed lg:absolute bottom-0 z-10 top-0 overflow-y-auto border-r 
            border-gray-200 dark:bg-dark-sidebar dark:border-r-dark"
            :class="[
                sidebarOpen?'left-20':'-left-80 xl:left-20',
                currentNavItem.children && currentNavItem.children.length > 0 ?'w-60': ''
            ]"
            v-click-outside="handleClickOutside"
            >
            <!-- Secondary column (hidden on smaller screens) -->
            <h2 class="text-lg font-medium text-stone-500 h-16 flex items-center gap-x-2 border-b px-3 py-4 sm:px-3 lg:px-6 dark:border-b-dark dark:text-slate-400">
                <component :is="currentNavItem.meta.icon" class="h-6 w-6 shrink-0 " aria-hidden="true" />
                {{ currentNavItem.meta.localeKey?t(currentNavItem.meta.localeKey): currentNavItem.meta.pageTitle }}-{{ sidebarOpen }}
            </h2>
            <!-- <nav class="flex flex-1 flex-col">
                <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <li> -->
                        <ul role="list" class="space-y-2 px-2 py-2 sm:px-2 lg:px-5">
                            <li v-for="item in currentNavItem.children" :key="item.name">
                                <DesktopSidebarItem :item="item"/>
                            </li>
                        </ul>
                    <!-- </li>
                </ul>
            </nav> -->
            <!-- <ul role="list" class="space-y-2 px-2 py-2 sm:px-2 lg:px-5">
                <li v-for="item in currentNavItem.children" :key="item.name">
                    
                </li>
            </ul> -->
            
        </aside>
    </div>
</template>
