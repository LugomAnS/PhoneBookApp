import { makeAutoObservable, reaction } from "mobx";
import { ServerErrorMessage } from "../models/errorMessage";
import { toast } from "react-toastify";

export default class CommonStore {
  token: string | null | undefined = localStorage.getItem('phonebook-jwt');
  appLoaded = false;
  errors: ServerErrorMessage[] | null = null;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.token,
      token => {
        if (token) {
          localStorage.setItem('phonebook-jwt', token);
        } else {
          localStorage.removeItem('phonebook-jwt');
        }
      });

    reaction(
      () => this.errors,
      errors => {
        if(errors) {
          errors.forEach(e => toast.error(e.message.toString()));
        }
      }
    )
  }

  setToken = (token: string | null) => {
    this.token = token;
  }

  setAppLoaded = () => {
    this.appLoaded = true;
  }

  setServerErrors = (value: ServerErrorMessage[] | null) => {
    if(value) {
      this.errors = value.filter( e => e.field === "ServerError");
    } else {
      this.errors = null;
    }
  }
}
