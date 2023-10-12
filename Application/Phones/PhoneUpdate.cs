using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Phones
{
    public class PhoneUpdate
    {
        public class Command: IRequest<Result<Unit>>
        {
            public Phone Phone { get; set; }

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
                var phone = await _dataContext.Phones.FindAsync(request.Phone.Id);

                if (phone == null) return null;

                _mapper.Map(request.Phone, phone);

                var result = await _dataContext.SaveChangesAsync(CancellationToken.None) > 0;

                return result
                    ? Result<Unit>.Success(Unit.Value)
                    : Result<Unit>.Failure("Ошибка при изменении телефона");
            }
        }
    }
}
