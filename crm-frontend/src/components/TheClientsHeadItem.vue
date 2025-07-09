<script setup lang="ts">
import type {HeadInfo} from '@/types/types.ts'
import arrow from '../assets/arrow.svg'
import {useClientStore} from "@/stores/useStoreClient.ts";

const props = defineProps<{
  headItem: HeadInfo,
}>();

const sortItems = (event:Event): void => {
  const typeButton = props.headItem.typeButton;
  document.querySelectorAll('.clients__item-button').forEach(button => {
    button.classList.remove('clients__item-button--active');
  })
  event.target?.classList.add('clients__item-button--active');
  switch (typeButton) {
    case 'id':
      console.log('id');
      break;
    case 'fio':
      console.log('fio');
      break;
    case 'date':
      console.log('date');
      break;
    case 'last_modify':
      console.log('last_modify');
      break;
    default:
      break;
  }
}
</script>

<template>
<li class="clients__item">
  <button @click="sortItems" v-if="headItem.typeButton" :data-type="headItem?.typeButton" class="clients__item-button">
    {{headItem.title}}
    <img class="clients__item-arrow" v-if="headItem.typeButton !== 'fio'" :src="arrow" alt="arrow">
    <span v-if="headItem.typeButton === 'fio'">
      <img class="clients__item-arrow" :src="arrow" alt="arrow">
      <span>а-я</span>
    </span>
  </button>
  {{ !headItem.typeButton ? headItem.title : '' }}
</li>
</template>

<style scoped>
.clients__item,
.clients__item button{
  display: block;
  width: 104px;
  text-align: left;
  color: #B0B0B0;
  font-size: 12px;
  font-weight: 400;
  cursor: pointer;
}
.clients__item span{
  color: #9873FF;
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
