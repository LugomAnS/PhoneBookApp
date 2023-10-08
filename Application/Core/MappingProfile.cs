using Application.Contacts;
using Application.User;
using Domain;

namespace Application.Core
{
    public class MappingProfile : AutoMapper.Profile
    {
        public MappingProfile()
        {
            CreateMap<Contact, ContactDto>();

            CreateMap<AppUser, UserProfileDto>();

            CreateMap<Contact, ContactDetailsDto>();
        }
    }
}
