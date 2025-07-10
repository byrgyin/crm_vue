import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import type {User} from '@/types/types.ts'

export const useClientStore = defineStore('client',()=>{
  const clients = ref<User[]>([]);
  const resultSearchClients = ref<User[]>([]);
  const helpArr = ref<User[]>([]);
  const editUserCard = ref<User>();
  const idBTN = ref<string>('');
  const showDeleteForm = ref<boolean>(false);
  const showEditForm = ref<boolean>(false);

  const sortType = ref<'id' | 'fio' | 'date' | 'last_modify' | ''>('');
  const sortedArray = computed(() => {
    console.log(helpArr.value)
    switch (sortType.value) {
      case 'fio':
        return helpArr.value.sort((a, b) => {
          if (a.surname < b.surname) {
            return -1;
          }
          if (a.surname > b.surname) {
            return 1;
          }
          return 0;
        })
    }
  });
/*clientStore.sortedArray*/
/*clientsSortFIO*/
  return{
    clients,
    idBTN,
    showDeleteForm,
    showEditForm,
    editUserCard,
    resultSearchClients,
    sortType,
    helpArr,
    sortedArray
  }
});
