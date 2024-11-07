<template>
    <div class="ring">
        <svg class="progress-bar" :class="{ 'dash-bar': isDashBar }" width="200" height="200" viewBox="0 0 120 120">
            <circle class="progress__meter" cx="60" cy="60" r="54" stroke-width="5" />
            <circle v-if="!isDashBar" class="progress__value" cx="60" cy="60" r="54" stroke-width="5" :style="{
                strokeDashoffset: dashoffset,
                strokeDasharray: circumference,
                stroke: colorProgress
            }" />
            <circle v-else class="progress__value" cx="60" cy="60" r="54" stroke-width="5" :style="{
                strokeDashoffset: dashoffset,
                strokeDasharray: circumference,
                stroke: colorProgressDash
            }" />
        </svg>
        <div v-if="!isDashBar">
            <span class="icon" :class="{ iconHidden: !(valNum <= 25) }"> {{ `${valNum}%` }} </span>
            <span class="icon" :class="{ iconHidden: !(valNum > 25 && valNum <= 50) }">&#10060;</span>
            <svg class="icon" :class="{ iconHidden: !(valNum > 50 && valNum <= 65) }" width="8mm" height="8mm"
                viewBox="0 0 2987.79 2987.79">
                <circle fill='#E7A23D' cx="1493.89" cy="1493.89" r="1493.89" />
                <path fill='#FEFEFE'
                    d="M1575.99 1903.23l-161.88 0 -43.94 -1255.75 249.76 0 -43.94 1255.75zm-80.94 437.07c-43.55,0 -80.17,-14.25 -109.08,-42.78 -28.9,-28.52 -43.55,-64.76 -43.55,-108.31 0,-42.79 14.65,-78.63 43.55,-107.92 28.91,-29.3 65.53,-43.94 109.08,-43.94 42.01,0 77.85,14.64 106.76,43.94 28.9,29.29 43.55,65.13 43.55,107.92 0,42.4 -14.65,77.85 -43.55,107.15 -28.91,29.29 -64.76,43.93 -106.76,43.93z" />
            </svg>
            <svg class="icon" v-show="valNum > 65 && valNum <= 100" width="30" viewBox="0 0 512.008 512.008">
                <path path
                    d="M502.795,60.572c-11.183-9.782-28.214-8.677-38.023,2.533L177.837,391.028L46.603,251.036 c-10.186-10.833-27.217-11.372-38.077-1.213c-10.86,10.159-11.426,27.244-1.24,38.104l151.579,161.684 c5.12,5.416,12.207,8.488,19.672,8.488h0.458c7.626-0.108,14.794-3.449,19.833-9.189L505.355,98.595 C515.137,87.385,514.005,70.381,502.795,60.572z"
                    fill="rgb(27, 177, 37)"> </path>
            </svg>
        </div>
        <span v-else class="icon"> {{ `${valNum}%` }} </span>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps({
    valNum: {
        type: Number,
        required: true,
        default: 0
    },
    isDashBar: {
        type: Boolean,
        required: true,
        default: false
    }
})

const colorMap: { [key: number]: string } = {
    0: 'rgb(27, 99, 192)',
    25: 'rgb(27, 99, 192)',
    50: 'red',
    65: 'rgb(231, 162, 61)',
    100: 'green'
}

const colorMapDash: { [key: number]: string } = {
    0: 'red',
    60: 'red',
    61: 'rgb(27, 99, 192)',
    100: 'rgb(27, 99, 192)'
}

const circumference = ref(2 * Math.PI * 54)

const progress = computed(() => props.valNum / 100)

const dashoffset = computed(() => circumference.value * (1 - progress.value))

const colorProgress = computed(() => {
    for (let threshold in colorMap) {
        if (props.valNum as number <= parseInt(threshold)) {
            return colorMap[parseInt(threshold)];
        }
    }
})

const colorProgressDash = computed(() => {
    for (let threshold in colorMapDash) {
        if (props.valNum as number <= parseInt(threshold)) {
            return colorMapDash[parseInt(threshold)];
        }
    }
})
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Comfortaa");

svg * {
    transition: all 1s;
}

.ring {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    position: relative;
}

.icon {
    font-size: 25px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #8d8c8c;
    font-family: "Comfortaa";
    opacity: 1;
    transition: 1s
}

.iconHidden {
    opacity: 0;
    transition: 1s
}

.progress-bar {
    -webkit-transform: rotate(-90deg);
    transform: rotate(-90deg);
}

.dash-bar {
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
}

.progress__meter,
.progress__value {
    fill: none;
}

.progress__meter {
    stroke: #dadada;
}

.progress__value {
    stroke-linecap: round;
}
</style>