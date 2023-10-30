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

        [HttpDelete("user")]
        public async Task<ActionResult> DeleteUserPhoto()
        {
            return HandleResult(await Mediator.Send(new UserPhotoDelete.Command()));
        }

        [HttpPost("contact/${id}")]
        public async Task<ActionResult> AddContactPhoto(Guid id, [FromForm] IFormFile file)
        {
            return HandleResult(await Mediator.Send(new ContactPhotoCreate.Command { ContactId = id, File = file }));
        }

        [HttpDelete("contact/${id}")]
        public async Task<ActionResult> DeleteContactPhoto(Guid id)
        {
            return HandleResult(await Mediator.Send(new ContactPhotoDelete.Command { ContactId = id }));
        }
    }
}
