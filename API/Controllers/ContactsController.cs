using API.Controllers.Base;
using Application.Contacts;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ContactsController : BaseController
    {
        [HttpGet("{id}")]
        public async Task<ActionResult> GetContactDetails(string id)
        {
            return HandleResult(await Mediator.Send(new ContactDetails.Query { Id = Guid.Parse(id) }));
        }
    }
}
