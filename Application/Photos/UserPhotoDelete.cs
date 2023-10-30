using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class UserPhotoDelete
    {
        public class Command : IRequest<Result<Unit>>
        {

        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _dataContext;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext dataContext, IUserAccessor userAccessor)
            {
                _dataContext = dataContext;
                _userAccessor = userAccessor;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _dataContext.Users.Include(p => p.UserPhoto)
                    .FirstOrDefaultAsync(u => u.Email == _userAccessor.GetUserEmail());

                if (user != null) 
                    _dataContext.UserPhotos.Remove(user.UserPhoto);

                var result = await _dataContext.SaveChangesAsync() > 0;

                return result
                    ? Result<Unit>.Success(Unit.Value)
                    : Result<Unit>.Failure("Ошибка при удалении фотографии");
            }
        }
    }
}
