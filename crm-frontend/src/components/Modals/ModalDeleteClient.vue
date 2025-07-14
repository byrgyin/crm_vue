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
      <div class="modal-remove__title">Delete client</div>
      <div class="modal-remove__subtitle">Do you really want to delete this client?</div>
      <button @click="confirmDeleteClient" data-decision="yes" class="modal-remove__yes" type="button">Delete</button>
      <button @click="cancelForm" data-decision="no" class="modal-remove__no" type="button">Cancel </button>
    </div>
  </div>
</template>

<style scoped>

</style>
