<template>
    <div class="wrapper">
        <div class="container">
        <div class="btn" @click="goPBDControl">Круговой прогрессбар/дашбоард </div>
        <div class="btn" style="margin-top: 50px;" @click="goCircleDiagram">Диаграмма в виде круга </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goPBDControl = () => router.push({ name: 'ProgressBarControl' })
const goCircleDiagram = () => router.push({ name: 'CircleDiagram' })
</script>
