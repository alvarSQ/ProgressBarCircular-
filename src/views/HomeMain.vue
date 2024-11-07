<template>
    <div class="center">
        <ProgressBarCircl :valNum='valNum' :isDashBar='isDashBar' />
        <div class="controls">
            <button @click="add">+</button>
            <button @click="remove">-</button>
            <button @click="onDashBar">D</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ProgressBarCircl from '@/components/ProgressBarCircl.vue'

const valNum = ref(25)
const isDashBar = ref(false)

const add = () => valNum.value !== 100 ? valNum.value += 5 : valNum.value
const remove = () => valNum.value !== 0 ? valNum.value -= 5 : valNum.value
const onDashBar = () => isDashBar.value = !isDashBar.value
</script>

<style lang="scss" scoped>

button {
    border: none;
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
    margin: 0 1px;
    outline: 0;
    cursor: pointer;
    text-transform: uppercase;
    box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.3);
    border-radius: 2px;
    font-size: 22px;
    width: 40px;
    height: 40px;
}

.controls {
    padding-left: 30px;
    width: 300px;
}

.center {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>