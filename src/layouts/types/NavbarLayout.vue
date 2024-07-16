<template>
    <div class="w-full h-full">
        <Header class="fixed top-0 left-0 right-0"/>
        <main class="h-full pt-16">
            <div class="px-10 py-10 h-full bg-stone-100 dark:bg-dark-main-bg text-slate-400 lg:py-10 ">
                <!-- Main area -->
                <div :class="[widthMode == 'fluid' ? `w-full` : 'max-w-7xl mx-auto']">
                    <!-- Main area -->
                    <router-view></router-view>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import Header from '../components/header/Header.vue'
import { useSystemStore } from '@/stores/sys';

const systemStore = useSystemStore();
const widthMode = computed(() => systemStore.widthMode);
</script>