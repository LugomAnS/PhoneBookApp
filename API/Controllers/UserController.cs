using API.Controllers.Base;
using Application.User;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class UserController : BaseController
    {
        [HttpPut]
        public async Task<ActionResult> EditUserCreds(UserEditDto user)
        {
            return HandleResult(await Mediator.Send(new UserEdit.Command { User = user }));
        }
    }
}
