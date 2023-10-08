using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Contacts
{
    public class ContactDetails
    {
        public class Query : IRequest<Result<ContactDetailsDto>>
        {
            public Guid Id { get; set; }

        }
        public class Handler : IRequestHandler<Query, Result<ContactDetailsDto>>
        {
            private readonly DataContext _dataContext;
            private readonly IMapper _mapper;

            public Handler(DataContext dataContext, IMapper mapper)
            {
                _dataContext = dataContext;
                _mapper = mapper;
            }
            public async Task<Result<ContactDetailsDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var contact = await _dataContext.Contacts
                    .Where(c => c.Id == request.Id)
                    .ProjectTo<ContactDetailsDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(CancellationToken.None);

                return contact == null ? null : Result<ContactDetailsDto>.Success(contact);
            }
        }
    }
}
