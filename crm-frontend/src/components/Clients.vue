<script setup lang="ts">
import {ref} from 'vue';
import TheClientsHeadItem from '@/components/TheClientsHeadItem.vue'
import TheClientsCard from '@/components/TheClientsCard.vue'

import listhead from '@/composables/listHead.ts'
import { useClientStore } from '@/stores/useStoreClient.ts'
import { loadClients } from '@/api/apiClients.ts'
import ModalNewClient from "@/components/ModalNewClient.vue";
import ModalDeleteClient from "@/components/ModalDeleteClient.vue";

const clientStore = useClientStore();

const loadUsers = async () => (clientStore.clients.value = await loadClients());
const showForm = ref<boolean>(false);

const closeForm = ():void=>{
  showForm.value = false
  clientStore.showDeleteForm = false
}
/* ОБСУДИ ЭТОТ МОМЕНТ С НЕЙРОНКОЙ*/
const updateClients = ():void => {
  setTimeout(loadUsers,100)
  clientStore.showDeleteForm = false
}
/* ОБСУДИ ЭТОТ МОМЕНТ С НЕЙРОНКОЙ*/
loadUsers();

</script>

<template>
  <section class="clients">
    <div class="container">
      <h1 class="clients__title">Clients</h1>
      <div class="clients__wrapper">
        <ul class="clients__head-list">
          <the-clients-head-item v-for="item in listhead" :key="item.title" :head-item="item" />
        </ul>
        <ul class="clients__cards">
          <TheClientsCard
            v-for="item in clientStore.clients.value"
            :key="item.id"
            :user="item"
          />
        </ul>

      </div>
      <button @click="showForm = !showForm" class="clients__button">
        <img src="../assets/addclint.svg" alt="Добавить клиента" />
        Добавить Клиента
      </button>
    </div>
  </section>
  <Teleport to="body">
    <ModalNewClient
      :show="showForm"
      @cancel:closeForm="closeForm"
      @submit:submitForm="updateClients"
    />
    <ModalDeleteClient
      :show="clientStore.showDeleteForm"
      @cancel:closeForm="closeForm"
      @submit:submitForm="updateClients"
    />
  </Teleport>
</template>

<style scoped>
.clients__title {
  margin: 0 0 26px;
  color: #333;
  font-size: 24px;
  font-weight: 700;
  line-height: normal;
}
.clients__head-list {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  align-items: center;
  margin: 0;
  padding: 10px 11px;
  list-style-type: none;
}
.clients__cards {
  position: relative;
  padding: 0;
  margin: 0 0 40px;
  height: 100%;
  min-height: 300px;
}
.clients__cards--loading:before {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #ffffff;
  opacity: 1;
  z-index: 1;
  transition: opacity ease 0.3s;
}
.clients__cards--loading:after {
  content: '';
  display: block;
  background: url(../assets/spin.svg);
  background-repeat: no-repeat;
  background-size: contain;
  width: 50px;
  height: 50px;
  position: absolute;
  top: 44%;
  left: 47%;
  z-index: 11;
  animation: rotate infinite 1s;
  opacity: 1;
  transition: opacity ease 0.3s;
}
@keyframes rotate {
  0% {
    transform: rotate(360deg);
  }
}
.clients__button {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 26px;
  margin: 0 auto 0;
  color: #9873ff;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  line-height: normal;
  background: transparent;
  border: 1px solid #9873ff;
  cursor: pointer;
}
</style>
