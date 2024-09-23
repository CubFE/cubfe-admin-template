<template>
    <div>
        <div class="rounded-lg overflow-hidden bg-white mb-6 dark:bg-dark">
            <div>
                <div class="relative">
                    <img class="h-32 w-full object-cover lg:h-36" :src="profile.backgroundImage" alt="" />
                </div>
            </div>
            <div class="relative mx-auto px-4 sm:px-6 2xl:px-24 mb-8">
                <div class="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                    <div class="flex">
                        <img class="h-32 w-32 rounded-full ring-4 ring-white sm:h-32 sm:w-32" :src="profile.avatar"
                            alt="" />
                    </div>
                    <div class="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                        <div class="mt-6 min-w-0 flex-1 sm:hidden md:block">
                            <span class="truncate text-2xl font-bold text-gray-900 dark:text-gray-100 ">{{ profile.name }}</span>
                            <span class="truncate text-sm  text-gray-900 dark:text-gray-400 ml-4">Department: {{ profile.department }}</span>
                            <span class="truncate text-sm  text-gray-900 dark:text-gray-400 ml-4">Job Position: {{ profile.jobPosition }}</span>
                        </div>
                        <div class="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
                            <button type="button"
                                class="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:border-primary dark:bg-dark dark:ring-gray-600 dark:text-gray-400">
                                <EyeIcon class="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                <span>View Profile</span>
                            </button>
                            <button type="button"
                                class="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:border-primary dark:bg-dark dark:ring-gray-600 dark:text-gray-400">
                                <PencilSquareIcon class="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                <span>Edit Infomation</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
                    <h1 class="truncate text-2xl font-bold text-gray-900">{{ profile.name }}</h1>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-3 gap-6">
            <div class="col-span-2">
                <div class="grid grid-cols-3 gap-6">
                    <div class="bg-white shadow-sm rounded-lg p-4 dark:bg-dark text-center py-8 relative">
                        <h3 class="text-4xl font-medium mb-2 text-gray-600 dark:text-gray-200">12<span class="text-sm"> days</span></h3>
                        <p class="text-gray-400 dark:text-gray-600">Remaining vacation days</p>
                        <div class="absolute top-4 left-4 p-1 rounded-full bg-lime-200">
                            <CalendarDaysIcon class="w-5 h-5 stroke-lime-600" />
                        </div>
                    </div>
                    <div class="bg-white shadow-sm rounded-lg p-4 dark:bg-dark text-center py-8 relative">
                        <h3 class="text-4xl font-medium mb-2 text-gray-600 dark:text-gray-200">3<span class="text-sm"> days</span></h3>
                        <p class="text-gray-400 dark:text-gray-600">Total leave days taken</p>
                        <div class="absolute top-4 left-4 p-1 rounded-full bg-blue-200">
                            <FunnelIcon class="w-5 h-5 stroke-blue-600" />
                        </div>
                    </div>
                    <div class="bg-white shadow-sm rounded-lg p-4 dark:bg-dark text-center py-8">
                        <h3 class="text-4xl font-medium mb-2">3<span class="text-sm"> days</span></h3>
                        <p class="text-gray-600">Total leave days taken</p>
                    </div>
                    <div class="col-span-3 bg-white shadow-sm rounded-lg dark:bg-dark text-center overflow-hidden">
                        <div class="border-b border-gray-200 px-4 py-5 sm:px-6 dark:border-dark-sidebar">
                            <div class="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                                <div class="ml-4 mt-2">
                                    <h3 class="text-base font-semibold leading-6 ">Todo List</h3>
                                </div>
                                <div class="ml-4 mt-2 flex-shrink-0">
                                    <EllipsisHorizontalIcon class="w-6 h-6" />
                                </div>
                            </div>
                        </div>
                        <div class="p-4 lg:p-8">
                            <h3 class="text-4xl font-medium mb-2">3<span class="text-sm"> days</span></h3>
                            <p class="text-gray-600">Total leave days taken</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="grid gap-6">
                <div class="bg-white shadow-sm rounded-lg p-4 dark:bg-dark">
                    <h3 class="text-lg font-medium mb-2">Notices</h3>
                    <p class="text-gray-600">Description</p>
                </div>
                <div class="bg-white shadow-sm rounded-lg p-4 dark:bg-dark">
                    <h3 class="text-lg font-medium mb-2">Title</h3>
                    <p class="text-gray-600">Description</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { getAssetPath } from '@/core/helpers/assets';
import { 
    ArrowTrendingUpIcon, 
    CurrencyDollarIcon, 
    EyeIcon, 
    PencilSquareIcon, 
    EllipsisVerticalIcon, 
    EllipsisHorizontalIcon,
    CalendarDaysIcon,
    FunnelIcon
} from '@heroicons/vue/24/outline'
export default defineComponent({
    name: 'Dashboard',
    components: {
        ArrowTrendingUpIcon,
        CurrencyDollarIcon,
        EyeIcon,
        PencilSquareIcon,
        EllipsisHorizontalIcon,
        EllipsisVerticalIcon,
        CalendarDaysIcon,
        FunnelIcon
    },
    setup() {
        const profile = {
            name: 'Gavin Wang',
            email: 'ricardo.cooper@example.com',
            phone: '(555) 123-4567',
            department: 'Technology Center',
            jobPosition: 'Senior FE Architect',
            avatar:
                getAssetPath('images/avatars/101.png'),
            backgroundImage:
                getAssetPath('images/backgrounds/profile-bg.png'),
            fields: [
                ['Phone', '(555) 123-4567'],
                ['Email', 'ricardocooper@example.com'],
                ['Title', 'Senior Front-End Developer'],
                ['Team', 'Product Development'],
                ['Location', 'San Francisco'],
                ['Sits', 'Oasis, 4th floor'],
                ['Salary', '$145,000'],
                ['Birthday', 'June 8, 1990'],
            ],
        }
        return {
            profile
        }
    }
})
</script>
