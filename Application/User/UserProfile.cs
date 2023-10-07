using Application.Contacts;
using Domain;

namespace Application.User
{
    public class UserProfile
    {
        public ICollection<ContactDto> Contacts { get; set; }
    }
}
