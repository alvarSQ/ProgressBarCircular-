<template>
    <div class="title">
        <span>Круговая диаграмма</span>
    </div>
    <div class="content">
        <ul class="conent-tabl">
            <li v-for="(label, i) in data.labels" :key="i">
                <svg width="14" height="14" viewBox="0 0 0.56 0.56">
                    <circle cx=".28" cy=".28" r=".28" :fill=data.datasets[0].backgroundColor[i] />
                </svg>
                {{ label }}
            </li>
        </ul>
        <div class="conent-diagrama">
            <div style="width: 500px; height: 500px;">
                <Pie :data="data" :options="options" />
            </div>
            <ul class="diagram-legend">
                <li v-for="(label, i) in data.labels" :key="i">
                    <svg width="14" height="14" viewBox="0 0 0.56 0.56">
                        <circle cx=".28" cy=".28" r=".28" :fill=data.datasets[0].backgroundColor[i] />
                    </svg>
                    {{ label }}
                </li>
            </ul>
        </div>
    </div>


    <div>

    </div>
    <div class="center">
        <ColorPicker v-model:pureColor="pureColor" v-model:gradientColor="gradientColor" />
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import type { ColorInputWithoutInstance } from 'tinycolor2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'
ChartJS.register(ArcElement, Tooltip, Legend)

const pureColor = ref<ColorInputWithoutInstance>("green");
const gradientColor = ref("linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 100%)");

const data = {
    labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
    datasets: [
        {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
            data: [40, 20, 80, 10]
        }
    ]
}

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        }
    }
}

// watchEffect(() => console.log(pureColor.value))
</script>

<style lang="scss" scoped>
.title {
    height: 69px;
    padding-left: 10px;
    font-family: Inter;
    font-size: 32px;
    font-weight: 600;
    border-bottom: 1px solid rgba(219, 223, 233, 1)
}

.content {
    display: flex;
    justify-content: space-between;
    padding-top: 30px;
}

.conent-tabl {
    width: 541px;
    border: 1px solid black;
}

.conent-diagrama {
    width: 540px;
    border: 1px solid black;
}

.diagram-legend {
    display: flex;
    justify-content: center;
    padding-top: 30px;
    font-size: 15px;
    font-weight: 400;
    color: rgba(60, 60, 60);
    gap: 30px;

    li {
        display: flex;
        align-items: center;
        gap: 10px;
    }
}
</style>
