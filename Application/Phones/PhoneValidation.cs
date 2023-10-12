using Domain;
using FluentValidation;

namespace Application.Phones
{
    public class PhoneValidation : AbstractValidator<Phone>
    {
        public PhoneValidation()
        {
            RuleFor(p => p.Type).NotEmpty();
            RuleFor(p => p.PhoneNumber).NotEmpty();
        }
    }
}
