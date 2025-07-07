<script setup lang="ts">
import type {HeadInfo} from '@/types/types.ts'
import arrow from '../assets/arrow.svg'
defineProps<{
  headItem: HeadInfo,
}>();
</script>

<template>
<li class="clients__item">
  <button v-if="headItem.typeButton" :data-type="headItem?.typeButton" class="clients__item-button">
    {{headItem.title}}
    <img v-if="headItem.typeButton !== 'fio'" :src="arrow" alt="arrow">
    <span v-if="headItem.typeButton === 'fio'">
      <img :src="arrow" alt="arrow">
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
</style>
