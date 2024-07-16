<template>
    <Menu as="div" class="relative dark:bg-dark-sideber">
        <MenuButton class="flex items-center rounded-lg p-0 bg-transparent dark:bg-dark-sidebar hover:border-transparent active:border-transparent focus:border-transparent">
            <!-- <span class="sr-only">Open user menu</span> -->
            <img class="h-10 w-10 rounded-lg bg-gray-50" :src="getAssetPath('images/avatars/101.png')" alt="" />
            <!-- <div class="hidden lg:flex lg:items-center">
                <div class="ml-3 text-left">
                    <p class="text-sm font-medium text-gray-700 group-hover:text-gray-900 dark:text-white">Gavin Wang</p>
                    <p class="text-xs font-medium text-gray-500 group-hover:text-gray-700 dark:text-gray-400">Senior FE Architect</p>
                </div>
                <ChevronDownIcon class="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
            </div> -->
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
</template>
<script lang="ts">
import { ref, defineComponent } from "vue";
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems
  } from '@headlessui/vue';
  import {
    ChevronDownIcon,
    UserIcon,
    Cog6ToothIcon,
    ArrowLeftStartOnRectangleIcon,
  } from '@heroicons/vue/24/outline';
import { getAssetPath } from "@/core/helpers/assets";
import { useI18n } from "vue-i18n";
export default defineComponent({
    name: "UserAccountMenu",
    components: {
        ChevronDownIcon,
        Menu,
        MenuButton,
        MenuItem,
        MenuItems,
    },
    setup(props: any, { emit }) {
        const { t } = useI18n();
        const userNavigation = [
            { name: 'user-profile', href: '#', icon: UserIcon },
            { name: 'user-settings', href: '#' , icon: Cog6ToothIcon},
            { name: 'user-logout', href: '#' ,icon: ArrowLeftStartOnRectangleIcon},
        ]
        return {
            t,
            userNavigation,
            getAssetPath
        }
    }
})
</script>