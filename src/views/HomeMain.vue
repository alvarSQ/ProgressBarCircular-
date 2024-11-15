<template>
    <div class="wrapper">
        <div class="container">
        <PBDControl v-show="isPBD" />
        <CircleDiagram v-show="isCD" />
        <div class="center" v-show="!(isPBD || isCD)">
        <div class="btn" @click="isPBD = !isPBD">Круговой прогрессбар/дашбоард </div>
        <div class="btn" @click="isCD = !isCD">Диаграмма в виде круга </div>        
        </div>
        <div class="btn back" v-show="isPBD || isCD" @click="isBack">Назад</div>
        </div>
    </div>
</template>

<script setup lang="ts">
// import { useRouter } from 'vue-router'
import PBDControl from '@/components/PBDControl.vue'
import CircleDiagram from '@/components/CircleDiagram.vue'
import { ref } from "vue";

// const router = useRouter()

// const goPBDControl = () => router.push({ name: 'ProgressBarControl' })
// const goCircleDiagram = () => router.push({ name: 'CircleDiagram' })

const isPBD = ref(false)
const isCD = ref(false)

const isBack = () => {
    isPBD.value = false
    isCD.value = false
    return true
}
</script>

<style scoped>
.back {
    margin-top: 30px;
    color: rgb(44, 44, 44);
    background-color: aliceblue;
}
</style>
