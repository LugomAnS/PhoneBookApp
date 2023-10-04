using Application.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Base
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController : ControllerBase
    {

        protected ActionResult HandleResult<T>(Result<T> result)
        {
            if (result == null)
            {
                return NotFound();
            }

            return result.IsSuccess switch
            {
                true when result.Value == null => NotFound(),
                true when result.Value != null => Ok(result.Value),
                _ => BadRequest(result.Error)
            };
        }
    }
}
