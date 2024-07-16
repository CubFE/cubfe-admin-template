<template>
    <div  class="p-2 rounded-full cursor-pointer  hover:text-primary hover:bg-gray-100 border-none dark:hover:bg-dark-sidebar">
        <Menu as="div" class="relative text-left">
            <MenuButton class="flex items-center rounded-full p-0  bg-transparent">
                <span class="sr-only">Open options</span>
                <img class="w-6 h-6" :src="getLanguageImage(language)"/>
            </MenuButton>
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg dark:bg-dark-sidebar">
                    <div class="py-1">
                        <MenuItem v-slot="{ active }" v-for="languageItem in languageData" :key="languageItem.name">
                            <div class="py-2 px-4 flex gap-x-2 items-center cursor-pointer text-stone-500 hover:bg-gray-50 dark:text-stone-200 dark:hover:bg-dark"  @click="setLanguage(languageItem.id)">
                                <img class="w-6 h-6" :src="getLanguageImage(languageItem.id)"/>
                                <span class="text-sm">{{ languageItem.title }}</span>
                            </div>
                        </MenuItem>
                    </div>
                </MenuItems>
            </transition>
        </Menu>
    </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from "vue";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import {
    LanguageIcon
} from '@heroicons/vue/24/outline';
import { useSystemStore } from "../../../stores/sys";
import { getAssetPath } from "@/core/helpers/assets";
import { useI18n } from 'vue-i18n'

export default defineComponent({
    name: "NotificationsMenu",
    components: {
        LanguageIcon,
        Menu,
        MenuButton,
        MenuItem,
        MenuItems,
    },
    setup(props, {emit}) {
        const systemStore = useSystemStore()
        const language = computed(() => systemStore.language);
        const languageData = ref([
            {
                id:"en",
                name: 'english',
                title: 'English',
                image: 'united-states-of-america.svg'
            },
            // {
            //     id:"de",
            //     name: 'germany',
            //     title: 'Germany',
            //     image: 'germany.svg'
            // },
            // {
            //     id:"fr",
            //     name: 'france',
            //     title: 'France',
            //     image: 'france.svg'
            // },
            // {
            //     id:"zh-CN",
            //     name: 'china',
            //     title: '简体中文',
            //     image: 'china.svg'
            // },
        ])
        const getLanguageImage = (language: string) => {
            const languageItem = languageData.value.find((item: any) => item.id === language)
            return getAssetPath(`images/languages/${languageItem?languageItem.image?languageItem.image:'united-states-of-america.svg':'united-states-of-america.svg'}`)
        }
        const setLanguage = (language: string) => {
            systemStore.setLanguage(language)
        }
        return{
            language,
            languageData,
            getLanguageImage,
            setLanguage
        }
    }
})
</script>