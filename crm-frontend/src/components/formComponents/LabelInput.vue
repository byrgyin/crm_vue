<script setup lang="ts">
defineProps<{
  id: string,
  type: string,
  title: string,
  placeholder: string,
  required: boolean
}>();
const inputValue = defineModel('inputValue')
</script>

<template>
  <label :for="id" class="modal__label">
    <input v-model.trim="inputValue" v-if="required" class="modal__form-input" :id="id" type="text" required :placeholder="placeholder" />
    <input v-model.trim="inputValue" v-else class="modal__form-input" :id="id" type="text" :placeholder="placeholder" />
    <span class="modal__label-span">{{title}}<sup v-if="required" >*</sup></span>
    <span class="modal__warning">Это поле не может быть пустым</span>
  </label>
</template>

<style scoped>
.modal__label {
  display: block;
  position: relative;
}
.modal__label:not(:last-of-type) {
  margin: 0 0 32px;
}
.modal__label:last-of-type {
  margin: 0 0 26px;
}
.modal__form-input {
  width: 100%;
  height: 25px;
  background: transparent;
  outline: none;
  border: none;
  border-bottom: 1px solid #C8C5D1;
  text-transform: capitalize;
}
.modal__form-input::placeholder{
  color: transparent;
}
.modal__form-input:not(:placeholder-shown) + span, .modal__form-input:focus + span {
  transform: scale(0);
}
.modal__label-span {
  position: absolute;
  top: 0;
  left: 0;
  color: #B0B0B0;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  transition: transform ease .4s;
}
.modal__label-span sup {
  color: #9873FF;
}
.modal__warning {
  display: none;
  margin: 10px 0 0;
  color: red;
}
</style>
