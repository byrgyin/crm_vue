<script setup lang="ts">
import {ref} from 'vue'
import type {Contact} from "@/types/types.ts";

const props = defineProps<{
  index: number;
  contact?: Contact;
}>();

const contacts = ref<Contact>({
  type:'',
  value:''
});

const emit = defineEmits<{
  (e:'cancel:removeInfoItem'):void;
  (e:'update:contact', contact: Contact & { index: number }): void;
  (e:'updateEdit:contact', contact: props.contact & { index: number }): void;
  (e:'removeOnIndex:editInfo', contact: Contact & { index: number }): void;
}>();


const removeItem = ():void=>{
  emit('cancel:removeInfoItem');
};

const inputChange = ():void=>{
  emit('update:contact', { ...contacts.value, index: props.index });
};

const updateItem = ():void=>{
  emit('updateEdit:contact', { ...props.contact, index: props.index });
}
const removeItemOnIndex = ():void=>{
  emit('removeOnIndex:editInfo', { ...contacts.value, index: props.index });
}

</script>

<template>
  <li class="form-contacts__item">
    <div class="form-contacts__item-wrap">
      <select v-if="contact" @change="updateItem" v-model.trim="contact.type" name="choose-cotcants"
        id="choose-cotcants" class="form-contacts__select">
        <option value="" disabled selected>Choose Type<</option>
        <option value="телефон" selected>Телефон</option>
        <option value="email">Email</option>
        <option value="facebook">Facebook</option>
        <option value="vk">Vk</option>
        <option value="другое">Другое</option>
      </select>
      <select v-else @change="inputChange" v-model.trim="contacts.type" name="choose-cotcants"
              id="choose-cotcants" class="form-contacts__select">
        <option value="" disabled selected>Choose Type</option>
        <option value="телефон" selected>Телефон</option>
        <option value="email">Email</option>
        <option value="facebook">Facebook</option>
        <option value="vk">Vk</option>
        <option value="другое">Другое</option>
      </select>
    </div>
    <input v-if="contact" @change="updateItem" v-model.trim="contact.value" id="info" class="form-contacts__input" type="text" required>
    <input v-else @change="inputChange" v-model.trim="contacts.value" id="info" class="form-contacts__input" type="text" required>
    <button v-if="contact" @click="removeItemOnIndex" class="form-contacts__chest" type="button">
      <img src="@/assets/cancel.svg" alt="cancel">
    </button>
    <button v-else @click="removeItem" class="form-contacts__chest" type="button">
      <img src="@/assets/cancel.svg" alt="cancel">
    </button>
  </li>
</template>

<style scoped>
.form-contacts__item {
  display: flex;
  justify-content: space-between;
  border: 1px solid #C8C5D1;
}
.form-contacts__select {
  padding: 10px 12px;
  min-width: 137px;
  background: linear-gradient(45deg, #00D4FF, #007BFF);
  border: none;
  outline: none;
  color: #FFFFFF;
  border-right: 1px solid #C8C5D1;
}
.form-contacts__select option {
  padding: 10px 12px;
  color: #FFFFFF;
  background: #00D4FF;
}
.form-contacts__input {
  padding: 8px 12px;
  width: 100%;
  color: #fff;
  background: transparent;
  outline: none;
  border: none;
}
.form-contacts__chest {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  padding: 0;
  width: 27px;
  outline: none;
  border: none;
  border-left: 1px solid #C8C5D1;
  background: linear-gradient(45deg, #00D4FF, #007BFF);
  cursor: pointer;
}
.form-contacts__chest img{
  filter: brightness(10);
}
</style>
