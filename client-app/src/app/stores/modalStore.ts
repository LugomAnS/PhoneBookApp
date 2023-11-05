import { makeAutoObservable } from "mobx";

export default class ModalStore {
  isOpen: boolean = false;
  body: JSX.Element | null = null;
  modalSize: 'mini' | 'tiny' | 'small' | 'large' | 'fullscreen' = 'mini';

  constructor() {
    makeAutoObservable(this);
  }

  openModal = (body: JSX.Element, size: 'mini' | 'tiny' | 'small' | 'large' | 'fullscreen' = 'mini') => {
    this.modalSize = size;
    this.isOpen = true;
    this.body = body;
  }

  closeModal = () => {
    this.isOpen = false;
    this.body = null;
  }
}
