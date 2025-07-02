<script setup lang="ts">
import {ref} from 'vue'
import LabelInput from '@/components/formComponents/LabelInput.vue'
import ContactInfo from "@/components/formComponents/ContactInfo.vue";
import type {Contact} from "@/types/types.ts";

defineProps<{
  show: boolean,
}>();

const emit = defineEmits<{
  (e:'cancel:closeForm'):void;
}>();

const count = ref<number>(0);
const surname = ref<string>('');
const name = ref<string>('');
const lastname = ref<string>('');
const contactsArr = ref<Contact[]>([]);

const incrementCount = ():void=>{
  if(count.value <= 9){
    count.value++;
    contactsArr.value.push({ type: '', value: '' });
  }
};
const decrementCount = ():void=>{
  count.value--;
  contactsArr.value.pop();
}
const cancelForm = ():void=>{
  emit('cancel:closeForm');
}
const updateContact = (contact: Contact & { index: number }): void => {
  contactsArr.value[contact.index] = { type: contact.type, value: contact.value };
};

const cancelStandartEventForm = (event:Event):void=>{
  event.preventDefault();
  const obj = {
    name: name.value,
    surname:surname.value,
    lastname:lastname.value,
    contacts:contactsArr.value
  }
  console.log(obj);
};
</script>

<template>
  <div v-if="show" class="modal">
    <form action="#" @submit.prevent="cancelStandartEventForm"  class="modal__form modal-new__form">
      <button @click="cancelForm" class="modal__close" type="button"></button>
      <div class="modal__form-title">Новый клиент</div>
      <LabelInput v-model:input-value="surname" id="surname" title="Фамилия" type="text" placeholder="Фамилия" :required="true" />
      <LabelInput v-model:input-value="name" id="name" title="Имя" type="text" placeholder="Имя" :required="true" />
      <LabelInput v-model:input-value="lastname" id="lastName" title="Отчество" type="text" placeholder="Отчество" :required="false" />
      <div class="modal__form-contacts">
        <ul class="form-contacts__list" v-show="count !== 0">
          <ContactInfo
            v-for="(item,index) in count"
            :key="index"
            :index="index"
            @cancel:removeInfoItem="decrementCount"
            @update:contact="updateContact"
          />
        </ul>
        <button @click="incrementCount" v-show="count <= 9" class="modal__form-add-contacts"><img src="../assets/addcontacnt.svg" alt="Добавить контакт">Добавить контакнт</button>
      </div>
      <button type="submit" class="modal__form-submit">Сохранить</button>
      <button @click="cancelForm" type="reset" class="modal__form-reset">Отмена</button>
    </form>
  </div>
</template>

<style scoped>
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  padding: 15px;
  width: 100%;
  height: 100%;
  background: rgb(51 51 51 / 60%);
}
.modal__form {
  display: flex;
  flex-flow: column;
  position: relative;
  width: 100%;
  max-width: 450px;
  padding: 24px 30px;
  background: #fff;
  box-shadow: 0 0 35px 0 rgba(0, 0, 0, 0.15);
  overflow: hidden;
}
.modal__form-title {
  margin: 0 0 32px;
  color: #333;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
.modal__close {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
}
.modal__close:before,
.modal__close:after {
  content: '';
  display: block;
  width: 100%;
  height: 1px;
  background: #b0b0b0;
}
.modal__close:before {
  transform: rotate(45deg);
}
.modal__close:after {
  position: absolute;
  top: 12px;
  left: 0;
  transform: rotate(-45deg);
}
.modal__form-submit {
  align-self: center;
  padding: 17px 35px;
  background: #9873FF;
  color: #FFF;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  outline: none;
  border: none;
  cursor: pointer;
}
.modal__form-reset {
  align-self: center;
  padding: 0;
  margin: 0;
  border: none;
  outline: none;
  color: #333;
  background: transparent;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration-line: underline;
  cursor: pointer;
}
.modal__form-contacts {
  position: relative;
  margin: 0 0 25px;
  padding: 8px 0;
  text-align: center;
}
.modal__form-contacts:before {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: -5vw;
  width: 105vw;
  height: 100%;
  opacity: 0.2;
  background: #C8C5D1;
}
.modal__form-add-contacts {
  display: inline-flex
;
  align-items: center;
  justify-content: center;
  gap: 4px;
  position: relative;
  padding: 0;
  margin: 0;
  outline: none;
  border: none;
  color: #333;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
  transition: color ease .3s;
}
.form-contacts__list{
  display: flex;
  flex-flow: column;
  gap: 15px;
  position: relative;
  padding: 0;
  list-style-type: none;
}
</style>
