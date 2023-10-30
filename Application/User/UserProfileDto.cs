using Application.Categories;
using Application.Contacts;
using Application.Photos;

namespace Application.User
{
    public class UserProfileDto
    {
        public ICollection<CategoryDto> Categories { get; set; }
        public ICollection<ContactDto> Contacts { get; set; }
        public PhotoDto Photo { get; set; }
    }
}
