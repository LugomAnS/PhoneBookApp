using Domain;
using FluentValidation;

namespace Application.Contacts
{
    public class ContactValidator : AbstractValidator<Contact>
    {
        public ContactValidator()
        {
            RuleFor(c => c.Surname).NotEmpty();
        }
    }
}
