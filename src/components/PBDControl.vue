<template>
    <div class="center">
        <ProgressBarCircl :valNum='valNum' :isDashBar='isDashBar' :conditionBarCurr="conditionBarCurr" />
        <div class="controls">
            <button @click="start">Старт</button>
            <button @click="stop">Стоп</button>
            <button @click="add">+</button>
            <button @click="remove">-</button>
            <button @click="onDashBar">Dash</button>
            <button @click="conditionBarSetup($event)">warning</button>
            <button @click="conditionBarSetup($event)">error</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import ProgressBarCircl from '@/components/UI/ProgressBarCircl.vue'

const valNum = ref(0)
const isDashBar = ref(false)
const conditionBar = ref(['warning', 'error', 'success'])
const conditionBarCurr = ref('inProgress')


watchEffect(() => valNum.value >= 100 ? conditionBarCurr.value = 'success' : valNum.value)
watchEffect(() => valNum.value < 100 && conditionBarCurr.value === 'success' ? conditionBarCurr.value = 'inProgress' : valNum.value)

const conditionBarSetup = (e: Event) => {
    stop()
    if (conditionBarCurr.value !== 'success') {
        for (let threshold of conditionBar.value) {
            if ((e.target as HTMLInputElement).innerHTML === threshold) {
                conditionBarCurr.value = threshold
            }
        }
    } 
}

const i = ref(0)
const start = () => {
    valNum.value < 100 ? conditionBarCurr.value = 'inProgress' : conditionBarCurr.value = 'success'
    i.value = setInterval(() => {
        valNum.value !== 100 ? valNum.value++ : clearInterval(i.value)
    }, 1000);
}
const stop = () => clearInterval(i.value)
const add = () => valNum.value < 100 ? valNum.value += 5 : valNum.value
const remove = () => valNum.value > 0 ? valNum.value -= 5 : valNum.value
const onDashBar = () => isDashBar.value = !isDashBar.value

</script>

<style lang="scss" scoped>
button {
    border: none;
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
    margin: 10px 5px;
    padding: 2px 5px;
    cursor: pointer;
    text-transform: uppercase;
    box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    font-size: 20px;
    width: 110px;
}

.controls {
    padding-left: 30px;
    width: 650px;
}

.center {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>