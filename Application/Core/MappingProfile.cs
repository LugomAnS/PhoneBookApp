using Application.Categories;
using Application.Contacts;
using Application.Photos;
using Application.User;
using Domain;

namespace Application.Core
{
    public class MappingProfile : AutoMapper.Profile
    {
        public MappingProfile()
        {
            CreateMap<Contact, ContactDto>()
                .ForMember(d => d.Category, o => o.MapFrom(c => c.Category.Category))
                .ForMember(d => d.Image, s => s.MapFrom(o => o.Photo.Image));

            CreateMap<UserPhoto, PhotoDto>();

            CreateMap<AppUser, UserProfileDto>()
                .ForMember(d => d.Photo, o => o.MapFrom(s => s.UserPhoto));

            CreateMap<Contact, ContactDetailsDto>()
                .ForMember(d => d.Category, o => o.MapFrom(c => c.Category.Category))
                .ForMember(d => d.Image, s => s.MapFrom(o => o.Photo.Image)); 

            

            CreateMap<Contact, Contact>();

            CreateMap<Phone, Phone>();

            CreateMap<ContactCategory, CategoryDto>();
            CreateMap<CategoryDto, ContactCategory>();
        }
    }
}
