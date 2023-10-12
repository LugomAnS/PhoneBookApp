export interface Contact {
  id: string;
  surname: string;
  name: string;
  patronymic: string;
  category?: string;
}

export class ContactFormValues {
  id?: string;
  surname: string = '';
  name: string | null = null;
  patronymic: string | null = null;
  category: string| null = null;
  description: string | null = null;
  contactAddress: ContactAddress | null = null;
  phones: Phone[] | null = null;

  constructor(contact?: ContactDetails) {
    if(contact) {
      this.id = contact.id;
      this.surname = contact.surname;
      this.name = contact.name;
      this.patronymic = contact.patronymic;
      this.category = contact.category;
      this.description = contact.description;
      this.contactAddress = contact.contactAddress;
      this.phones = contact.phones;
    }
  }
}

export interface ContactAddress {
  id: string;
  city: string;
  venue: string;
  house: string;
  flat: string;
}

export class Phone {
  id?: string;
  phoneNumber: string = '';
  type: string = '';
}

export interface ContactDetails {
  id: string;
  surname: string;
  name: string;
  patronymic: string;
  category: string;
  description: string;
  contactAddress: ContactAddress | null;
  phones: Phone[] | null;
}
