<template>
    <div class="container">
    <div class="center">
        <ProgressBarCircl :valNum='valNum' :isDashBar='isDashBar' :conditionBarCurr="conditionBarCurr" />
        <div class="controls">
            <button @click="onStart">Старт</button>
            <button @click="onStop">Стоп</button>
            <button @click="onAdd">+</button>
            <button @click="onRemove">-</button>
            <button @click="togglDashBar">Dash</button>
            <button @click="conditionBarSetup($event)">warning</button>
            <button @click="conditionBarSetup($event)">error</button>
        </div>
    </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import ProgressBarCircl from '@/components/UI/progressBarCircl.vue'

const valNum = ref(0)
const isDashBar = ref(false)
const conditionBar = ref(['warning', 'error', 'success'])
const conditionBarCurr = ref('inProgress')


const conditionBarSetup = (e: Event) => {
    onStop()
    if (conditionBarCurr.value !== 'success') {
        for (let threshold of conditionBar.value) {
            if ((e.target as HTMLInputElement).innerHTML === threshold) {
                conditionBarCurr.value = threshold
            }
        }
    } 
}

const i = ref(0)
const onStart = () => {
    valNum.value < 1 ? conditionBarCurr.value = 'inProgress' : conditionBarCurr.value = 'success'
    i.value = setInterval(() => {
        valNum.value < 1 ? valNum.value += 0.01 : clearInterval(i.value)
    }, 500);
}
const onStop = () => clearInterval(i.value)
const onAdd = () => valNum.value < 1 ? valNum.value += 0.05 : valNum.value
const onRemove = () => valNum.value > 0 ? valNum.value -= 0.05 : valNum.value
const togglDashBar = () => isDashBar.value = !isDashBar.value

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
</style>