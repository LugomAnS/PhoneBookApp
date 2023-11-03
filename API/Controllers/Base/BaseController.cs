using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Base
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController : ControllerBase
    {
        private IMediator _mediator;

        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();

        protected ActionResult HandleResult<T>(Result<T> result)
        {
            if (result == null)
            {
                return NotFound();
            }

            if (!result.IsSuccess)
            {
                ModelState.AddModelError("ServerError", result.Error);
                return ValidationProblem();
            }

            return result.IsSuccess switch
            {
                true when result.Value == null => NotFound(),
                true when result.Value != null => Ok(result.Value),
                _ =>  BadRequest(result.Error)
            };

           
        }
    }
}
