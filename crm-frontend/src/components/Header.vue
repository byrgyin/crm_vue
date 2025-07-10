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
      clientStore.resultSearchClients = await searchClient(inputSearch.value);
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
        <img :src="logo" alt="crm_logo">
      </a>
      <form action="#" class="header__form" @submit.prevent="searchInput">
        <label for="search" style="display: none"></label>
        <input @change="searchInput" v-model.trim="inputSearch" type="search" name="search" id="search" placeholder="Fill your query" class="header__input">
      </form>
    </div>
  </header>
</template>

<style scoped>
.header{
  margin: 0 0 40px;
  padding: 23px 0;
  background: #FFF;
  box-shadow: 0 3px 5px 0 rgba(176, 190, 197, 0.32), 0 9px 27px 0px rgba(176, 190, 197, 0.32);
}
.header__container {
  display: flex;
  justify-content: flex-start;
  align-content: center;
  gap: 53px;
}
.header__link {
  display: block;
  width: 50px;
  height: 50px;
  flex-shrink: 0;
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
  padding: 0 16px;
  width: 100%;
  height: 44px;
  border: 1px solid rgba(51, 51, 51, 0.20);
  outline: none;
  color: #B0B0B0;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
</style>
