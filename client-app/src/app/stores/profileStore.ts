import { makeAutoObservable, runInAction } from "mobx";
import { Contact, ContactDetails, ContactFormValues, Phone } from "../models/contact";
import agent from "../api/agent";
import { v4 as uuid} from 'uuid';
import { ContactCategory } from "../models/contactCategory";
import { router } from "../router/router";

export class ProfileStore {
  contacts = new Map<string, Contact>();
  categories = new Map<string, ContactCategory>();
  contactFilter: string | null = null;
  loadingContacts = false;
  selectedContact: ContactDetails | null = null;
  loadingDetails = false;
  loadingPhone = false;
  addingPhone = false;

  constructor() {
    makeAutoObservable(this);
  }

  get contactsList () {
    return Array.from(this.contacts.values());
  }

  getFullName = (contact: Contact) => {
    return (contact.surname + " " + contact.name + " " + contact.patronymic).toLowerCase();
  }

  get filteredList () {
    return Array.from(this.contacts.values()).filter(contact => {
      const fullName = this.getFullName(contact);
      return fullName.includes((this.contactFilter ? this.contactFilter : "").toLowerCase());
    })
  }

  get contactsCategoryOptions () {
    const options: {text: string, value: string} [] = [];
    this.categories.forEach(category => {
      options.push({text: category.category, value: category.category})
    })

    return options;
  }

  setContactFilter = (value: string | null) => {
    this.contactFilter = value;
  }

  setContact = (contact: Contact) => {
    this.contacts.set(contact.id, contact);
  }

  setContactCategory = (category: ContactCategory) => {
    this.categories.set(category.id!, category);
  }

  setContactFromDetails = (contact: ContactDetails) => {
    const listItem = this.contacts.get(contact.id);
    if(listItem) {
      listItem.name = contact.name;
      listItem.surname = contact.surname;
      listItem.patronymic = contact.patronymic;
      listItem.category = contact.category;

      this.contacts.set(listItem.id, listItem);
    }
  }

  setSelectedContact = (value: ContactDetails | null) => {
    this.selectedContact = value;
  }

  setAddingPhone = (prop: boolean) => {
    this.addingPhone = prop;
  }

  loadProfile =async () => {
    this.loadingContacts = true;
    try {
      const result = await agent.Profile.getProfile();
      runInAction(() => {
        result.contacts.forEach(contact => this.setContact(contact));
        result.categories.forEach(category => this.setContactCategory(category));
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
        patronymic: contact.patronymic!,
        category: contact.category?.category
      }
      this.setContact(newContact);
    } catch (error) {
      console.log(error);
    }
  }

  updateContact = async (contact: ContactFormValues) => {
    try {
      await agent.Contacts.editContact(contact);
      await this.loadContactDetails(contact.id!);
      this.setContact(this.selectedContact!);
    } catch (error) {
      console.log(error);
    }
  }

  deleteContact = async () => {
    try {
      await agent.Contacts.deleteContact(this.selectedContact!.id);
      router.navigate('/contacts');
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

  createPhone = async (phone: Phone) => {
    this.loadingPhone = true;
    try {
      phone.id = uuid();
      await agent.Phones.createPhone(this.selectedContact!.id, phone)
      runInAction(() => {
        if(this.selectedContact?.phones === null) {
          this.selectedContact.phones = []
        }
        this.selectedContact?.phones.push(phone);
      })
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.loadingPhone = false;
      })
    }
  }

  updatePhone =async (phone: Phone) => {
    this.loadingPhone = true;
    try {
      await agent.Phones.updatePhone(phone);
      runInAction(() => {
        if(this.selectedContact && this.selectedContact.phones) {
          const index = this.selectedContact.phones.findIndex(e => e.id === phone.id);
          this.selectedContact.phones[index] = phone;
        }
      })
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => this.loadingPhone = false)
    }
  }

  deletePhone = async (id: string) => {
    this.loadingPhone = true;
    try {
      await agent.Phones.deletePhone(id);
      runInAction(() => {
        this.selectedContact!.phones = this.selectedContact!.phones!.filter(p => p.id !== id);
      })
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => this.loadingPhone = false)
    }
  }

  resetStore = () => {
    this.contacts.clear();
    this.contactFilter = null;
  }
}
