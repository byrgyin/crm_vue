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

</style>
