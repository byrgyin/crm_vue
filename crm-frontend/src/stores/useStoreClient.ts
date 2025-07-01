import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import type {User} from '@/types/types.ts'

export const useClientStore = defineStore('client',()=>{
  const clients = ref<User[]>([]);
  return{
    clients
  }
});
