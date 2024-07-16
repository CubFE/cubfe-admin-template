<template>
    <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-primary px-4 lg:overflow-y-auto lg:bg-primary-800 lg:pb-4 dark:bg-dark">
        <div class="flex h-16 shrink-0 items-center justify-start">
                <Logo class="block h-10 w-auto lg:block"/>
                <h2 class="text-white font-bold text-2xl ml-4" :class="[sidebarOpen?'':'sr-only']">CubFE</h2>
        </div>
        <nav class="flex flex-1 flex-col">
            <ul role="list" class="flex flex-col  space-y-1">
                <li v-for="(item,index) in roters" :key="index">
                    <!-- <a :href="item.href" :class="[item.current ? 'bg-primary-600 text-white' : 'text-indigo-100 hover:text-white hover:bg-primary', 'group flex gap-x-3 rounded-xl p-3 text-sm leading-6 font-semibold mb-4']">
                      <component :is="item.meta.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
                      <span :class="[sidebarOpen?'':'sr-only']">{{ item.meta.localeKey?t(item.meta.localeKey): item.meta.pageTitle }}</span>
                    </a> -->
                    <SideblockItem  :item="item" :index="index" :activeIndex.sync="activeIndex" @update:activeIndex="updateActiveIndex"/>
                </li>
            </ul>
        </nav>
    </div>
</template>
<script lang="ts">
import { ref, defineEmits, defineProps, defineComponent, withDefaults,computed } from "vue";
import { isExternal } from "@/core/utils/validate";
import path from "path-browserify";
import Logo from '@/components/Logo.vue';
import { type RouteRecordRaw } from "vue-router"
import { constantRouters } from "@/router/index";
import SideblockItem from "./SideblockItem.vue"
import { useI18n } from "vue-i18n";
import { useSystemStore } from "@/stores/sys";

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
    components: {Logo, SideblockItem},
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
        const activeIndex = ref(0); 
        const updateActiveIndex = (index: number) => {
          activeIndex.value = index;
        };
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
        return {
            t,
            activeIndex,
            updateActiveIndex,
            sidebarOpen,
            Logo,
            roters,
            currentNavItem,
            activeNavItem,
            resolvePath,
            emit
        }
    }
});

</script>