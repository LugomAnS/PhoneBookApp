using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Phones
{
    public class PhoneCreate
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid ContactId { get; set; }
            public Phone Phone { get; set; }
        }
        public class CommandValidation : AbstractValidator<Command>
        {
            public CommandValidation()
            {
                RuleFor(c => c.Phone).SetValidator(new PhoneValidation());
            }
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
                var contact = await _dataContext.Contacts.FindAsync(request.ContactId);

                request.Phone.Owner = contact;

                _dataContext.Phones.Add(request.Phone);

                var result = await _dataContext.SaveChangesAsync(CancellationToken.None) > 0;

                return result
                    ? Result<Unit>.Success(Unit.Value)
                    : Result<Unit>.Failure("Ошибка при добавлении телефона");
            }
        }
    }
}
