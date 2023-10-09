using Domain;

namespace Application.Contacts
{
    internal static class ContactCleaner
    {
        public static Contact CleanContact(Contact contact)
        {
            if (string.IsNullOrWhiteSpace(contact.Name))
                contact.Name = null;

            if (string.IsNullOrWhiteSpace(contact.Patronymic))
                contact.Name = null;

            if (string.IsNullOrWhiteSpace(contact.Description))
                contact.Description = null;

            return contact;
        }
    }
}
