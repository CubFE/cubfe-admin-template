<!-- 交流QQ群:七五四五7三七7八 -->
<template>
    <div>
        <!-- {{ currentItem }} -->
        <router-link v-if="!currentItem.children" :to="currentItem.path"
            class="group flex gap-x-3 rounded-md p-2 text-sm leading-6 text-stone-500 items-center hover:text-white hover:bg-primary dark:text-slate-400 dark:hover:text-white dark:hover:bg-primary">
            <component v-if="currentItem.meta.icon" :is="currentItem.meta.icon" class="h-5 w-5 shrink-0 " aria-hidden="true" />
            <span v-else class="w-5 h-5 shrink-0"></span>
            {{ item.meta.localeKey?t(item.meta.localeKey): item.meta.pageTitle }}
        </router-link>
        <Disclosure as="div" v-else v-slot="{ open }">
            <DisclosureButton class='flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-stone-500 bg-transparent outline-none hover:border-transparent focus:border-transparent focus-visible:border-transparent dark:text-slate-400 dark:hover:text-white dark:hover:bg-primary'>
                <component :is="currentItem.meta.icon" class="h-5 w-5 shrink-0" aria-hidden="true" />
                <!-- {{ currentItem.meta.pageTitle }} -->
                {{ item.meta.localeKey?t(item.meta.localeKey): item.meta.pageTitle }}
                <ChevronRightIcon :class="[open ? 'rotate-90 text-gray-500' : 'text-gray-400', 'ml-auto h-5 w-5 shrink-0']" aria-hidden="true" />
            </DisclosureButton>
            <DisclosurePanel as="ul" class="mt-1">
            <li v-for="subItem in currentItem.children" :key="subItem.name">
                <!-- 44px -->
                <DesktopSidebarItem :item="subItem" />
                <!-- <DisclosureButton as="a" :href="subItem.href" :class="[subItem.current ? 'bg-gray-50' : 'hover:bg-gray-50', 'block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700']">{{ subItem.name }}</DisclosureButton> -->
            </li>
            </DisclosurePanel>
        </Disclosure>
    </div>
  </template>
  
  <script lang="ts" name="DesktopSidebarItem">
  import { ref, defineComponent, watch } from "vue";
  import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
  import { ChevronRightIcon } from '@heroicons/vue/20/solid'
  import { useI18n } from 'vue-i18n'
  export default defineComponent({
    props: {
        item: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    components: {
        Disclosure,
        DisclosureButton,
        DisclosurePanel,
        ChevronRightIcon
    },
    setup(props, {emit}) {
        const currentItem = ref(props.item);
        const { t } = useI18n()
        watch(
            () => props.item,
            (newVal: boolean) => {
                currentItem.value = newVal;
            },
            { immediate: true }
        );
        return{
            t,
            currentItem,
            Disclosure,
            DisclosureButton,
            DisclosurePanel,
            ChevronRightIcon
        }
    }
})
</script>