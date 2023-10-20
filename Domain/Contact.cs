namespace Domain
{
    public class Contact
    {
        public Guid Id { get; set; }
        public string Surname { get; set; }
        public string Name { get; set; }
        public string Patronymic { get; set; }
        public Guid? CategoryId { get; set; }
        public ContactCategory Category { get; set; } = null;
        public string Description { get; set; }
        public Address ContactAddress { get; set; }
        public ICollection<Phone> Phones { get; set; }

        public AppUser Owner { get; set; }
    }
}
