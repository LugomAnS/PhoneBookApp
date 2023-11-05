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
            CreateMap<UserPhoto, PhotoDto>();
            CreateMap<ContactPhoto, PhotoDto>();

            CreateMap<Contact, ContactDto>()
                .ForMember(d => d.Category, o => o.MapFrom(s => s.Category.Category))
                .ForMember(d => d.Photo, o => o.MapFrom(s => s.Photo));

            CreateMap<AppUser, UserProfileDto>()
                .ForMember(d => d.Photo, o => o.MapFrom(s => s.UserPhoto));

            CreateMap<Contact, ContactDetailsDto>()
                .ForMember(d => d.Category, o => o.MapFrom(s => s.Category.Category))
                .ForMember(d => d.Photo, o => o.MapFrom(s => s.Photo));

            CreateMap<Contact, Contact>();

            CreateMap<Phone, Phone>();

            CreateMap<UserEditDto, AppUser>()
                .ForMember(d => d.Surname, o => o.MapFrom(s => s.Surname))
                .ForMember(d => d.Name, o => o.MapFrom(s => s.Name))
                .ForMember(d => d.Patronymic, o => o.MapFrom(s => s.Patronymic));

            CreateMap<ContactCategory, CategoryDto>();
            CreateMap<CategoryDto, ContactCategory>();
        }
    }
}
