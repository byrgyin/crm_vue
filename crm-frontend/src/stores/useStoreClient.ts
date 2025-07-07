import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import type {User} from '@/types/types.ts'

export const useClientStore = defineStore('client',()=>{
  const clients = ref<User[]>([]);
  const editUserCard = ref<User>();
  const idBTN = ref<string>('');
  const showDeleteForm = ref<boolean>(false);
  const showEditForm = ref<boolean>(false);
  // const addClient = (arr: User) => {
  //   clients.value = arr;
  //   return clients.value;
  // };
  return{
    clients,
    idBTN,
    showDeleteForm,
    showEditForm,
    editUserCard
  }
});
