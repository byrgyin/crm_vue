<script setup lang="ts">
import {ref,watch} from 'vue';
import type {CommonEmits, Contact} from "@/types/types.ts";
import LabelInput from '@/components/formComponents/LabelInput.vue';
import ContactInfo from "@/components/formComponents/ContactInfo.vue";
import {updateClient} from "@/api/apiClients.ts";
import {useClientStore} from "@/stores/useStoreClient.ts";

const props = defineProps<{
  show:boolean
}>();
const emit = defineEmits<CommonEmits>();
const clientStore = useClientStore();

const count = ref<number>(0);
const id = ref<string>('');
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
const decrementArrayOnIndex = (contact: Contact & { index: number }):void=>{
  contactsArr.value = contactsArr.value.filter((item,index)=> index !== contact.index);
}
const cancelForm = ():void=>{
  clientStore.showEditForm = false
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
  console.log(obj)
  updateClient(obj,id.value);
  clearArg();
  cancelForm();
  emit('submit:submitForm');
};
const update = ():void=>{
  const user = clientStore.editUserCard;
  id.value = user?.id;
  surname.value = user?.surname;
  name.value = user?.name;
  lastname.value = user?.lastName;
  contactsArr.value = user?.contacts;
}

watch(()=>clientStore.showEditForm, (newValue,oldValue) => {
  if(newValue){
    update()
  }
},{deep:true});
</script>

<template>
  <div v-if="show" class="modal modal-changedata">
    <form action="#" @submit.prevent="submitForm" class="modal__form modal__form--change">
      <button @click="cancelForm" class="modal__close" type="button"></button>
      <div class="modal__form-title">Изменить данные: <span class="modal__form-title-span">{{id}}</span></div>
      <LabelInput v-model:input-value="surname" id="surname" title="Фамилия" type="text" placeholder="Фамилия" :required="true" />
      <LabelInput v-model:input-value="name" id="name" title="Имя" type="text" placeholder="Имя" :required="true" />
      <LabelInput v-model:input-value="lastname" id="lastName" title="Отчество" type="text" placeholder="Отчество" :required="false" />
      <div class="modal__form-contacts">
        <ul class="form-contacts__list" v-show="contactsArr.length !== 0">
          <ContactInfo
          v-for="(item, index) in contactsArr"
          :key="index"
          :index="index"
          :contact="item"
          @cancel:removeInfoItem="decrementCount"
          @update:contact="updateContact"
          @removeOnIndex:editInfo="decrementArrayOnIndex"/>
        </ul>
        <button @click="incrementCount" v-show="count <= 9" class="modal__form-add-contacts"><img src="../../assets/addcontacnt.svg" alt="Добавить контакт">Добавить контакнт</button>
      </div>
      <button type="submit" class="modal__form-submit">Сохранить</button>
      <button @click="cancelForm" type="reset" class="modal__form-reset">Отмена</button>
    </form>
  </div>
</template>

<style scoped>

</style>
