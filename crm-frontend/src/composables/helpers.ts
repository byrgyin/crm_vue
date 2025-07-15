import type {Contact, User, CommonEmits} from "@/types/types.ts";
import {ref} from "vue";
import type { Ref } from 'vue';
import type { useClientStore } from '@/stores/useStoreClient.ts';

/* type date function */

export const parseYear = (str:string):string=>{
  const date: Date = new Date(str);
  let day:number | string = date.getDate();
  let month:number | string = date.getMonth() + 1;
  const year:number | string = date.getFullYear();
  if(month < 10){
    month = `0${month}`
  }
  if(day < 10){
    day = `0${day}`
  }
  return(`${day}.${month}.${year}`)
}

export const parseHours = (str:string):string=>{
  const date:Date = new Date(str);
  let hours: number | string = date.getHours();
  let minutes: number | string = date.getMinutes();
  if(hours < 10){
    hours = `0${hours}`
  }
  if(minutes < 10){
    minutes = `0${minutes}`
  }
  return (`${hours}:${minutes}`);
}
/* END type date function */

/*sort function*/
export const sortFIO = (array:User[], activeClass:boolean):User[] => {
  return [...array].sort((a, b) =>
    activeClass ? b.surname.localeCompare(a.surname) : a.surname.localeCompare(b.surname)
  );
}

export const sortID = (array:User[], activeClass:boolean):User[]=>{
  return [...array].sort((a, b) =>
    activeClass
      ? (b.id || '').localeCompare(a.id || '')
      : (a.id || '').localeCompare(b.id || '')
  );
}

export const sortDateCreate = (array:User[], activeClass:boolean):User[]=>{
  return [...array].sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return activeClass ? dateB - dateA : dateA - dateB;
  });

}

export const sortLastModify = (array:User[], activeClass:boolean):User[] =>{
  return [...array].sort((a, b) => {
    const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
    const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
    return activeClass ? dateB - dateA : dateA - dateB;
  });
}

/*END sort function*/

/* reusable functions for modal form */
interface ClientForm {
  client: Ref<User>;
  count: Ref<number>;
  incrementCount: () => void;
  decrementCount: () => void;
  decrementArrayOnIndex: (contact: Contact & { index: number }) => void;
  cancelForm: (emit: CommonEmits, isEditForm?: boolean, store?: ReturnType<typeof useClientStore>) => void;
  updateContact: (contact: Contact & { index: number }) => void;
  clearArg: () => void;
}

export const useClientForm = (initialCLient: User = { surname: '', name: '', lastName: '', contacts: [] }):ClientForm =>{
  const client = ref<User>(initialCLient);
  const count = ref<number>(0);

  const clearArg = (): void => {
    client.value.surname = '';
    client.value.name = '';
    client.value.lastName = '';
    client.value.contacts = [];
    count.value = 0;
  };

  const incrementCount = (): void => {
    if (count.value <= 9) {
      count.value++;
      client.value.contacts?.push({ type: '', value: '' });
    }
  };

  const decrementCount = ():void=>{
    count.value--;
    client.value.contacts?.pop();
  }
  const decrementArrayOnIndex = (contact: Contact & { index: number }): void => {
    if (client.value.contacts) {
      client.value.contacts = client.value.contacts.filter((_, index) => index !== contact.index);
    }
  };
  const updateContact = (contact: Contact & { index: number }): void => {
    if (client.value.contacts) {
      client.value.contacts[contact.index] = { type: contact.type, value: contact.value };
    }
  };
  const cancelForm = (emit: CommonEmits, isEditForm = false, store?: ReturnType<typeof useClientStore>): void => {
    if (isEditForm && store) {
      store.showEditForm = false;
    } else {
      emit('cancel:closeForm');
    }
    clearArg();
  };

  return {
    client,
    count,
    incrementCount,
    decrementCount,
    decrementArrayOnIndex,
    cancelForm,
    updateContact,
    clearArg,
  }
}
/* END reusable functions for modal form */
