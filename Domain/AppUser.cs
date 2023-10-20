using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string Surname{ get; set; }
        public string Name { get; set; }
        public string Patronymic { get; set; }
        public ICollection<Contact> Contacts { get; set; } = new List<Contact>();
        public ICollection<ContactCategory> Categories { get; set; }


    }
}
