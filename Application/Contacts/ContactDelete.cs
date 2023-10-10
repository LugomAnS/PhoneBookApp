using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Contacts
{
    public class ContactDelete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }

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
                var user = await _dataContext.Users.FirstOrDefaultAsync(u => u.Email == _userAccessor.GetUserEmail());

                var contact = await _dataContext.Contacts.Where(c => c.Id == request.Id).FirstOrDefaultAsync();

                if (contact == null) return null;

                user.Contacts.Remove(contact);

                var result = await _dataContext.SaveChangesAsync() > 0;

                _dataContext.Contacts.Remove(contact);
                
                result = await _dataContext.SaveChangesAsync() > 0;

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Ошибка при удалении контакта");
            }
        }
    }
}
