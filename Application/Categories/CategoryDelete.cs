using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Categories
{
    public class CategoryDelete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid CategoryId { get; set; }

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
                var category = await _dataContext.Categories.Include(c => c.Contacts)
                    .FirstOrDefaultAsync(c =>
                        c.Id == request.CategoryId && c.CategoryOwner.Email == _userAccessor.GetUserEmail());

                if (category == null) return null;

                _dataContext.Categories.Remove(category);

                var result = await _dataContext.SaveChangesAsync(CancellationToken.None) > 0;

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Ошибка удаления категории");
            }
        }
    }
}
