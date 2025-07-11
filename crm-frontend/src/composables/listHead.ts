import type {HeadInfo} from '@/types/types.ts'

const listHead: HeadInfo[] = [
  { typeButton: 'id', title: 'ID' },
  { typeButton: 'fio', title: 'Фамилия Имя Отчество' },
  { typeButton: 'date', title: 'Дата и время создания' },
  { typeButton: 'last_modify', title: 'Последние изменения' },
  { title: 'Контакты' },
  { title: 'Действия' },
]

export default listHead;
