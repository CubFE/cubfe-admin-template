<template>
    <div  class="p-2 rounded-full cursor-pointer text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-sidebar" @click="toggleTheme">
        <span class="sr-only">View notifications</span>
        <SunIcon v-show="theme=='light'" class="h-6 w-6" aria-hidden="true" />
        <MoonIcon v-show="theme=='dark'" class="h-6 w-6" aria-hidden="true" />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import {
    SunIcon,
    MoonIcon,
} from '@heroicons/vue/24/outline';
import { useThemeStore } from "../../../stores/theme";
export default defineComponent({
    name: "NotificationsMenu",
    components: {
        SunIcon,
        MoonIcon,
    },
    setup(props, {emit}) {
        const themeStore = useThemeStore()
        const theme = computed(() => themeStore.theme);
        
        const toggleTheme = () => {
            const newTheme = theme.value === 'light' ? 'dark' : 'light';
            themeStore.setTheme(newTheme);
        };
        return{
            theme,
            toggleTheme
        }
    }
})
</script>