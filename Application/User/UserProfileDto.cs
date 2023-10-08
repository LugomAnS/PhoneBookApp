using Application.Contacts;

namespace Application.User
{
    public class UserProfileDto
    {
        public ICollection<ContactDto> Contacts { get; set; }
    }
}
