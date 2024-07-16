<template>
    <Disclosure as="nav" class="bg-white shadow-sm z-10">
        <div class="mx-auto px-4 sm:px-6 lg:px-8 bg-primary-800 dark:bg-dark">
            <div class="flex h-16 justify-between">
                <div class="flex">
                    <div class="flex flex-shrink-0 items-center">
                        <Logo class="block h-10 w-auto lg:block" />
                    </div>
                    <div class="sm:-my-px sm:ml-12 sm:flex sm:space-x-2">
                        <Menu as="div" class="relative dark:bg-dark-sideber inline-block">
                            <MenuButton class="bg-transparent border-0 p-0 h-full focus:border-none focus:outline-none">
                                <router-link v-for="item in roters" :key="item.name" :href="item.path"
                                    :class="[item.current ? 'bg-primary text-white' : 'border-transparent text-indigo-100 hover:text-white hover:border-gray-300 hover:text-gray-700', 'inline-flex items-center border-b-4 px-3 pt-1 text-sm font-medium cursor-pointer h-full']"
                                    :aria-current="item.current ? 'page' : undefined">
                                    <component :is="item.meta.icon" class="h-5 w-5 mr-2 shrink-0" aria-hidden="true" />
                                    {{ item.meta.localeKey?t(item.meta.localeKey): item.meta.pageTitle }}
                                    <component :is="ChevronDownIcon" class="h-4 w-4 ml-2 shrink-0" aria-hidden="true" />
                                </router-link>
                            </MenuButton>
                            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                                <MenuItems class="absolute right-0 z-10 mt-2.5 w-56 origin-top-right rounded-lg bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none dark:bg-dark-sidebar dark:ring-0">
                                    <div class="flex gap-1 items-center px-3 py-3 mb-2.5 border-b dark:border-b-dark">
                                        <img class="h-14 w-14 rounded-lg bg-gray-50" :src="getAssetPath('images/avatars/101.png')" alt="" />
                                        <div class="ml-3 text-left">
                                            <p class="text-sm font-medium text-gray-700 group-hover:text-gray-900 dark:text-white">Gavin Wang</p>
                                            <p class="text-xs mt-1 font-medium text-gray-500 group-hover:text-gray-700 dark:text-gray-400">Technology Center</p>
                                            <p class="text-xs mt-1 font-medium text-gray-500 group-hover:text-gray-700 dark:text-gray-400">Senior FE Architect</p>
                                        </div>
                                    </div>
                                    <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }" class="dark:bg-dark-sidebar">
                                        <a :href="item.href" :class="[active ? 'bg-gray-50 dark:text-gray-300 dark:bg-dark-sidebar dark:hover:bg-dark' : '', 'flex gap-1 items-center block px-4 py-2 text-sm leading-6 text-gray-900 dark:text-gray-400']">
                                            <component :is="item.icon" class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                            <span>{{ t(item.name) }}</span>
                                        </a>
                                    </MenuItem>
                                </MenuItems>
                            </transition>
                        </Menu>
                        
                    </div>
                </div>
                <nav-bar :icon-search="true"/>
            </div>
        </div>
    </Disclosure>
</template>
<script lang="ts">
import { ref, defineEmits, defineProps, defineComponent, withDefaults } from "vue";
import { isExternal } from "@/core/utils/validate";
import path from "path-browserify";
import Logo from '@/components/Logo.vue';
import { type RouteRecordRaw } from "vue-router"
import { constantRouters } from "@/router/index";
import { useI18n } from "vue-i18n";
import NavBar from '../navbar/NavBar.vue'

import {
    ChevronDownIcon,
  } from '@heroicons/vue/24/outline';
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems
  } from '@headlessui/vue';

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
    components: {
        Logo, 
        NavBar, 
        Menu,
        MenuButton,
        MenuItem,
        MenuItems,
        ChevronDownIcon
    },
    emits: ['changeNavItem'],
    setup(props: any, { emit }) {
        const { t } = useI18n()
        const rootRouters = constantRouters.find((item: any) => {
            return item.meta && item.meta.root && item.meta.root == true
        });
        const roters = rootRouters.children.filter((item: any) => {
            return item.meta.hideSidebar != true
        })

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
        return {
            t,
            Logo,
            ChevronDownIcon,
            roters,
            currentNavItem,
            activeNavItem,
            resolvePath,
            emit
        }
    }
});

</script>