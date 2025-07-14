<script setup lang="ts">
import {ref} from 'vue';
import {searchClient} from '@/api/apiClients.ts';
import {useClientStore} from "@/stores/useStoreClient.ts";
import logo from '../assets/logo.svg';

const inputSearch = ref<string>('');
const clientStore = useClientStore();
const searchInput = async (): Promise<void> => {
  try {
    if(inputSearch.value){
      const data = await searchClient(inputSearch.value);
      clientStore.resultSearchClients = data || [];
    } else {
      clientStore.resultSearchClients = []
    }
  } catch (e) {
    console.error('Search failed:', e);
  }
};
</script>

<template>
  <header class="header">
    <div class="container header__container">
      <a href="/crm_vue/crm-frontend/public" class="header__link">
        <img class="header__logo" :src="logo" alt="crm_logo">
      </a>
      <form action="#" class="header__form" @submit.prevent="searchInput">
        <label for="search" style="display: none"></label>
        <input @change="searchInput" v-model.trim="inputSearch" type="search" name="search" id="search" placeholder="Find your client" class="header__input">
      </form>
    </div>
  </header>
</template>

<style scoped>
.header{
  margin: 0 0 40px;
  padding: 23px 0;
  background: #2A2A40;
  border-radius: 10px;
}
.header__container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 53px;
}
.header__link {
  display: block;
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  border: 1px solid #fff;
  border-radius: 50%;
}
.header__logo {
  width: 100%;
  height: 100%;
}
.header__form {
  width: 100%;
  max-width: 581px;
}
.header__input {
  width: 100%;
  padding: 10px;
  height: 40px;
  border: none;
  border-radius: 5px;
  background: #333350;
  color: #F5F6FA;
}
.header__input::placeholder {
  color: #FFFFFF;
}
.header__input:focus,
.header__input:first-child,
.header__input:focus-within{
  outline: none;
  box-shadow: 1px 1px 20px -6px #FFFFFF;
}
</style>
