<script setup lang="ts">
import {ref} from 'vue';
import LabelInput from '@/components/formComponents/LabelInput.vue';
import ContactInfo from "@/components/formComponents/ContactInfo.vue";
import {addClient} from "@/api/apiClients.ts"
import type {CommonEmits, Contact} from "@/types/types.ts";

defineProps<{
  show: boolean,
}>();

const emit = defineEmits<CommonEmits>();
const count = ref<number>(0);
const surname = ref<string>('');
const name = ref<string>('');
const lastname = ref<string>('');
const contactsArr = ref<Contact[]>([]);

const clearArg = ():void=>{
  surname.value = '';
  name.value = '';
  lastname.value = '';
  contactsArr.value = [];
  count.value = 0;
}

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
  clearArg();
}
const updateContact = (contact: Contact & { index: number }): void => {
  contactsArr.value[contact.index] = { type: contact.type, value: contact.value };
};

const submitForm = (event:Event):void=>{
  event.preventDefault();
  const obj = {
    name: name.value,
    surname:surname.value,
    lastName:lastname.value,
    contacts:contactsArr.value
  }
  addClient(obj);
  clearArg();
  cancelForm();
  emit('submit:submitForm');
};
</script>

<template>
  <div v-if="show" class="modal modal-changedata">
    <form action="#" @submit.prevent="submitForm"  class="modal__form modal-new__form">
      <button @click="cancelForm" class="modal__close" type="button"></button>
      <div class="modal__form-title">New Client</div>
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
        <button @click="incrementCount" v-show="count <= 9" class="modal__form-add-contacts"><img src="../../assets/addcontacnt.svg" alt="Добавить контакт">Add contact</button>
      </div>
      <button type="submit" class="modal__form-submit">Save</button>
      <button @click="cancelForm" type="reset" class="modal__form-reset">Cancel</button>
    </form>
  </div>
</template>

<style scoped>

</style>
