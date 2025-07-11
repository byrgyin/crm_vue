import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import type {User} from '@/types/types.ts'
import { loadClients } from '@/api/apiClients.ts'
import {sortDateCreate, sortFIO, sortID, sortLastModify} from "@/composables/helpers.ts";

export const useClientStore = defineStore('client',()=>{
  const clients = ref<User[]>([]);
  const resultSearchClients = ref<User[]>([]);


  const editUserCard = ref<User>();
  const idBTN = ref<string>('');
  const showDeleteForm = ref<boolean>(false);
  const showEditForm = ref<boolean>(false);

  const loadUsers = async () => {
    const data = await loadClients();
    clients.value = data || [];
  };

  const sortType = ref<'id' | 'fio' | 'date' | 'last_modify' | ''>('');
  const activeClass = ref<boolean>(false);

  const sortedArray = computed(() => {
    if(sortType.value){
      console.log(sortType.value);
      switch (sortType.value) {
        case "id":
          return sortID(clients.value,activeClass.value)
        break;
        case 'fio':
          return sortFIO(clients.value,activeClass.value)
        break;
        case "date":
          return sortDateCreate(clients.value,activeClass.value)
        break;
        case "last_modify":
          return sortLastModify(clients.value,activeClass.value)
          break;
        default:
          return clients.value;
      }
    }
  });

  return{
    clients,
    idBTN,
    showDeleteForm,
    showEditForm,
    editUserCard,
    resultSearchClients,
    sortType,
    sortedArray,
    activeClass,
    loadUsers
  }
});
