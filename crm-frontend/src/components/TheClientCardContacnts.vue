<script setup lang="ts">
import type {Contact} from '@/types/types.ts'
defineProps<{
  contacts:Contact[] | undefined,
}>();
</script>

<template>
<ul class="clients__contacts">
  <li
    v-for="item in contacts"
    :key="item.type"
    class="clients__contacts-item"
  >
    <a
      v-if="item.type === 'email'"
      class="clients__contacts-link"
      :href="`mailto:${item.value}`">
      <img src="../assets/mail.svg" alt="email">
    </a>
    <a
      v-else-if="item.type === 'телефон'"
      class="clients__contacts-link"
      :href="`tel:+${item.value}`">
      <img src="../assets/phone.svg" alt="phone">
    </a>
    <a
      v-else-if="item.type === 'facebook'"
      class="clients__contacts-link"
      :href="`${item.value}`">
      <img src="../assets/fb.svg" alt="facebook">
    </a>
    <a
      v-else-if="item.type === 'vk'"
      class="clients__contacts-link"
      :href="`${item.value}`">
      <img src="../assets/vk.svg" alt="vk">
    </a>
    <a
      v-else
      class="clients__contacts-link"
      :href="`${item.value}`">
      <img src="../assets/icon.svg" alt="onother">
    </a>
    <span class="clients__contacts-tolltip">
      <span class="clients__contacts-tolltip-type">{{item.type}}: </span>
      <span class="clients__contacts-tolltip-value">{{item.value}}</span>
    </span>
  </li>
</ul>
</template>

<style scoped>
.clients__contacts{
  display: grid;
  grid-template-columns: repeat(5, max-content);
  align-items: center;
  gap: 7px;
  margin: 0;
  padding: 0;
  list-style-type: none;
}
.clients__contacts-item{
  position: relative;
  width: 16px;
  height: 16px;
  border-radius: 50%;
}
.clients__contacts-tolltip{
  display: flex;
  align-items: center;
  gap: 2px;
  position: absolute;
  top: -34px;
  left: 0;
  padding: 7px 18px;
  background: #333;
  color: #FFFFFF;
  font-size: 12px;
  opacity: 0;
  transform: translateY(10px);
  pointer-events: none;
  transition: opacity ease .4s, transform ease .4s;
}
.clients__contacts-tolltip-type{
  opacity: .8;
}
.clients__contacts-item:hover .clients__contacts-tolltip{
  opacity: 1;
  transform: translateY(0);
}
</style>
