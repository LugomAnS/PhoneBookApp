export interface User {
  token: string;
  username: string;
  surname: string;
  name: string;
  patronymic: string;
  image?: Blob;
  imageUrl: string;
}

export interface UserForm {
  email: string;
  password: string;
  username?: string;
  surname?: string;
  name?: string;
  patronymic?: string;
}
