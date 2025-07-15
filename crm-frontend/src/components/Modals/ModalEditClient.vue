<script setup lang="ts">
import {ref,watch} from 'vue';
import type {CommonEmits, Contact, User} from "@/types/types.ts";
import LabelInput from '@/components/formComponents/LabelInput.vue';
import ContactInfo from "@/components/formComponents/ContactInfo.vue";
import {updateClient} from "@/api/apiClients.ts";
import {useClientStore} from "@/stores/useStoreClient.ts";
import { useClientForm } from '@/composables/helpers.ts';

defineProps<{
  show:boolean
}>();
const emit = defineEmits<CommonEmits>();
const clientStore = useClientStore();
const { client, count, incrementCount, decrementCount, decrementArrayOnIndex, cancelForm, updateContact, clearArg } = useClientForm();

const submitForm = (event:Event):void=>{
  event.preventDefault();
  const obj = {
    name: client.value.name,
    surname:client.value.surname,
    lastName:client.value.lastName,
    contacts: client.value.contacts || [],
  }
  updateClient(obj, client.value.id || '');
  clearArg();
  cancelForm(emit, true, clientStore);
  emit('submit:submitForm');
};
const update = (): void => {
  const user = clientStore.editUserCard;
  if (user) {
    client.value.id = user.id;
    client.value.surname = user.surname;
    client.value.name = user.name;
    client.value.lastName = user.lastName;
    client.value.contacts = user.contacts || [];
    count.value = user.contacts?.length || 0;
  }
};

watch(()=>clientStore.showEditForm, (newValue,oldValue) => {
  if(newValue){
    update()
  }
},{deep:true});
</script>

<template>
  <div v-if="show" class="modal modal-changedata">
    <form action="#" @submit.prevent="submitForm" class="modal__form modal__form--change">
      <button @click="cancelForm(emit, true, clientStore)" class="modal__close" type="button"></button>
      <div class="modal__form-title">Change Data: <span class="modal__form-title-span">{{client.id}}</span></div>
      <LabelInput v-model:input-value="client.surname" id="surname" title="Фамилия" type="text" placeholder="Фамилия" :required="true" />
      <LabelInput v-model:input-value="client.name" id="name" title="Имя" type="text" placeholder="Имя" :required="true" />
      <LabelInput v-model:input-value="client.lastName" id="lastName" title="Отчество" type="text" placeholder="Отчество" :required="false" />
      <div class="modal__form-contacts">
        <ul class="form-contacts__list" v-show="client.contacts.length !== 0">
          <ContactInfo
          v-for="(item, index) in client.contacts"
          :key="index"
          :index="index"
          :contact="item"
          @cancel:removeInfoItem="decrementCount"
          @update:contact="updateContact"
          @removeOnIndex:editInfo="decrementArrayOnIndex"/>
        </ul>
        <button @click="incrementCount" v-show="count <= 9" class="modal__form-add-contacts"><img src="../../assets/addcontacnt.svg" alt="Добавить контакт">Add contact</button>
      </div>
      <button type="submit" class="modal__form-submit">Save</button>
      <button @click="cancelForm(emit, true, clientStore)" type="reset" class="modal__form-reset">Cancel</button>
    </form>
  </div>
</template>

<style scoped>

</style>
