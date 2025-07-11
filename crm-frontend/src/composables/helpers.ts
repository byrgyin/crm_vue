import type {User} from "@/types/types.ts";

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

