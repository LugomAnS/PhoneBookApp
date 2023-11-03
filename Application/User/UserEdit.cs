using Application.Core;
using Application.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.User
{
    public class UserEdit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public UserEditDto User { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _dataContext;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;

            public Handler(DataContext dataContext, IUserAccessor userAccessor, IMapper mapper)
            {
                _dataContext = dataContext;
                _userAccessor = userAccessor;
                _mapper = mapper;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _dataContext.Users.FirstOrDefaultAsync(u => u.Email == _userAccessor.GetUserEmail());

                _mapper.Map(request.User, user);

                var result = await _dataContext.SaveChangesAsync() > 0;

                return result
                    ? Result<Unit>.Success(Unit.Value)
                    : Result<Unit>.Failure("Ошибка при редактировании пользователя");

            }
        }
    }
}
