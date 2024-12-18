<template>
    <div class="ring">
        <svg class="progress-bar" :class="{ 'dash-bar': isDashBar }"  width="200" height="200" viewBox="0 0 120 120">
            <circle class="progress__meter" cx="60" cy="60" r="54" stroke-width="5" />
            <circle class="progress__value" cx="60" cy="60" r="54" stroke-width="5" :style="{
                strokeDashoffset: dashoffset,
                strokeDasharray: circumference,
                stroke: colorProgress
            }" />
        </svg>
        <span class="icon" :class="{ iconHidden: !(conditionBarCurr === 'inProgress' && props.valNum < 1) }"> {{
    `${Math.round(valNum * 100)}%` }} </span>
        <span class="icon" :class="{ iconHidden: !(conditionBarCurr === 'error') }">&#10060;</span>
        <svg class="icon" :class="{ iconHidden: !(conditionBarCurr === 'warning') }" width="8mm" height="8mm"
            viewBox="0 0 2987.79 2987.79">
            <circle fill='#E7A23D' cx="1493.89" cy="1493.89" r="1493.89" />
            <path fill='#FEFEFE'
                d="M1575.99 1903.23l-161.88 0 -43.94 -1255.75 249.76 0 -43.94 1255.75zm-80.94 437.07c-43.55,0 -80.17,-14.25 -109.08,-42.78 -28.9,-28.52 -43.55,-64.76 -43.55,-108.31 0,-42.79 14.65,-78.63 43.55,-107.92 28.91,-29.3 65.53,-43.94 109.08,-43.94 42.01,0 77.85,14.64 106.76,43.94 28.9,29.29 43.55,65.13 43.55,107.92 0,42.4 -14.65,77.85 -43.55,107.15 -28.91,29.29 -64.76,43.93 -106.76,43.93z" />
        </svg>
        <svg class="icon" :class="{ iconHidden: !(valNum >= 1) }" width="30" viewBox="0 0 512.008 512.008">
            <path path
                d="M502.795,60.572c-11.183-9.782-28.214-8.677-38.023,2.533L177.837,391.028L46.603,251.036 c-10.186-10.833-27.217-11.372-38.077-1.213c-10.86,10.159-11.426,27.244-1.24,38.104l151.579,161.684 c5.12,5.416,12.207,8.488,19.672,8.488h0.458c7.626-0.108,14.794-3.449,19.833-9.189L505.355,98.595 C515.137,87.385,514.005,70.381,502.795,60.572z"
                fill="#12ce66"> </path>
        </svg>
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
    },
    conditionBarCurr: {
        type: String,
        required: true,
        default: 'inProgress'
    }
})

const sFadeStartColor: string = "#ff4949"
const sFadeFinishColor: string = "#12ce66"

const aRGBStart: string[] = sFadeStartColor.replace("#", "").match(/.{2}/g) || [];
const aRGBFinish: string[] = sFadeFinishColor.replace("#", "").match(/.{2}/g) || [];

const colorProgress = computed(() => {
    let startPercent = 1 - props.valNum;
    let R: number, G: number, B: number;

    if (props.conditionBarCurr === 'inProgress' || props.conditionBarCurr === 'success') {
        R = Math.floor((parseInt('0x' + aRGBStart[0]) * startPercent + parseInt('0x' + aRGBFinish[0]) * props.valNum));
        G = Math.floor((parseInt('0x' + aRGBStart[1]) * startPercent + parseInt('0x' + aRGBFinish[1]) * props.valNum));
        B = Math.floor((parseInt('0x' + aRGBStart[2]) * startPercent + parseInt('0x' + aRGBFinish[2]) * props.valNum));

        return 'rgb(' + R + ',' + G + ',' + B + ')';
    }
    return props.conditionBarCurr === 'warning' ? '#e7a23d' : '#ff4949'
})

const circumference = ref(2 * Math.PI * 54)

const progress = computed(() => props.valNum / (props.isDashBar ? 1.336 : 1))

const dashoffset = computed(() => circumference.value * (1 - progress.value))

// const colorMap: { [key: number]: string } = {
//     0: '#ff4949',
//     25: '#ff4949',
//     35: '#c46b50',
//     50: '#898c58',
//     65: '#76975a',
//     95: '#65a05c',
//     100: '#12ce66'
// }

// const colorProgress = computed(() => {
//     if (props.conditionBarCurr === 'inProgress' || props.conditionBarCurr === 'success') {
//         for (let threshold in colorMap) {
//             if (props.valNum as number <= parseInt(threshold)) {
//                 return colorMap[parseInt(threshold)];
//             }
//         }
//     }
//     return props.conditionBarCurr === 'warning' ? '#e7a23d' : '#ff4949'
// })
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
    transition: 0.5s
}

.iconHidden {
    opacity: 0;
    transition: 0.5s
}

.progress-bar {
    -webkit-transform: rotate(-90deg);
    transform: rotate(-90deg);
}

.dash-bar {
    -webkit-transform: rotate(135deg);
    transform: rotate(135deg);
    stroke-dasharray: 254 85 339
}

.progress__meter,
.progress__value {
    fill: none;
    stroke-linecap: round;
}

.progress__meter {
    stroke: #dadada;
}
</style>