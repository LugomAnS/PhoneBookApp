import { makeAutoObservable, runInAction } from "mobx";
import { User, UserEditForm, UserForm } from "../models/user";
import agent from "../api/agent";
import { store } from "./store";
import { router } from "../router/router";

export default class UserStore {
  user: User | null = null;
  loading = false;
  photoUploading = false;
  userEditLoading = false;

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
      store.modalStore.closeModal();
      router.navigate('contacts');
    } catch (error) {
      console.log(error);
      throw(error);
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
      store.modalStore.closeModal();
      router.navigate('contacts');
    } catch (error) {
      console.log(error);
      throw(error);
    } finally {
      runInAction(() => this.loading = false);
    }
  }

  logout = () => {
    this.user = null;
    store.commonStore.setToken(null);
    store.profileStore.resetStore();
    router.navigate('/');
  }

  uploadPhoto = async (file: Blob) => {
    this.photoUploading = true;
    try {
      await agent.Photos.uploadUserPhoto(file);
      runInAction(() => this.user!.image = URL.createObjectURL(file));
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => this.photoUploading = false);
    }
  }

  deletePhoto = async () => {
    this.photoUploading = true;
    try {
      await agent.Photos.deleteUserPhoto();
      runInAction(() => this.user!.image = undefined);
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => this.photoUploading = false);
    }
  }

  updateUser = async (user: UserEditForm) => {
    this.userEditLoading = true;
    try {
      await agent.UserEdit.updateUser(user);
      runInAction(() => {
        this.user!.surname = user.surname;
        this.user!.name = user.name;
        this.user!.patronymic = user.patronymic;
      })
    } catch (error) {
      console.log(error);
      throw(error);
    } finally {
      runInAction(() => this.userEditLoading = false)
    }
  }
}
