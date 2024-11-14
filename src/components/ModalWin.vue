<template>
  <div class="modal">
    <p class="title">Добавление сектора</p>
    <div class="text-field text-field_floating">
      <input
        class="text-field__input"
        type="name"
        id="name"
        v-model="receiveDataLabel.name"
      />
      <label class="text-field__label" for="name">Наименование</label>
    </div>
    <div class="text-field text-field_floating">
      <input
        class="text-field__input"
        type="quantity"
        id="quantity"
        v-model="receiveDataLabel.quantity"
      />
      <label class="text-field__label" for="quantity">Значение</label>
    </div>
    <div class="text-field text-field_floating">
      <input
        class="text-field__input"
        type="colorIn"
        id="colorIn"
        v-model="receiveDataLabel.color"
      />
      <label class="text-field__label" for="colorIn">Цвет</label>
      <div class="colorPic" @click="showColorPicker">
        <div>
          <svg width="20" height="20" viewBox="0 0 0.56 0.56">
            <circle cx=".28" cy=".28" r=".28" :fill="pureColor" />
          </svg>
        </div>
        <div>
          <svg :class="{ shevron: isShevronOpen }" width="12" viewBox="0 0 21.25 12.36">
            <rect
              width="17.5"
              height="2.43"
              transform="matrix(0.607348 0.607348 -0.707107 0.707107 1.71825 0.0141315)"
              fill="rgba(153, 161, 183)"
            />
            <rect
              width="17.5"
              height="2.43"
              transform="matrix(-0.607348 0.607348 -0.707107 -0.707107 21.2518 1.71825)"
              fill="rgba(153, 161, 183)"
            />
          </svg>
        </div>
      </div>
      <ColorPicker
        v-if="isColorPicker"
        is-widget
        format="rgb"
        picker-type="chrome"
        disable-history
        v-model:pureColor="pureColor"
      />
    </div>
    <div v-if="isAddSector" class="btn" @click="$emit('addSector', receiveDataLabel)">Добавить сектор</div>
    <div v-else class="btn" @click="$emit('editSector', receiveDataLabel)">Изменить сектор</div>
  </div>
  <div class="dark" @click="$emit('closeModal')"></div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import type { IDataLabel } from '@/modules/interface';

const props = defineProps<{
  sendDataLabel: IDataLabel
  isAddSector: boolean
}>();

const emit = defineEmits(['addSector', 'editSector', 'closeModal']);

const pureColor = ref(props.sendDataLabel.color);

const isShevronOpen = ref(false);
const isColorPicker = ref(false);
const showColorPicker = () => {
  isShevronOpen.value = !isShevronOpen.value;
  isColorPicker.value = !isColorPicker.value;
};

const receiveDataLabel = reactive({
  name: props.sendDataLabel.name,
  quantity: props.sendDataLabel.quantity,
  color: pureColor,
});
</script>

<style lang="scss" scoped>
.colorPic {
  display: flex;
  justify-content: space-between;
  position: relative;
  float: right;
  top: -30px;
  padding-right: 10px;
  width: 50px;
  height: 0;
  cursor: pointer;
}

.shevron {
  -moz-transform: scale(-1, -1);
  -o-transform: scale(-1, -1);
  -webkit-transform: scale(-1, -1);
  transform: scale(-1, -1);
}

.text-field_floating {
  position: relative;

  .text-field__label {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    padding: 25px 16px;
    pointer-events: none;
    transform-origin: 0 0;
    transition: opacity 0.15s ease-in-out, transform 0.15s ease-in-out;
  }

  .text-field__input:focus,
  .text-field__input:not(:placeholder-shown) {
    padding-top: 22px;
    font-size: 16px;
    font-weight: 400;
  }

  .text-field__input:focus ~ .text-field__label,
  .text-field__input:not(:placeholder-shown) ~ .text-field__label {
    font-size: 12px;
    opacity: 0.65;
    transform: scale(0.85) translateY(-0.75rem) translateX(0.15rem);
  }
}

input {
  padding-left: 16px;
  border-radius: 10px;
  border: 1px solid rgba(219, 223, 233, 1);
  width: 100%;
  height: 60px;
  font-family: inherit;
}

.title {
  font-size: 20px;
  font-weight: 600;
  line-height: 24.2px;
  color: rgba(37, 47, 74, 1);
}

.cross {
  width: 30px;
  height: 30px;
  color: #b3b3b3;
  cursor: pointer;

  &:hover {
    color: #202020;
  }
}

.modal {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 390px;
  min-width: 340px;
  padding: 20px;
  gap: 20px;
  border-radius: 15px;
  background-color: white;
  z-index: 99;
  @media (max-width: 412px) {
   width: 100%
  }
}

.dark {
  background: #000;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.7;
  z-index: 98;
}
</style>
