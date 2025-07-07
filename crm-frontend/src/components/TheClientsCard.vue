<script setup lang="ts">
import type {User} from '@/types/types.ts'
import {parseHours, parseYear} from "@/composables/helpers.ts";
import {ref} from 'vue'
import TheClientCardContacnts from "@/components/TheClientCardContacnts.vue";
import { useClientStore } from '@/stores/useStoreClient.ts'

const props = defineProps<{
  user:User
}>();
const yearCreated = ref<string>(parseYear(props.user.createdAt));
const hoursCreated = ref<string>(parseHours(props.user.createdAt));
const yearUpdate = ref<string>(parseYear(props.user.updatedAt));
const hoursUpdate = ref<string>(parseHours(props.user.updatedAt));
const clientStore = useClientStore();

const clickRemove = ():void=>{
  clientStore.idBTN = props.user.id as string;
  clientStore.showDeleteForm = true;
}
const openEditModal = ():void => {
  clientStore.idBTN = props.user.id as string;
  clientStore.showEditForm = true;
  clientStore.editUserCard = props.user;
}

</script>

<template>
<li class="clients__card">
  <div class="clients__card-item clients__card-item-id">{{user.id}}</div>
  <div class="clients__card-item clients__card-item-fio">{{user.name}} {{user.surname}} {{user.lastName}}</div>
  <div class="clients__card-item clients__card-item-dt-create">
    <span>{{yearCreated}}</span> <span>{{hoursCreated}}</span>
  </div>
  <div class="clients__card-item clients__card-item-lst-modify">
    <span>{{yearUpdate}}</span> <span>{{hoursUpdate}}</span>
  </div>
  <div class="clients__card-item clients__card-item-contacts">
    <TheClientCardContacnts
      v-if="user.contacts?.length"
      :contacts="user.contacts"/>
    <span v-else>Конакты не указаны</span>
  </div>
  <div class="clients__card-item clients__card-item-actions">
    <button @click="openEditModal" :data-id="user.id" class="clients__card-button"><img src="../assets/edit.svg" alt="изменить">Изменить</button>
    <button @click="clickRemove" :data-id="user.id" class="clients__card-button"><img src="../assets/delete.svg" alt="изменить">Удалить</button>
  </div>
</li>
</template>

<style scoped>
.clients__card{
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  align-items: center;
  padding: 10px 11px;
  background: #FFF;
}
.clients__card-item{
  font-size: 14px;
  font-weight: 400;
  color: #333;
}
.clients__card-item-id {
  color: #B0B0B0;
  font-size: 12px;
}
.clients__card-item-fio{
  text-transform: capitalize;
}
.clients__card-item-dt-create span:nth-child(2),
.clients__card-item-lst-modify span:nth-child(2){
  color: #B0B0B0;
}
.clients__card:not(:last-child){
  border-bottom: 1px solid #C8C5D1;
}
.clients__card-item-actions{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
}
.clients__card-button{
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: color ease .3s;
}
.clients__card-button img{
  width: 16px;
  height: 16px;
  object-fit: contain;
}

</style>
