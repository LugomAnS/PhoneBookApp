using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Contacts
{
    public class ContactEdit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Contact Contact { get; set; }

        }

        public class CommandValidator: AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(c => c.Contact).SetValidator(new ContactValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _dataContext;
            private readonly IMapper _mapper;

            public Handler(DataContext dataContext, IMapper mapper)
            {
                _dataContext = dataContext;
                _mapper = mapper;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var contact = await _dataContext.Contacts.FindAsync(request.Contact.Id);
                var address = await _dataContext.Addresses.FindAsync(request.Contact.ContactAddress.Id);

                if (contact == null) return null;

                request.Contact.CleanAllFields();
                
                if (request.Contact.ContactAddress == null && address != null)
                    _dataContext.Addresses.Remove(address);

                
                _mapper.Map(request.Contact, contact);
                
                var result = await _dataContext.SaveChangesAsync(CancellationToken.None) > 0;

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Ошибка при редактировании контакта");
            }
        }
    }
}
