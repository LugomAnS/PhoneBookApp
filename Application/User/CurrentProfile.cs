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
        public class Query : IRequest<Result<UserProfile>>
        {
            public string Email { get; set; }

        }

        public class Handler : IRequestHandler<Query, Result<UserProfile>>
        {
            private readonly IMapper _mapper;
            private readonly UserManager<AppUser> _userManager;

            public Handler(IMapper mapper, UserManager<AppUser> userManager)
            {
                _mapper = mapper;
                _userManager = userManager;
            }
            public async Task<Result<UserProfile>> Handle(Query request, CancellationToken cancellationToken)
            {
                var profile = await _userManager.Users
                    .Where(u => u.Email == request.Email)
                    .ProjectTo<UserProfile>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(CancellationToken.None);

                if (profile == null) return null;

                return  Result<UserProfile>.Success(profile);
            }
        }
    }
}
