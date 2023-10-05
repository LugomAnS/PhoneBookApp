import { makeAutoObservable, reaction } from "mobx";

export default class CommonStore {
  token: string | null | undefined = localStorage.getItem('phonebook-jwt');
  appLoaded = false;

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
  }

  setToken = (token: string | null) => {
    this.token = token;
  }

  setAppLoaded = () => {
    this.appLoaded = true;
  }
}
