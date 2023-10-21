using Application.Categories;
using Application.Contacts;
using Application.User;
using Domain;

namespace Application.Core
{
    public class MappingProfile : AutoMapper.Profile
    {
        public MappingProfile()
        {
            CreateMap<Contact, ContactDto>()
                .ForMember(d => d.Category, o => o.MapFrom(c => c.Category.Category));

            CreateMap<AppUser, UserProfileDto>();

            CreateMap<Contact, ContactDetailsDto>()
                .ForMember(d => d.Category, o => o.MapFrom(c => c.Category.Category));

            CreateMap<Contact, Contact>();

            CreateMap<Phone, Phone>();

            CreateMap<ContactCategory, CategoryDto>();
            CreateMap<CategoryDto, ContactCategory>();
        }
    }
}
