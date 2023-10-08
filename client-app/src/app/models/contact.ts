export interface Contact {
  id: string;
  surname: string;
  name: string;
  patronymic: string;
  category: string;
}

export interface ContactAddress {
  id: string;
  city: string;
  venue: string;
  house: string;
  flat: string;
}

export interface Phone {
  id: string;
  phoneNumber: string;
  type: string;
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
