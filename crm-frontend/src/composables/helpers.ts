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

