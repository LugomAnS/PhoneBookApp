import { makeAutoObservable, runInAction } from "mobx";
import { Contact, ContactDetails } from "../models/contact";
import agent from "../api/agent";

export class ProfileStore {
  contacts = new Map<string, Contact>();
  contactFilter: string | null = null;
  loadingContacts = false;
  selectedContact: ContactDetails | null = null;
  loadingDetails = false;

  constructor() {
    makeAutoObservable(this);
  }

  get contactsList () {
    return Array.from(this.contacts.values());
  }

  setContact = (contact: Contact) => {
    this.contacts.set(contact.id, contact);
  }

  loadProfile =async () => {
    this.loadingContacts = true;
    try {
      const result = await agent.Profile.getProfile();
      runInAction(() => {
        result.contacts.forEach(contact => this.setContact(contact));
      })
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => this.loadingContacts = false)
    }
  }

  loadContactDetails = async (id: string) => {
    this.loadingDetails = true;
    try {
      const details = await agent.Contacts.getContactDetails(id);
      runInAction(() => {
        this.selectedContact = details;
      })
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => this.loadingDetails = false)
    }
  }

  resetStore = () => {
    this.contacts.clear();
    this.contactFilter = null;
  }
}
