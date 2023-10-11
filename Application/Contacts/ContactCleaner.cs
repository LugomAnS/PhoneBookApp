using Domain;

namespace Application.Contacts
{
    internal static class ContactCleaner
    {

        public static Contact CleanAllFields(this Contact contact)
        {
            return CleanAddress(CleanDescription(CleanContact(contact)));
        }

        public static Contact CleanContact(Contact contact)
        {
            if (string.IsNullOrWhiteSpace(contact.Name))
                contact.Name = null;

            if (string.IsNullOrWhiteSpace(contact.Patronymic))
                contact.Patronymic = null;

            if (string.IsNullOrWhiteSpace(contact.Description))
                contact.Description = null;

            return contact;
        }

        public static Contact CleanDescription(Contact contact)
        {
            if (string.IsNullOrWhiteSpace(contact.Description))
                contact.Description = null;

            return contact;
        }

        public static Contact CleanAddress(Contact contact)
        {
            if (contact.ContactAddress == null)
                return contact;

            if (string.IsNullOrWhiteSpace(contact.ContactAddress.City))
                contact.ContactAddress.City = null;

            if (string.IsNullOrWhiteSpace(contact.ContactAddress.Venue))
                contact.ContactAddress.Venue = null;

            if (string.IsNullOrWhiteSpace(contact.ContactAddress.House))
                contact.ContactAddress.House = null;

            if (string.IsNullOrWhiteSpace(contact.ContactAddress.Flat))
                contact.ContactAddress.Flat = null;

            if (contact.ContactAddress.City == null &&
                contact.ContactAddress.Venue == null &&
                contact.ContactAddress.House == null &&
                contact.ContactAddress.Flat == null)
                contact.ContactAddress = null;

            return contact;
        }
    }
}
