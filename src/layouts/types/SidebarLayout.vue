<template>
    <div>
        <DesktopSidebar @change-nav-item="changeNavItem" />
        <div class="lg:pl-20 fixed top-0  w-full h-full">
            <div :class="['xl:pl-60 md:pl-0','md:px-4 sm:px-6 lg:px-8']"
                class="sticky top-0 flex h-16 shrink-0 items-center gap-x-4 sm:gap-x-6 border-b border-gray-200 bg-white shadow-sm  dark:bg-dark-sidebar dark:border-b-dark dark:text-white">
                
                <nav-bar />

            </div>
            <!-- :class="[widthMode == 'fluid' ? `w-full lg:px-10` : (noBoxedLyout.includes(layout)?'max-w-1200px mx-auto lg:px-10':'lg:px-60')]"> -->
            <main :class="deskTopSidebarOpen ? `xl:pl-60` : ''" class="h-full overflow-y-scroll">
                <div class="h-full bg-stone-100 dark:bg-dark-main-bg text-slate-400 lg:py-6 lg:px-6 sm:px-4 sm:py-4">
                    <!-- Main area -->
                    <div :class="[widthMode == 'fluid' ? `w-full` : 'max-w-7xl mx-auto']">
                        <span class="sm:text-red-500 md:text-blue-500 lg:text-green-500 xl:text-orange-500">{{ deskTopSidebarOpen ? 'Sidebar Open' : 'Sidebar Close'}}</span>
                        <router-view></router-view>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import NavBar from '../components/navbar/NavBar.vue'
import DesktopSidebar from '../components/sidebar/DesktopSidebar.vue';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs.vue';
import { useSystemStore } from '@/stores/sys';

const systemStore = useSystemStore();
const widthMode = computed(() => systemStore.widthMode);
const layout = computed(() => systemStore.layout);
const noBoxedLyout = ref([
    'sidebar','sideblock'
])
const deskTopSidebarOpen = ref(false)
const changeNavItem = (item: any) => {
    if (item && item.children.length > 0) {
        deskTopSidebarOpen.value = true
    } else[
        deskTopSidebarOpen.value = false
    ]
}

</script>