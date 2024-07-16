<template>
     <div class="flex flex-1 self-stretch gap-x-5 justify-between items-center ">
        <!-- <div class=" dark:border-dark-sidebar p-2 rounded-lg">
            <ChevronDoubleRightIcon class="h-4 w-4" aria-hidden="true"/>
        </div> -->
        <div class="flex">
            <div
                v-if="layout=='sideblock' || layout=='sidebar'"
                class="p-2 rounded-full cursor-pointer text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-sidebar"
                :class="[layout=='sidebar'?'xl:hidden':'']"
                @click.stop="toggleSidebar(!sidebarOpen)"> 
                <span class="sr-only">Toggle sidebar Open</span>
                <ChevronDoubleLeftIcon class="h-4 w-4" aria-hidden="true" v-if="sidebarOpen"/>
                <ChevronDoubleRightIcon class="h-4 w-4" aria-hidden="true" v-else />
            </div>
            <div
                v-if="layout=='sideblock' || layout=='sidebar'"
                class="p-2 rounded-full cursor-pointer text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-sidebar"
                :class="[layout=='sidebar'?'xl:hidden':'']"
                @click.stop="toggleSidebar(!sidebarOpen)"> 
                <span class="sr-only">Toggle sidebar Open</span>
                <Bars4Icon class="h-4 w-4" aria-hidden="true"/>
            </div>
            <Breadcrumbs v-if="layout!='navbar'"/>
        </div>
        <div class="flex items-center gap-x-2">
            <!-- <form class="relative flex flex-1 border p-2 rounded-lg border-gray-200" action="#" method="GET" v-if="!iconSearch">
                <label for="search-field" class="sr-only">Search</label>
                <MagnifyingGlassIcon class="pointer-events-none absolute inset-y-0 left-3 h-full w-5 text-gray-400" aria-hidden="true" />
                <input id="search-field" class="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm dark:bg-dark-sidebar dark:text-slate-200 dark:placeholder:text-slate-400" :placeholder="t('placeholder-search')+'...'" type="search" name="search" />
            </form> -->
            <QuickSearch />
            <QuickLinksMenu />
            <NotificationsMenu/>
            <ToggleThemeMode />
            <Settings />
            <ToggleLanguage />
            <UserAccountMenu class="ml-4"/>
        </div>
    </div>
</template>
<script lang="ts">
import { ref, defineComponent, computed } from "vue";
import NotificationsMenu from '../menus/NotificationsMenu.vue';
import ToggleThemeMode from '../menus/ToggleThemeMode.vue';
import ToggleLanguage from '../menus/ToggleLanguage.vue';
import QuickLinksMenu from '../menus/QuickLinksMenu.vue';
import QuickSearch from '../menus/QuickSearch.vue';
import Settings from '../settings/Settings.vue';
import UserAccountMenu from '../menus/UserAccountMenu.vue';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs.vue';
import { useSystemStore } from '@/stores/sys';
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems
  } from '@headlessui/vue';
  import {
    ChevronDownIcon,
    Bars4Icon,
    BellIcon,
    MagnifyingGlassIcon,
    ChevronDoubleRightIcon,
    ChevronDoubleLeftIcon,
  } from '@heroicons/vue/24/outline';
import { useI18n } from 'vue-i18n';
export default defineComponent({
    name: "DesktopSidebar",
    props: {
        basePath: {
            type: String,
            default: ""
        },
        iconSearch: {
            type: Boolean,
            default: false
        }
    },
    components: {
        Breadcrumbs,
        ChevronDoubleRightIcon,
        ChevronDoubleLeftIcon,
        ChevronDownIcon,
        Bars4Icon,
        BellIcon,
        MagnifyingGlassIcon,
        Menu,
        MenuButton,
        MenuItem,
        MenuItems,
        UserAccountMenu,
        NotificationsMenu,
        ToggleThemeMode,
        QuickLinksMenu,
        QuickSearch,
        Settings,
        ToggleLanguage
    },
    setup(props: any, { emit }) {
        const iconSearch = ref(props.iconSearch);
        const systemStore = useSystemStore();
        const layout = computed(() => systemStore.layout);
        const sidebarOpen = computed(() => systemStore.sidebarOpen);
        const { t } = useI18n()

        const toggleSidebar = (value: boolean) => {
            systemStore.setSidebarOpen(value);
        }
        return {
            layout,
            sidebarOpen,
            toggleSidebar,
            t,
            iconSearch
        }
    }
})
</script>