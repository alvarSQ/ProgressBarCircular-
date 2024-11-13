<template>
  <div class="container">
  <div class="title">
    <span>Круговая диаграмма</span>
  </div>
  <div class="content">
    <ul class="conent-tabl">
      <li v-for="(label, i) in data.labels" :key="i">
        <div style="width: 253px; display: flex; justify-content: space-between">
          <div style="width: 124px">{{ label }}</div>
          <span>
            <svg width="2" height="16" viewBox="0 0 0.01 0.08">
              <rect
                width=".01"
                height=".08"
                rx=".01"
                ry=".01"
                style="fill: rgba(219, 223, 233)"
              />
            </svg>
            {{ `${data.datasets[0].data[i]}%` }}
            <svg width="2" height="16" viewBox="0 0 0.01 0.08">
              <rect
                width=".01"
                height=".08"
                rx=".01"
                ry=".01"
                style="fill: rgba(219, 223, 233)"
              />
            </svg>
          </span>
          <div style="width: 44px; display: flex; justify-content: right">
            <svg width="20" height="20" viewBox="0 0 0.56 0.56">
              <circle
                cx=".28"
                cy=".28"
                r=".28"
                :fill="data.datasets[0].backgroundColor[i]"
              />
            </svg>
          </div>
        </div>
        <div class="edit">
          <svg
            name="edit"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            @click="editBtnSector(i)"
          >
            <path
              d="M12.2178 5.94399L14.0953 4.09796C15.1323 3.07843 16.8135 3.07843 17.8504 4.09796L19.7279 5.94399C20.7648 6.96352 20.7648 8.61651 19.7279 9.63604L17.8504 11.4821M12.2178 5.94399L4.56463 13.4688C4.1365 13.8897 3.86755 14.4419 3.80237 15.0338L3.34134 19.2201C3.24381 20.1057 4.05713 20.8251 4.9425 20.6363L8.77269 19.82C9.27079 19.7138 9.72729 19.4689 10.0877 19.1146L17.8504 11.4821M12.2178 5.94399L17.8504 11.4821M15.0341 20.4932H20.6667"
              stroke="#99A1B7"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
          <svg
            name="delete"
            width="18"
            height="22"
            viewBox="0 0 18 22"
            fill="none"
            @click="deleteBtnSector(i)"
          >
            <path
              d="M13 5.5L12.4558 2.86754C12.1836 2.05086 11.4193 1.5 10.5585 1.5H7.44152C6.58066 1.5 5.81638 2.05086 5.54415 2.86754L5 5.5M3 6.3V7C3 7 3 7 3 7C3 7 3 9.0552 3 10.0823V16.5C3 18.7091 4.79086 20.5 7 20.5H11C13.2091 20.5 15 18.7091 15 16.5V10.0823C15 9.05522 15 7.00003 15 7C15 7 15 7 15 7V6.3M0.75 5.5H17.25"
              stroke="#99A1B7"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </div>
      </li>
      <div class="btn" style="margin-top: 30px" @click="addBtnSector">
        Добавить сектор
      </div>
    </ul>
    <div class="conent-diagrama" v-if="isRe_render">
      <div style="width: 500px; height: 500px">
        <PieDiagram :data="chartDataComputed" />
      </div>
      <ul class="diagram-legend">
        <li v-for="(label, i) in data.labels" :key="i">
          <svg width="14" height="14" viewBox="0 0 0.56 0.56">
            <circle
              cx=".28"
              cy=".28"
              r=".28"
              :fill="data.datasets[0].backgroundColor[i]"
            />
          </svg>
          {{ label }}
        </li>
      </ul>
    </div>
  </div>
  <div class="center"></div>
  <ModalMenu
    v-if="isModal"
    @close-modal="isModal = !isModal"
    @add-sector="addSector"
    @edit-sector="editSector"
    :isAddSector="isAddSector"
    :sendDataLabel="sendDataLabel"
  />
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import ModalMenu from "@/components/modalMenu.vue";
import { reactive, ref, computed } from "vue";
import type { IDataLabel } from "@/moduls/interfases";
// @ts-ignore
import PieDiagram from "@/components/UI/pieDiagram.vue";

const data = reactive({
  labels: ["VueJs", "EmberJs", "ReactJs", "AngularJs"],
  datasets: [
    {
      backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
      data: [40, 20, 80, 10],
    },
  ],
});

const isRe_render = ref(true);
const isModal = ref(false);
const isAddSector = ref(true);

const sendDataLabel = reactive({
  name: "sector",
  quantity: 25,
  color: "#4F46E5",
});

const defSendDataLabel = () => {
  (sendDataLabel.name = "sector"),
    (sendDataLabel.quantity = 25),
    (sendDataLabel.color = "#4F46E5");
};

const addBtnSector = () => {
  defSendDataLabel();
  isAddSector.value = true;
  isModal.value = true;
};

const forcedReRender = async () => (isRe_render.value = false);

const addSector = (receive: IDataLabel) => {
  isModal.value = false;
  forcedReRender().then(() => {
    data.datasets[0].data.push(receive.quantity);
    data.labels.push(receive.name);
    data.datasets[0].backgroundColor.push(receive.color);
    isRe_render.value = true;
  });
};

const editBtnSector = (i: number) => {
  isAddSector.value = false;
  isModal.value = true;
  sendDataLabel.name = data.labels[i];
  sendDataLabel.quantity = data.datasets[0].data[i];
  sendDataLabel.color = data.datasets[0].backgroundColor[i];
};

const editSector = (receive: IDataLabel) => {
  isModal.value = false;
  forcedReRender().then(() => {
    // data.labels.forEach((e, i) => e === sendDataLabel.name ? data.labels[i] = receive.name : e);
    // data.datasets[0].data.forEach((e, i) => e === sendDataLabel.quantity ? data.datasets[0].data[i] = receive.quantity : e);
    // data.datasets[0].backgroundColor.forEach((e, i) => e === sendDataLabel.color ? data.datasets[0].backgroundColor[i] = receive.color : e);
    let index = 0;
    index = data.labels.indexOf(sendDataLabel.name);
    data.labels[index] = receive.name;
    data.datasets[0].data[index] = receive.quantity;
    data.datasets[0].backgroundColor[index] = receive.color;
    isRe_render.value = true;
  });
};

const deleteBtnSector = (i: number) => {
  forcedReRender().then(() => {
    data.labels.splice(i, 1);
    data.datasets[0].data.splice(i, 1);
    data.datasets[0].backgroundColor.splice(i, 1);
    isRe_render.value = true;
  });
};

const chartDataComputed = computed(() => data);
</script>

<style lang="scss" scoped>
.title {
  height: 69px;
  padding-left: 10px;
  font-family: Inter;
  font-size: 32px;
  font-weight: 600;
  border-bottom: 1px solid rgba(219, 223, 233, 1);
}

.content {
  display: flex;
  justify-content: space-between;
  padding-top: 30px;
}

.conent-tabl {
  width: 541px;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    padding: 18px 20px 18px 20px;
    margin-bottom: 8px;
    border-radius: 10px;
    background-color: rgba(219, 223, 233, 0.2);
  }

  span {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    width: 86px;
    font-size: 16px;
  }
}

.edit {
  display: flex;
  justify-content: space-between;
  width: 69px;
  svg {
    cursor: pointer;
  }
}

.conent-diagrama {
  width: 540px;
}

.diagram-legend {
  display: flex;
  justify-content: center;
  padding-top: 30px;
  font-size: 15px;
  color: rgba(60, 60, 60);
  gap: 30px;

  li {
    display: flex;
    align-items: center;
    gap: 10px;
  }
}
</style>
