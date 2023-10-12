using Application.Core;
using MediatR;
using Persistence;

namespace Application.Phones
{
    public class PhoneDelete
    {
        public class Command: IRequest<Result<Unit>>
        {
            public Guid PhoneId { get; set; }

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
                var phone = await _dataContext.Phones.FindAsync(request.PhoneId);

                if (phone == null) return null;

                _dataContext.Phones.Remove(phone);

                var result = await _dataContext.SaveChangesAsync(CancellationToken.None) > 0;

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Ошибка при удалении телефона");
            }
        }
    }
}
