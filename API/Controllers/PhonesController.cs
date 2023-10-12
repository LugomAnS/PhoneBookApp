using API.Controllers.Base;
using Application.Phones;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PhonesController : BaseController
    {
        [HttpPost("{id}")]
        public async Task<ActionResult> CreatePhone(Guid id, Phone phone)
        {
            return HandleResult(await Mediator.Send(new PhoneCreate.Command { ContactId = id, Phone = phone }));
        }

        [HttpPut("edit")]
        public async Task<ActionResult> UpdatePhone([FromBody]Phone phone)
        {
            return HandleResult(await Mediator.Send(new PhoneUpdate.Command { Phone = phone }));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePhone(Guid id)
        {
            return HandleResult(await Mediator.Send(new PhoneDelete.Command { PhoneId = id }));
        }
    }
}
