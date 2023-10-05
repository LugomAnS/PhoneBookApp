import axios, {AxiosError, AxiosResponse} from "axios";
import { User, UserForm } from "../models/user";
import { store } from "../stores/store";
import { ServerErrorMessage } from "../models/errorMesage";

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
  sleep(1000);
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

const agent = {
  Account
}

export default agent;
