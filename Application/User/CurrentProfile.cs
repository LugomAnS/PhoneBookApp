using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.User
{
    public class CurrentProfile
    {
        public class Query : IRequest<Result<UserProfileDto>>
        {
            public string Email { get; set; }

        }

        public class Handler : IRequestHandler<Query, Result<UserProfileDto>>
        {
            private readonly IMapper _mapper;
            private readonly UserManager<AppUser> _userManager;

            public Handler(IMapper mapper, UserManager<AppUser> userManager)
            {
                _mapper = mapper;
                _userManager = userManager;
            }
            public async Task<Result<UserProfileDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var profile = await _userManager.Users
                    .Where(u => u.Email == request.Email)
                    .ProjectTo<UserProfileDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(CancellationToken.None);

                return profile == null ? null : Result<UserProfileDto>.Success(profile);
            }
        }
    }
}
