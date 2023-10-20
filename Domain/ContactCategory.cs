namespace Domain
{
    public class ContactCategory
    {
        public Guid Id { get; set; }
        public string Category { get; set; }
        public AppUser CategoryOwner { get; set; }
        public ICollection<Contact> Contacts { get; set; }
    }
}
