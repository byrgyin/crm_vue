<script setup lang="ts">
import type {HeadInfo} from '@/types/types.ts'
import arrow from '../assets/arrow.svg'
import {useClientStore} from "@/stores/useStoreClient.ts";

const props = defineProps<{
  headItem: HeadInfo,
}>();
const clientStore = useClientStore();

const sortItems = (event:Event): void => {
  const typeButton = props.headItem.typeButton;
  (event.target as HTMLElement)?.classList.toggle('clients__item-button--active');
  clientStore.sortType = typeButton as 'id' | 'fio' | 'date' | 'last_modify' | '';
  clientStore.activeClass = (event.target as HTMLElement).classList.contains('clients__item-button--active');
}
</script>

<template>
<li class="clients__item">
  <button @click="sortItems" v-if="headItem.typeButton" :data-type="headItem?.typeButton" class="clients__item-button">
    {{headItem.title}}
    <img class="clients__item-arrow" v-if="headItem.typeButton !== 'fio'" :src="arrow" alt="arrow">
    <span v-if="headItem.typeButton === 'fio'">
      <img class="clients__item-arrow" :src="arrow" alt="arrow">
      <span>a-z</span>
    </span>
  </button>
  {{ !headItem.typeButton ? headItem.title : '' }}
</li>
</template>

<style scoped>
.clients__item,
.clients__item button{
  display: block;
  width: fit-content;
  text-align: left;
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  background: transparent;
}
.clients__item span{
  color: #00D4FF;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-transform: uppercase;
}
.clients__item-arrow{
  transition: transform ease-in-out 0.3s;
}
.clients__item-button--active .clients__item-arrow{
  transform: scale(-1);
}
</style>
