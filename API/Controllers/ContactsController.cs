using API.Controllers.Base;
using Application.Contacts;
using Domain;
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

        [HttpPost("create")]
        public async Task<ActionResult> CreateContact(Contact contact)
        {
            return HandleResult(await Mediator.Send(new ContactCreate.Command { Contact = contact }));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteContact(string id)
        {
            return HandleResult(await Mediator.Send(new ContactDelete.Command { Id = Guid.Parse(id) }));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> EditContact(string id, Contact contact)
        {
            return HandleResult(await Mediator.Send(new ContactEdit.Command
                { Contact = contact }));
        }
    }
}
