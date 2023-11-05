using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Contacts
{
    public class ContactCreate
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Contact Contact { get; set; }
        }

        public class ContactCommandValidator : AbstractValidator<Command>
        {
            public ContactCommandValidator()
            {
                RuleFor(c => c.Contact).SetValidator(new ContactValidator());
            }
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

                request.Contact.CleanAllFields();

                request.Contact.Owner = user;

                if (request.Contact.Category != null)
                {
                    var category = await _dataContext.Categories.FindAsync(request.Contact.Category.Id);
                    request.Contact.Category = category;
                }

                _dataContext.Contacts.Add(request.Contact);

                var result = await _dataContext.SaveChangesAsync(CancellationToken.None) > 0;

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Ошибка при создании контакта");
            }
        }
    }
}
