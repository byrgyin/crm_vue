<script setup lang="ts">
import {ref} from 'vue';
import TheClientsHeadItem from '@/components/TheClientsHeadItem.vue'
import TheClientsCard from '@/components/TheClientsCard.vue'

import listhead from '@/composables/listHead.ts'
import { useClientStore } from '@/stores/useStoreClient.ts'

import ModalNewClient from "@/components/Modals/ModalNewClient.vue";
import ModalDeleteClient from "@/components/Modals/ModalDeleteClient.vue";
import ModalEditClient from "@/components/Modals/ModalEditClient.vue";

const clientStore = useClientStore();

const showForm = ref<boolean>(false);
const closeForm = ():void=>{
  showForm.value = false
  clientStore.showDeleteForm = false
}
/* ОБСУДИ ЭТОТ МОМЕНТ С НЕЙРОНКОЙ*/
const updateClients = ():void => {
  setTimeout(clientStore.loadUsers,100)
  clientStore.showDeleteForm = false
}
/* ОБСУДИ ЭТОТ МОМЕНТ С НЕЙРОНКОЙ*/
clientStore.loadUsers();
</script>

<template>
  <section class="clients">
    <div class="container">
      <h1 class="clients__title">Clients</h1>
      <div class="clients__wrapper">
        <ul class="clients__head-list">
          <the-clients-head-item v-for="item in listhead" :key="item.title" :head-item="item" />
        </ul>
        <ul class="clients__cards resultSearchClients" v-if="clientStore.resultSearchClients.length !== 0">
          <TheClientsCard
            v-for="(item,index) in clientStore.resultSearchClients"
            :key="index"
            :user="item"
          />
        </ul>
        <ul class="clients__cards sortedArray" v-else-if="clientStore.sortedArray">
          <TheClientsCard
            v-for="(item,index)  in clientStore.sortedArray"
            :key="index"
            :user="item"
          />
        </ul>
        <ul class="clients__cards DEFAULT" v-else>
          <TheClientsCard
            v-for="(item,index) in clientStore.clients"
            :key="index"
            :user="item"
          />
        </ul>
        <button @click="showForm = !showForm" class="clients__button">Add Client</button>
      </div>
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
    <ModalEditClient
      :show="clientStore.showEditForm"
      @submit:submitForm="updateClients"
    />
  </Teleport>
</template>

<style scoped>
.clients__wrapper{
  background: #25253F;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(0, 212, 255, 0.1);
}
.clients__title {
  margin: 0 0 26px;
  color: #FFFFFF;
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
  display: block;
  padding: 10px;
  margin: 0 auto;
  border-radius: 5px;
  width: fit-content;
  color: #fff;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}
</style>
