using API.Controllers.Base;
using Application.Photos;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PhotoController : BaseController
    {
        [HttpPost("user")]
        public async Task<ActionResult> AddUserPhoto([FromForm]UserPhotoCreate.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }
    }
}
