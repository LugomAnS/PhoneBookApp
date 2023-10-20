import { Contact } from "./contact";
import { ContactCategory } from "./contactCategory";

export interface UserProfile {
  categories: ContactCategory[];
  contacts: Contact[];
}
