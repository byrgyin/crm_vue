<script setup lang="ts">
import { useClientStore } from '@/stores/useStoreClient.ts'
import {deleteClient} from '@/api/apiClients.ts'
import type {CommonEmits} from '@/types/types.ts'
defineProps<{
  show: boolean,
}>();
const emit = defineEmits<CommonEmits>();
const clientStore = useClientStore();
const cancelForm = ():void=>{
  emit('cancel:closeForm');
}
const confirmDeleteClient = () => {
  deleteClient(clientStore.idBTN);
  emit('submit:submitForm');
}
</script>

<template>
  <div v-if="show" class="modal modal-remove">
    <div class="modal-remove__wrap">
      <button @click="cancelForm" class="modal__close"></button>
      <div class="modal-remove__title">Удалить клиента</div>
      <div class="modal-remove__subtitle">Вы действительно хотите удалить данного клиента?</div>
      <button @click="confirmDeleteClient"  data-decision="yes" class="modal-remove__yes" type="button">Удалить</button>
      <button @click="cancelForm" data-decision="no" class="modal-remove__no" type="button">Отмена </button>
    </div>
  </div>
</template>

<style scoped>
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  padding: 15px;
  width: 100%;
  height: 100%;
  background: rgb(51 51 51 / 60%);
}
.modal-remove__wrap {
  display: flex;
  flex-flow: column;
  position: relative;
  padding: 22px 0 27px;
  width: 450px;
  max-height: 215px;
  text-align: center;
  background: #FFFFFF;
}
.modal__close {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
}
.modal__close:before,
.modal__close:after {
  content: '';
  display: block;
  width: 100%;
  height: 1px;
  background: #b0b0b0;
}
.modal__close:before {
  transform: rotate(45deg);
}
.modal__close:after {
  position: absolute;
  top: 12px;
  left: 0;
  transform: rotate(-45deg);
}
.modal-remove__title {
  margin: 0 0 11px;
  color: #333333;
  font-size: 18px;
  font-weight: 700;
  line-height: normal;
}
.modal-remove__subtitle {
  margin: 0 auto 25px;
  width: 275px;
  color: #333333;
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
}
.modal-remove__yes {
  align-self: center;
  padding: 17px 35px;
  margin: 0 0 5px;
  background: #9873FF;
  color: #FFF;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  outline: none;
  border: none;
  cursor: pointer;
}
.modal-remove__no {
  align-self: center;
  padding: 0;
  margin: 0;
  border: none;
  outline: none;
  color: #333;
  background: transparent;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration-line: underline;
  cursor: pointer;
}
</style>
