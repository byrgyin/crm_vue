import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import type {User} from '@/types/types.ts'

export const useClientStore = defineStore('client',()=>{
  const clients = ref<User[]>([]);
  const resultSearchClients = ref<User[]>([]);
  const editUserCard = ref<User>();
  const idBTN = ref<string>('');
  const showDeleteForm = ref<boolean>(false);
  const showEditForm = ref<boolean>(false);

  const sortArray = computed(() => {
    clients.value.sort((a,b)=>{
      if(a.surname < b.surname) {
        return -1
      }
      if(a.surname > b.surname) {
        return 1;
      }
      return 0;
    })
  });

  return{
    clients,
    idBTN,
    showDeleteForm,
    showEditForm,
    editUserCard,
    resultSearchClients,
    sortArray
  }
});
