import { makeAutoObservable, runInAction } from "mobx";
import { User, UserForm } from "../models/user";
import agent from "../api/agent";
import { store } from "./store";

export default class UserStore {
  user: User | null = null;
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get displayName() {
    if(this.user)
      return this.user.surname +' '+ this.user.name +' '+ this.user.patronymic;
  }

  get isLogedIn() {
    return !!this.user;
  }

  login = async (params: UserForm) => {
    this.loading = true;
    try {
      const result = await agent.Account.login(params);
      store.commonStore.setToken(result.token);
      runInAction(() => this.user = result);
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => this.loading = false);
    }
  }

  loginCurrentUser = async () => {
    this.loading = true;
    try {
      const result = await agent.Account.getCurrent();
      runInAction(() => this.user = result);
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => this.loading = false);
    }
  }

  registry = async (params: UserForm) => {
    this.loading = true;
    try {
      const result = await agent.Account.registry(params);
      store.commonStore.setToken(result.token);
      runInAction(() => this.user = result);
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => this.loading = false);
    }
  }

  logout = () => {
    this.user = null;
    store.commonStore.setToken(null);
  }
}
