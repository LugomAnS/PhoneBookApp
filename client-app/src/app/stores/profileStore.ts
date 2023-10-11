import { makeAutoObservable, runInAction } from "mobx";
import { Contact, ContactDetails, ContactFormValues } from "../models/contact";
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

  createContact = async (contact: ContactFormValues) => {
    try {
      await agent.Contacts.createContact(contact);
      const newContact: Contact ={
        id: contact.id!,
        surname: contact.surname,
        name: contact.name!,
        patronymic: contact.patronymic!
      }
      this.setContact(newContact);
    } catch (error) {
      console.log(error);
    }
  }

  updateContact = async (contact: ContactFormValues) => {
    try {
      await agent.Contacts.editContact(contact);
      this.loadContactDetails(contact.id!);
      this.setContact(this.selectedContact!);
    } catch (error) {
      console.log(error);
    }
  }

  deleteContact = async () => {
    try {
      await agent.Contacts.deleteContact(this.selectedContact!.id);
      runInAction(() => {
        const id = this.selectedContact!.id;
        this.selectedContact = null;
        this.contacts.delete(id);
      })
    } catch (error) {
      console.log(error);
      throw(error);
    }
  }

  resetStore = () => {
    this.contacts.clear();
    this.contactFilter = null;
  }
}
