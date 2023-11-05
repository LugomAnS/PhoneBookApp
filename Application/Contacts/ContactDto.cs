using Application.Photos;

namespace Application.Contacts
{
    public class ContactDto
    {
        public Guid Id { get; set; }
        public string Surname { get; set; }
        public string Name { get; set; }
        public string Patronymic { get; set; }
        public string Category { get; set; }
        public PhotoDto Photo { get; set; }

    }
}
