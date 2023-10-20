using Application.Categories;
using Application.Contacts;

namespace Application.User
{
    public class UserProfileDto
    {
        public ICollection<CategoryDto> Categories { get; set; }

        public ICollection<ContactDto> Contacts { get; set; }
    }
}
