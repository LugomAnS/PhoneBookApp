using System.Security.Claims;
using API.Controllers.Base;
using Application.User;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfileController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<UserProfileDto>> GetUserProfile()
        {
            return HandleResult(await Mediator.Send(new CurrentProfile.Query { Email = User.FindFirstValue(ClaimTypes.Email) }));
        }
    }
}
