import { createContext, useContext } from "react";
import UserStore from "./userStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import { ProfileStore } from "./profileStore";

interface Store {
  userStore: UserStore;
  commonStore: CommonStore;
  modalStore: ModalStore;
  profileStore: ProfileStore;
}

export const store: Store = {
  userStore: new UserStore(),
  commonStore: new CommonStore(),
  modalStore: new ModalStore(),
  profileStore: new ProfileStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
