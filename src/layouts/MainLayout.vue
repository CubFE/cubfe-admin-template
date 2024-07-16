<template>
  <div  class="h-screen">
    <NavbarLayout v-if="layout === 'navbar'"></NavbarLayout>
    <SidebarLayout v-else-if="layout === 'sidebar'"></SidebarLayout>
    <SideblockLayout v-else ></SideblockLayout>
  </div>
</template>

<script setup lang="ts">
import { ref,computed } from 'vue'
import SidebarLayout from './types/SidebarLayout.vue'
import NavbarLayout from './types/NavbarLayout.vue'
import SideblockLayout from './types/SideblockLayout.vue'
import { useSystemStore } from "@/stores/sys";
const systemStore = useSystemStore()
const layout = computed(() => systemStore.layout)
</script>