<template>
    <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
    <transition :enter-active-class="enterActiveClass(position)">
        <div v-if="visible" class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 z-50">
            <span class="items-start item-end"></span>
            <div class="flex w-full flex-col items-center space-y-4 h-full" 
                :class="{
                    'sm:items-end': position=='top-right',
                    'sm:items-start': position=='top-left',
                    'sm:items-center': position=='top-center',
                    'sm:items-end sm:justify-end':  position=='bottom-right',
                    'sm:items-start sm:justify-end':  position=='bottom-left',
                    'sm:items-center sm:justify-end':  position=='bottom-center',
                }">
                <div
                    class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                    <div class="p-4">
                        <div class="flex items-start">
                            <div class="flex-shrink-0">
                                <CheckCircleIcon class="h-6 w-6 text-green-400" />
                            </div>
                            <div class="ml-3 w-0 flex-1 pt-0.5">
                                <p class="text-sm font-medium text-gray-900" v-if="title">{{ title }}</p>
                                <p class="mt-1 text-sm text-gray-500" v-if="message">{{ message }}</p>
                            </div>
                            <div class="ml-4 flex flex-shrink-0" v-if="showCloseButton">
                                <button type="button" @click="close"
                                    class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                    <span class="sr-only">Close</span>
                                    <XMarkIcon class="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script lang="ts">
import { defineComponent, ref, watch, onUnmounted } from 'vue';
import { CheckCircleIcon } from '@heroicons/vue/24/outline'
import { XMarkIcon } from '@heroicons/vue/20/solid'

export default defineComponent({
    name: 'MessageBox',
    components: {
        CheckCircleIcon,
        XMarkIcon
    },
    props: {
        title: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        visible: {
            type: Boolean,
            required: true
        },
        showCloseButton: {
            type: Boolean,
            default: true
        },
        durction: {
            type: Number,
            default: 5000
        },
        position: {
            type: String,
            default: 'top-center'
        }
    },
    emits: ['close', 'confirm'],
    setup(props, { emit }) {
        const visible = ref(props.visible);
        let timer: ReturnType<typeof setTimeout>;
        const startTimer = () => {
            timer = setTimeout(() => {
                close();
            }, props.durction);
        };

        const clearTimer = () => {
            clearTimeout(timer);
        };

        watch(
            () => props.visible,
            (newVal: boolean) => {
                visible.value = newVal;
                if (newVal) {
                    startTimer();
                } else {
                    clearTimer();
                }
            },
            { immediate: true }
        );
        const enterActiveClass = (position: string) => {
            if(position=='top-right' || position=='bottom-right'){
                return 'animate-slide-in-right'
            } else if (position=='top-left' || position=='bottom-left') {
                return 'animate-slide-in-left'
            } else if (position == 'top-center' ) {
                return 'animate-slide-in-top'
            } else if (position == 'bottom-center') {
                return 'animate-slide-in-bottom'
            }
        };
        const leaveActiveClass = (position: string) => {
            if(position=='top-right' || position=='bottom-right'){
                return 'animate-slide-out-right'
            } else if (position=='top-left' || position=='bottom-left') {
                return 'animate-slide-out-left'
            } else if (position == 'top-center' ) {
                return 'animate-slide-in-top'
            } else if (position == 'bottom-center') {
                return 'animate-slide-out-bottom'
            }
        };
        const close = () => {
            visible.value = false;
            emit('close');
        };

        const confirm = () => {
            visible.value = false;
            emit('confirm');
        };
        onUnmounted(() => {
            clearTimer();
        });
        return {
            visible,
            enterActiveClass,
            leaveActiveClass,
            close,
            confirm
        };
    }
});
</script>

