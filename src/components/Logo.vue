<template>
    <svg
    id="OBJECTS"
    version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 120 120"
        style="enable-background: new 0 0 120 120"
        xml:space="preserve"
        :class="{'light': theme=='light', 'dark': theme=='dark'}"
        :style="'height:'+height"
        >
        <g :class="['is-roll']">
            <g>
                <path
                class="right"
                d="M 83.811 103.978 L 110 88.934 L 110 31.645 L 60.134 3 L 60.134 27.73 L 88.474 44.01 L 88.474 76.57 L 69.279 87.596 L 83.811 87.596 L 83.811 103.978 Z"
                fill="#0957F3"
                ></path>
                <path
                class="left"
                d="M 81.49 105.304 L 110 88.934 L 110 64.305 L 60.134 92.287 L 81.49 105.304 Z"
                ></path>
                <path
                class="right"
                d="M 59.866 102.33 L 59.866 45.041 L 10 16.396 L 10 41.126 L 38.34 57.406 L 38.34 89.965 L 19.145 100.992 L 33.677 100.992 L 33.677 117.374 L 59.866 102.33 Z"
                transform="matrix(-1, 0, 0, -1, 69.865997, 133.770004)"
                ></path>
                <path
                class="left"
                d="M 31.356 56.069 L 59.866 39.699 L 59.866 15.07 L 10 43.052 L 31.356 56.069 Z"
                transform="matrix(-1, 0, 0, -1, 69.865997, 71.139)"
                ></path>
            </g>
        </g>
  </svg>
</template>
<script setup>
import { ref, onMounted, defineProps} from 'vue';
const props = defineProps({
    theme: {
        type: String,
        default: 'light'
    },
    height: {
        type: String,
        default: '40px'
    }
})
</script>
<style lang="scss">
.light {
  .right {
    fill: #4474ff;
    animation: none;
  }

  .bottom {
    fill: #fff;
    animation: none;
  }

  .left {
    fill: #fff;
    animation: none;
  }
}

.dark {
  .right {
    fill: #4474ff;
    animation: none;
  }

  .bottom {
    fill: #fff;
    animation: none;
  }

  .left {
    fill: #fff;
    animation: none;
  }
}
</style>
