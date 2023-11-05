using Application.Core;
using Application.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Categories
{
    public class CategoryEdit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public CategoryDto Category { get; set; }

        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _dataContext;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext dataContext, IMapper mapper, IUserAccessor userAccessor)
            {
                _dataContext = dataContext;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var category = await _dataContext.Categories.FirstOrDefaultAsync(c =>
                    c.Id == request.Category.Id && c.CategoryOwner.Email == _userAccessor.GetUserEmail());

                if (category == null) return null;

                _mapper.Map(request.Category, category);

                var result = await _dataContext.SaveChangesAsync(CancellationToken.None) > 0;

                return result
                    ? Result<Unit>.Success(Unit.Value)
                    : Result<Unit>.Failure("Ошибка при редакторивании категории");
            }
        }
    }
}
