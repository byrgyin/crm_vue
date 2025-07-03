export interface HeadInfo {
  typeButton?:string,
  title:string
}
export interface Contact {
  type: string
  value: string
}
export interface User{
  id?: string,
  name: string,
  surname: string,
  lastName: string,
  contacts?: Contact[],
  updatedAt?: string,
  createdAt?: string,
}

export interface CommonEmits {
  (e:'cancel:closeForm'):void;
  (e:'submit:submitForm'):void;
}
