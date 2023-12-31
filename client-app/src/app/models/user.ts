export interface User {
  token: string;
  username: string;
  surname: string;
  name: string;
  patronymic: string;
  image?: string;
}

export interface UserForm {
  email: string;
  password: string;
  username?: string;
  surname?: string;
  name?: string;
  patronymic?: string;
}

export interface UserEditForm {
  surname: string;
  name: string;
  patronymic: string;
}
