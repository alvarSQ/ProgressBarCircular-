<template>
  <Pie :data="data" :options="options" />
</template>

<script setup lang="ts">
import type { IData } from "@/modules/interface";
import { Chart as ChartJS, ArcElement } from "chart.js";
import { Pie } from "vue-chartjs";

ChartJS.register(ArcElement);

const props = defineProps<{
  data: IData
}>();



const options = {
  responsive: true,
  maintainAspectRatio: false,
};

</script>
