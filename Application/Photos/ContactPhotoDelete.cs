using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class ContactPhotoDelete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid ContactId { get; set; }
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

                if (contact != null)
                    _dataContext.ContactsPhotos.Remove(contact.Photo);

                var result = await _dataContext.SaveChangesAsync() > 0;

                return result
                    ? Result<Unit>.Success(Unit.Value)
                    : Result<Unit>.Failure("Ошибка при удалении фотографии");
            }
        }
    }
}
