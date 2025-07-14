import type {User} from '@/types/types.ts'

/* METHOD GET */
export const searchClient = async (value:string):Promise<User[] | undefined> =>{
  const opt = {
    method:'GET'
  }
  try {
    const res = await fetch(`http://localhost:3000/api/clients?search=${value}`,opt)
    if(res.ok){
      return await res.json();
    }
    return [];
  }
  catch (e){
    console.log(e)
  }
}

export const loadClients = async ():Promise<User[]|undefined>=>{
  try {
    const res = await fetch('http://localhost:3000/api/clients');
    if(res.ok){
      return await res.json();
    }
  } catch (e){
    console.log(e)
  }
}
/* END METHOD GET */
/* METHOD POST */
export const addClient = async (obj:User):Promise<void>=>{
  const opt = {
    method:'POST',
    body: JSON.stringify(obj),
    headers:{'Content-Type':'application/json'}
  }
  try {
    await fetch('http://localhost:3000/api/clients',opt);
  } catch (e){
    console.log(e)
  }
}
/* END METHOD POST */
/* METHOD PATCH */
export const updateClient = async (obj:User,id:string):Promise<void>=>{
  const opt = {
    method:'PATCH',
    body: JSON.stringify(obj),
    headers:{'Content-Type':'application/json'}
  }
  try {
    await fetch(`http://localhost:3000/api/clients/${id}`,opt)
  }catch (e){
    console.log(e)
  }
}
/* END METHOD PATCH */
/* METHOD DELETE */
export const deleteClient = async (id:string):Promise<void>=>{
  const opt = {
    method:'DELETE'
  }
  try {
    const res = await fetch(`http://localhost:3000/api/clients/${id}`,opt);
    if(res.ok){
      console.log('OK')
    }
  } catch (e){
    console.log(e)
  }
}
/* END METHOD DELETE */
