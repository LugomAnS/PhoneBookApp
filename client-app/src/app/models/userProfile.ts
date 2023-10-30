import { Contact } from "./contact";
import { ContactCategory } from "./contactCategory";
import { Photo } from "./photo";

export interface UserProfile {
  photo: Photo;
  categories: ContactCategory[];
  contacts: Contact[];
}
