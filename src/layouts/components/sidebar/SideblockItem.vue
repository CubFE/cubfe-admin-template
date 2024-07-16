<template>
    <div>
      <router-link
        v-if="!currentItem.children"
        :to="currentItem.path"
        class="group flex gap-x-3 rounded-md p-2 text-sm leading-6 text-white items-center hover:text-white hover:bg-primary dark:text-slate-400 dark:hover:text-white dark:hover:bg-primary"
      >
        <component
          v-if="currentItem.meta.icon"
          :is="currentItem.meta.icon"
          class="h-5 w-5 shrink-0"
          aria-hidden="true"
        />
        <span v-else class="w-5 h-5 shrink-0"></span>
        {{ item.meta.localeKey ? t(item.meta.localeKey) : item.meta.pageTitle }}
      </router-link>
      <Disclosure as="div" v-else :default-open="isOpen">
        <DisclosureButton
          @click="toggleItem"
          class="flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-white bg-transparent outline-none hover:border-transparent focus:border-transparent focus-visible:border-transparent dark:text-slate-400 dark:hover:text-white dark:hover:bg-primary"
        >
          <component
            :is="currentItem.meta.icon"
            class="h-5 w-5 shrink-0"
            aria-hidden="true"
          />
          {{ item.meta.localeKey ? t(item.meta.localeKey) : item.meta.pageTitle }}
          <ChevronRightIcon
            :class="[isOpen ? 'rotate-90 text-gray-500' : 'text-gray-400', 'ml-auto h-5 w-5 shrink-0']"
            aria-hidden="true"
          />
        </DisclosureButton>
        <DisclosurePanel as="ul" class="mt-1 ml-6">
          <li v-for="subItem in currentItem.children" :key="subItem.name">
            <SideblockItem :item="subItem" />
          </li>
        </DisclosurePanel>
      </Disclosure>
    </div>
  </template>
  
  <script lang="ts">
  import { ref, defineComponent, watch } from "vue";
  import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
  import { ChevronRightIcon } from "@heroicons/vue/20/solid";
  import { useI18n } from "vue-i18n";
  
  export default defineComponent({
    props: {
      item: {
        type: Object,
        default: () => ({}),
      },
      index: {
        type: Number,
        required: true,
      },
      activeIndex: {
        type: Number,
        required: true,
      },
    },
    components: {
      Disclosure,
      DisclosureButton,
      DisclosurePanel,
      ChevronRightIcon,
    },
    setup(props, { emit }) {
      const currentItem = ref(props.item);
      const { t } = useI18n();
  
      const isOpen = ref(props.index === props.activeIndex);
  
      const toggleItem = () => {
        emit('update:activeIndex', props.index === props.activeIndex ? null : props.index);
      };
  
      watch(
        () => props.activeIndex,
        (newVal) => {
          isOpen.value = newVal === props.index;
        }
      );
  
      watch(
        () => props.item,
        (newVal) => {
          currentItem.value = newVal;
        },
        { immediate: true }
      );
  
      return {
        t,
        currentItem,
        isOpen,
        toggleItem,
      };
    },
  });
  </script>
  