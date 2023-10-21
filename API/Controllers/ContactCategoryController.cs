using API.Controllers.Base;
using Application.Categories;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ContactCategoryController : BaseController
    {
        [HttpPost]
        public async Task<ActionResult> CreateCategory([FromBody]CategoryDto category)
        {
            return HandleResult(await Mediator.Send(new CategoryCreate.Command { Category = category }));
        }

        [HttpPut]
        public async Task<ActionResult> EditCategory([FromBody] CategoryDto category)
        {
            return HandleResult(await Mediator.Send(new CategoryEdit.Command { Category = category }));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCategory(Guid id)
        {
            return HandleResult(await Mediator.Send(new CategoryDelete.Command { CategoryId = id }));
        }
    }
}
