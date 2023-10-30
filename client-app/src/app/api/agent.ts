import axios, {AxiosError, AxiosResponse} from "axios";
import { User, UserForm } from "../models/user";
import { store } from "../stores/store";
import { ServerErrorMessage } from "../models/errorMessage";
import { UserProfile } from "../models/userProfile";
import { ContactDetails, ContactFormValues, Phone } from "../models/contact";
import { ContactCategory } from "../models/contactCategory";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use(config => {
  const token = store.commonStore.token;
  if(token)
    config.headers.Authorization = `Bearer ${token}`;

  return config;
})

axios.interceptors.response.use(async responce => {
  await sleep(1000);
  return responce;
}, (error: AxiosError) =>{
  const { data, status, config} = error.response as AxiosResponse;
  if(config.method === 'get' && Object.prototype.hasOwnProperty.call(data.errors, 'id')) {
    alert('/not-found');
  }
  const stateErrors: ServerErrorMessage[] = [];
  switch (status) {
    case 400:
      if(data.errors) {
        for(const key in data.errors) {
          const error: ServerErrorMessage = {
            field: key,
            message: data.errors[key]
          }
          stateErrors.push(error);
        }
      } else {
        for(const key in data) {
          const {code, description} = data[key];
          const error: ServerErrorMessage = {
            field: code,
            message: description
          }
          stateErrors.push(error);
        }
      }
      if(stateErrors.length > 0) {
        throw stateErrors;
      }
      break;
    default:
      break;
  }

  return Promise.reject(error);
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: object) => axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: object) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const Account = {
  login: (user: UserForm) => request.post<User>('/account/login', user),
  registry: (user: UserForm) => request.post<User>('/account/registry', user),
  getCurrent: () => request.get<User>('/account')
}

const Profile = {
  getProfile: () => request.get<UserProfile>('/profile'),
}

const Contacts = {
  getContactDetails: (id: string) => request.get<ContactDetails>(`/contacts/${id}`),
  createContact: (contact: ContactFormValues) => request.post<void>('/contacts/create', contact),
  editContact: (contact: ContactFormValues) => request.put<void>(`/contacts/${contact.id}`, contact),
  deleteContact: (id: string) => request.del<void>(`/contacts/${id}`)
}

const Phones = {
  createPhone: (id: string, phone: Phone) => request.post<void>(`/phones/${id}`, phone),
  updatePhone: (phone: Phone) => request.put<void>(`/phones/edit`, phone),
  deletePhone: (id: string) => request.del<void>(`/phones/${id}`)
}

const Categories = {
  createCategory: (category: ContactCategory) => request.post<void>('/contactcategory', category),
  updateCategory: (category: ContactCategory) => request.put<void>('/contactcategory', category),
  deleteCategory: (id: string) => request.del<void>(`/contactcategory/${id}`)
}

const Photos = {
  uploadUserPhoto: (file: Blob) => {
    const formData = new FormData();
    formData.append('File', file);
    return axios.post<void>('/photo/user', formData, {
      headers: {'Content-Type': 'multipart/form-data'}
    })
  },
  deleteUserPhoto: () => request.del<void>('/photo/user'),
}

const agent = {
  Account,
  Profile,
  Contacts,
  Phones,
  Categories,
  Photos
}

export default agent;
