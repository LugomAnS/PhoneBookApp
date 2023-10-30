using Application.Categories;
using Application.Photos;
using Domain;

namespace Application.Contacts
{
    public class ContactDetailsDto
    {
        public Guid Id { get; set; }
        public string Surname { get; set; }
        public string Name { get; set; }
        public string Patronymic { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public Address ContactAddress { get; set; }
        public ICollection<Phone> Phones { get; set; }
        public PhotoDto Photo { get; set; }

    }
}
