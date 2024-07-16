<template>
  <div class="h-full">
    <!-- Static sidebar for desktop -->
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col" :class="[sidebarOpen?'lg:w-60': 'w-20']">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <Sideblock />
    </div>

    <div class="fixed top-0 w-full h-full" :class="[sidebarOpen?'lg:pl-60': 'pl-20']">
      <div
        class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 dark:bg-dark-sidebar dark:border-b-dark dark:text-white">
        <NavBar />
      </div>

      <main class="h-full">
        <div class="px-10 py-10 h-full bg-stone-100 dark:bg-dark-main-bg text-slate-400 lg:py-10 ">
          <!-- Main area -->
          <div class="container" :class="[widthMode == 'fluid' ? `w-full` : 'max-w-7xl mx-auto']">
          <router-view></router-view>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Sideblock from '../components/sidebar/Sideblock.vue'
import NavBar from '../components/navbar/NavBar.vue'
import { useSystemStore } from '@/stores/sys'
const systemStore = useSystemStore();
const sidebarOpen = computed(() => systemStore.sidebarOpen);
const widthMode = computed(() => systemStore.widthMode);
</script>