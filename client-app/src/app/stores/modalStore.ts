import { makeAutoObservable } from "mobx";

export default class ModalStore {
  isOpen: boolean = false;
  body: JSX.Element | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  openModal = (body: JSX.Element) => {
    this.isOpen = true;
    this.body = body;
  }

  closeModal = () => {
    this.isOpen = false;
    this.body = null;
  }
}
