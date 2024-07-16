<template>
    <div>
        <div  class="p-2 rounded-full cursor-pointer text-gray-400 dark:hover:bg-dark-sidebar hover:bg-gray-100" @click="isOpen=true">
            <span class="sr-only">{{  t('settings.title') }}</span>
            <Cog6ToothIcon class="h-6 w-6" aria-hidden="true" />
        </div>
        <TransitionRoot as="template" :show="isOpen">
            <Dialog as="div" class="relative shadow-sm z-10" @close="isOpen = false">
            <div class="fixed inset-0" />

            <div class="fixed inset-0 overflow-hidde">
                <div class="absolute inset-0 overflow-hidden">
                <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 pt-16 sm:pl-16">
                    <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
                    <DialogPanel class="pointer-events-auto w-screen max-w-md ">
                        <div class="flex h-full flex-col overflow-y-scroll bg-white dark:bg-dark-sidebar shadow-xl">
                            <div class="px-6 py-4 border-b dark:border-b-dark">
                                <div class="flex items-center justify-between">
                                    <DialogTitle class="text-lg font-semibold leading-6 text-gray-900 dark:text-white">{{  t('settings.title') }}</DialogTitle>
                                    <div class="ml-3 flex h-7 items-center">
                                        <div class="rounded-full cursor-pointer text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500" @click="isOpen = false">
                                            <span class="sr-only">Close panel</span>
                                            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="p-6">
                                <div class="py-2">
                                    <div class="text-base font-semibold leading-6 text-gray-900 dark:text-white">{{  t('settings.layout') }}</div>
                                </div>
                                <div class="grid grid-cols-2 gap-2">
                                    <!-- <div 
                                        class="text-center hover:bg-stone-100 dark:hover:bg-dark p-2 rounded-md cursor-pointer border-2"
                                        :class="[layout=='sideblock'?'bg-stone-100 dark:bg-dark border-primary':'border-transparent']"
                                        @click="toggleLayout('sideblock')">
                                        <img :src="getAssetPath(`images/layouts/sideblock-${theme}.svg`)"/>
                                        <span class="text-sm font-normal text-slate-400">Sideblock</span>
                                    </div> -->
                                    <div
                                        class="text-center hover:bg-stone-100 dark:hover:bg-dark p-2 rounded-md cursor-pointer border-2"
                                        :class="[layout=='sidebar'?'bg-stone-100 dark:bg-dark border-primary':'border-transparent']" 
                                        @click="toggleLayout('sidebar')">
                                        <img :src="getAssetPath(`images/layouts/sidebar-${theme}.svg`)"/>
                                        <span class="text-sm font-normal text-slate-400">Sidebar</span>
                                    </div>
                                    <div
                                        class="text-center hover:bg-stone-100 dark:hover:bg-dark p-2 rounded-md cursor-pointer border-2" 
                                        :class="[layout=='navbar'?'bg-stone-100 dark:bg-dark border-primary':'border-transparent']"
                                        @click="toggleLayout('navbar')">
                                        <img :src="getAssetPath(`images/layouts/navbar-${theme}.svg`)" />
                                        <span class="text-sm font-normal text-slate-400">NavBar</span>
                                    </div>
                                </div>
                                <div class="mt-6 py-2">
                                    <div class="text-base font-semibold leading-6 text-gray-900 dark:text-white">{{  t('settings.theme') }}</div>
                                </div>
                                <div class="grid grid-cols-3 gap-2">
                                    <div class="bg-stone-100 p-4 rounded-md cursor-pointer text-center text-sm text-slate-400 border-2 font-semibold dark:bg-dark"
                                    :class="[theme=='light'?'bg-stone-100 border-primary':'border-transparent']" 
                                    @click="toggleTheme('light')">Light</div>
                                    <div class="bg-stone-100 p-4 rounded-md cursor-pointer text-center text-sm text-slate-400 border-2 font-semibold dark:bg-dark"
                                    :class="[theme=='dark'?'bg-stone-100 border-primary':'border-transparent']" 
                                    @click="toggleTheme('dark')">Dark</div>
                                </div>
                                <div class="mt-6 py-2">
                                    <div class="text-base font-semibold leading-6 text-gray-900 dark:text-white">{{  t('settings.width-mode') }}</div>
                                </div>
                                <div class="grid grid-cols-3 gap-2">
                                    <div class="bg-stone-100 p-4 rounded-md cursor-pointer text-center text-sm text-slate-400 border-2 font-semibold dark:bg-dark"
                                    :class="[widthMode=='fluid'?'bg-stone-100 border-primary':'border-transparent']" 
                                    @click="toggleWidthMode('fluid')">Fluid</div>
                                    <div class="bg-stone-100 p-4 rounded-md cursor-pointer text-center text-sm text-slate-400 border-2 font-semibold dark:bg-dark"
                                    :class="[widthMode=='boxed'?'bg-stone-100 border-primary':'border-transparent']" 
                                    @click="toggleWidthMode('boxed')">Boxed</div>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                    </TransitionChild>
                </div>
                </div>
            </div>
            </Dialog>
        </TransitionRoot>
    </div>
</template>
<script lang="ts">
import { ref, defineComponent, computed } from "vue";
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue'
import {
    Cog6ToothIcon,
    WindowIcon,
    XMarkIcon,
    Squares2X2Icon,
    SunIcon,
    MoonIcon,
} from '@heroicons/vue/24/outline'
import { useI18n } from "vue-i18n";
import { getAssetPath } from "@/core/helpers/assets";
import { useThemeStore } from "@/stores/theme";
import { useSystemStore } from "@/stores/sys";
export default defineComponent({
    name: "NotificationsMenu",
    components: {
        XMarkIcon,
        Squares2X2Icon,
        WindowIcon,
        SunIcon,
        MoonIcon,
        Dialog,
        DialogPanel,
        DialogTitle,
        Menu,
        MenuButton,
        MenuItem,
        MenuItems,
        TransitionChild,
        TransitionRoot,
        Cog6ToothIcon
    },
    setup(props, {emit}) {
        const isOpen = ref(false)
        const { t } = useI18n()
        const themeStore = useThemeStore()
        const theme = computed(() => themeStore.theme);
        const systemStore = useSystemStore()
        const layout = computed(() => systemStore.layout)
        const widthMode = computed(() => systemStore.widthMode)

        const toggleTheme = (value: string) => {
            themeStore.setTheme(value)
        }
        const toggleLayout = (value: string) => {
            systemStore.setLayout(value)
        }
        const toggleWidthMode = (value: string) => {
            systemStore.setWidthMode(value)
        }

        return{
            getAssetPath,
            isOpen,
            t,
            theme,
            layout,
            widthMode,
            toggleTheme,
            toggleLayout,
            toggleWidthMode,
        }
    }
})
</script>