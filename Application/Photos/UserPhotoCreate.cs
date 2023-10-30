using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class UserPhotoCreate
    {
        public class Command : IRequest<Result<Unit>>
        {
            public IFormFile File { get; set; }
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
                if (request.File == null) return null;
                
                var user = await _dataContext.Users.FirstOrDefaultAsync(u => u.Email == _userAccessor.GetUserEmail());

                var userPhoto = await _dataContext.UserPhotos.Where(p => p.Owner == user).FirstOrDefaultAsync();

                using (var memoryStream = new MemoryStream())
                {
                    await request.File.CopyToAsync(memoryStream);

                    if (userPhoto == null)
                    {
                        userPhoto = new UserPhoto
                        {
                            Id = new Guid(),
                            ContentType = request.File.ContentType,
                            Image = memoryStream.ToArray(),
                            Owner = user
                        };
                        _dataContext.UserPhotos.Add(userPhoto);
                    }
                    else
                    {
                        userPhoto.ContentType = request.File.ContentType;
                        userPhoto.Image = memoryStream.ToArray();
                    }
                }

                var result = await _dataContext.SaveChangesAsync() > 0;

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Ошибка добавления фотографии");
            }
        }
    }
}
