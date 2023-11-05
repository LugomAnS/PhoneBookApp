using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Categories
{
    public class CategoryCreate
    {
        public class Command: IRequest<Result<Unit>>
        {
            public CategoryDto Category { get; set; }

        }
        public class CategoryCommandValidator: AbstractValidator<Command>
        {
            public CategoryCommandValidator()
            {
                RuleFor(c => c.Category.Category).NotEmpty();
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

                if (user == null) return null;

                var category = new ContactCategory
                {
                    Id = request.Category.Id,
                    Category = request.Category.Category,
                    CategoryOwner = user
                };

                _dataContext.Categories.Add(category);

                var result = await _dataContext.SaveChangesAsync(CancellationToken.None) > 0;

                return result
                    ? Result<Unit>.Success(Unit.Value)
                    : Result<Unit>.Failure("Ошибка при добавлении категории");
            }
        }
    }
}
