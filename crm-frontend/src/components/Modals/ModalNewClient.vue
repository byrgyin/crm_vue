<script setup lang="ts">
import {ref} from 'vue';
import LabelInput from '@/components/formComponents/LabelInput.vue';
import ContactInfo from "@/components/formComponents/ContactInfo.vue";
import {addClient} from "@/api/apiClients.ts"
import type {CommonEmits, Contact, User} from "@/types/types.ts";

defineProps<{
  show: boolean,
}>();

const emit = defineEmits<CommonEmits>();

const count = ref<number>(0);

const client = ref<User>({
  surname:'',
  name:'',
  lastName:'',
  contacts:[],
});

const clearArg = ():void=>{
  client.value.surname = '';
  client.value.name = '';
  client.value.lastName = '';
  client.value.contacts = [];
  count.value = 0;
}

const incrementCount = ():void=>{
  if(count.value <= 9){
    count.value++;
    client.value.contacts?.push({ type: '', value: '' });
  }
};
const decrementCount = ():void=>{
  count.value--;
  client.value.contacts?.pop();
}
const cancelForm = ():void=>{
  emit('cancel:closeForm');
  clearArg();
}
const updateContact = (contact: Contact & { index: number }): void => {
  if(client.value.contacts) client.value.contacts[contact.index] = { type: contact.type, value: contact.value };
};

const submitForm = (event:Event):void=>{
  event.preventDefault();
  const obj = {
    name: client.value.name,
    surname:client.value.surname,
    lastName:client.value.lastName,
    contacts:client.value.contacts
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
      <LabelInput v-model:input-value="client.surname" id="surname" title="Фамилия" type="text" placeholder="Фамилия" :required="true" />
      <LabelInput v-model:input-value="client.name" id="name" title="Имя" type="text" placeholder="Имя" :required="true" />
      <LabelInput v-model:input-value="client.lastName" id="lastName" title="Отчество" type="text" placeholder="Отчество" :required="false" />
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
