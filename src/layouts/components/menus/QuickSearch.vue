<template>
    <div>
        <div class="relative pointer-events-auto min-w-48" v-if="layout!=='navbar'">
            <button type="button" v-shortkey="{windows: ['ctrl', 'k'], mac: ['meta', 'k']}" @shortkey="()=>open = !open"
                class="hidden w-full lg:flex gap-x-2 items-center text-sm leading-6 text-slate-400 rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 hover:ring-slate-300 dark:bg-dark dark:highlight-white/5 dark:hover:dark-main-bg"
                @click="open = true">
                <span class="w-5 h-5">
                    <MagnifyingGlassIcon class="pointer-events-none absolute inset-y-0 left-3 h-full w-5 text-gray-400"
                        aria-hidden="true" />
                </span>
                <span style="vertical-align: inherit;">{{ t('placeholder-search') }}</span>
                <span class="ml-auto pl-3 flex-none text-xs font-semibold">
                    <span style="vertical-align: inherit;">⌘</span>
                    <span style="vertical-align: inherit;">K</span>
                </span>
            </button>
            <!-- <shortkey :key="['⌘', 'K']" @shortkey="()=>open = true" /> -->
        </div>
        <div v-else  
            class="p-2 rounded-full cursor-pointer text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-sidebar"
            v-shortkey="{windows: ['ctrl', 'k'], mac: ['meta', 'k']}" @shortkey="()=>open = !open"
            @click="open = !open">
            <MagnifyingGlassIcon class="h-6 w-6" aria-hidden="true" />
        </div>
        <TransitionRoot :show="open" as="template" @after-leave="rawQuery = ''" appear>
            <Dialog as="div" class="relative z-10" @close="open = false">
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0"
                    enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                    <div class="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
                </TransitionChild>

                <div class="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
                    <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="ease-in duration-200" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all dark:divide-dark-sidebar dark:bg-dark">
                            <Combobox @update:modelValue="onSelect">
                                <div class="relative">
                                    <MagnifyingGlassIcon
                                        class="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                                        aria-hidden="true" />
                                    <ComboboxInput
                                        class="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm dark:text-gray-400"
                                        :placeholder="t('placeholder-search')" @change="rawQuery = $event.target.value" />
                                    <div class="rounded-md p-1 absolute right-4 top-3 text-xs dark:bg-dark-sidebar dark:text-gray-100 cursor-pointer" @click="open=false">ESC</div>
                                </div>

                                <ComboboxOptions v-if="filteredProjects.length > 0 || filteredUsers.length > 0" static
                                    class="max-h-80 scroll-py-10 scroll-pb-2 space-y-4 overflow-y-auto p-4 pb-2">
                                    <li v-if="filteredProjects.length > 0">
                                        <h2 class="text-xs font-semibold text-gray-900 dark:text-gray-100">{{t('search.result.project')}}</h2>
                                        <ul class="-mx-4 mt-2 text-sm text-gray-700">
                                            <ComboboxOption v-for="project in filteredProjects" :key="project.id"
                                                :value="project" as="template" v-slot="{ active }">
                                                <li
                                                    :class="['flex cursor-default select-none items-center px-4 py-2', active && 'bg-primary text-white']">
                                                    <FolderIcon
                                                        :class="['h-6 w-6 flex-none', active ? 'text-white' : 'text-gray-400']"
                                                        aria-hidden="true" />
                                                    <span class="ml-3 flex-auto truncate dark:text-gray-400">{{ project.name }}</span>
                                                </li>
                                            </ComboboxOption>
                                        </ul>
                                    </li>
                                    <li v-if="filteredUsers.length > 0">
                                        <h2 class="text-xs font-semibold text-gray-900 dark:text-gray-100">{{t('search.result.user')}}</h2>
                                        <ul class="-mx-4 mt-2 text-sm text-gray-700">
                                            <ComboboxOption v-for="user in filteredUsers" :key="user.id" :value="user"
                                                as="template" v-slot="{ active }">
                                                <li
                                                    :class="['flex cursor-default select-none items-center px-4 py-2', active && 'bg-primary text-white']">
                                                    <img :src="user.imageUrl" alt=""
                                                        class="h-6 w-6 flex-none rounded-full" />
                                                    <span class="ml-3 flex-auto truncate dark:text-gray-400">{{ user.name }}</span>
                                                </li>
                                            </ComboboxOption>
                                        </ul>
                                    </li>
                                </ComboboxOptions>

                                <div v-if="rawQuery === '?'" class="px-6 py-14 text-center text-sm sm:px-14">
                                    <LifebuoyIcon class="mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
                                    <p class="mt-4 font-semibold text-gray-900 dark:text-gray-100">{{ t('search.result.help') }}</p>
                                    <p class="mt-2 text-gray-500 dark:text-gray-400">{{ t('search.result.help.desc') }}</p>
                                </div>

                                <div v-if="query !== '' && rawQuery !== '?' && filteredProjects.length === 0 && filteredUsers.length === 0"
                                    class="px-6 py-14 text-center text-sm sm:px-14">
                                    <ExclamationTriangleIcon class="mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
                                    <p class="mt-4 font-semibold text-gray-900 dark:text-gray-100">{{ t('search.result.empty') }}</p>
                                    <p class="mt-2 text-gray-500">{{ t('search.result.empty.desc') }}</p>
                                </div>

                                <div class="flex flex-wrap items-center bg-gray-50 px-4 py-2.5 text-xs text-gray-700 dark:bg-dark">
                                    <span class="dark:text-gray-100">{{ t('searchtype') }}</span>
                                    <kbd
                                        :class="['mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2 dark:bg-dark-sidebar dark:text-white', rawQuery.startsWith('#') ? 'border-primary bg-primary dark:bg-primary' : 'border-gray-400 text-gray-900']">#</kbd>
                                        <span class="dark:text-gray-100">{{ t('searchtype.project') }}</span>
                                    <kbd
                                        :class="['mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2 dark:bg-dark-sidebar dark:text-white', rawQuery.startsWith('>') ? 'border-primary bg-primary dark:bg-primary' : 'border-gray-400 text-gray-900']">&gt;</kbd>
                                        <span class="dark:text-gray-100">{{ t('searchtype.user') }}</span>
                                    <kbd
                                        :class="['mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2 dark:bg-dark-sidebar dark:text-white', rawQuery === '?' ? 'border-primary bg-primary dark:bg-primary' : 'border-gray-400 text-gray-900']">?</kbd>
                                        <span class="dark:text-gray-100">{{ t('searchtype.help') }}</span>
                                </div>
                            </Combobox>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </TransitionRoot>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import { ExclamationTriangleIcon, FolderIcon, LifebuoyIcon } from '@heroicons/vue/24/outline'
import { useI18n } from 'vue-i18n';
import { useSystemStore } from '@/stores/sys';

const { t } = useI18n()
import {
    Combobox,
    ComboboxInput,
    ComboboxOptions,
    ComboboxOption,
    Dialog,
    DialogPanel,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue'


const systemStore = useSystemStore();
const layout = computed(() => systemStore.layout);
const projects = [
    { id: 1, name: 'Workflow Inc. / Website Redesign', category: t('searchtype.project'), url: '#' },
    // More projects...
]

const users = [
    {
        id: 1,
        name: 'Leslie Alexander',
        url: '#',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    // More users...
]

const open = ref(false)
const rawQuery = ref('')
const query = computed(() => rawQuery.value.toLowerCase().replace(/^[#>]/, ''))
const filteredProjects = computed(() =>
    rawQuery.value === '#'
        ? projects
        : query.value === '' || rawQuery.value.startsWith('>')
            ? []
            : projects.filter((project) => project.name.toLowerCase().includes(query.value))
)
const filteredUsers = computed(() =>
    rawQuery.value === '>'
        ? users
        : query.value === '' || rawQuery.value.startsWith('#')
            ? []
            : users.filter((user) => user.name.toLowerCase().includes(query.value))
)

function onSelect(item) {
    window.location = item.url
}
</script>
<!-- 交流QQ群:七五四5七3七7八 -->