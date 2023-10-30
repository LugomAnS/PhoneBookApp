using Application.Core;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class ContactPhotoCreate
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid ContactId { get; set; }
            public IFormFile File { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _dataContext;

            public Handler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var contact = await _dataContext.Contacts.Include(p => p.Photo)
                    .FirstOrDefaultAsync(c => c.Id == request.ContactId);

                if (contact == null)
                    return null;

                using (var memoryStream = new MemoryStream())
                {
                    await request.File.CopyToAsync(memoryStream);

                    if (contact.Photo == null)
                    {
                        contact.Photo = new ContactPhoto{Id = new Guid(), Owner = contact};
                        _dataContext.ContactsPhotos.Add(contact.Photo);
                    }

                    contact.Photo.ContentType = request.File.ContentType;
                    contact.Photo.Image = memoryStream.ToArray();
                }

                var result = await _dataContext.SaveChangesAsync() > 0;

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Ошибка при добавлении фотографии");
            }
        }
    }
}
