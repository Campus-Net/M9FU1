using BikeStores.API.Application;
using BikeStores.API.Infrastructure.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BikeStores.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly IBikeStoresService _service;
        public CategoriesController(
            IBikeStoresService service
        )
        {
            _service = service;
        }
        [HttpGet]
        public IActionResult ListCategories()
        {
            return Ok(_service.ListCategories());
        }
        [HttpGet("{categoryId}")]
        public IActionResult GetCategoryById(int categoryId, [FromQuery] string op)
        {
            if (op == "CategoryExists")
            {
                return Ok(_service.CategoryExists(categoryId));
            }
            else
            {
                return Ok(_service.GetCategoryById(categoryId));
            }
        }
        [HttpPost]
        public IActionResult InsertCategory(CategoryDto categoryDto)
        {
            return Ok(_service.InsertCategory(categoryDto));
        }

        [HttpPut("{categoryId}")]
        public IActionResult UpdateCategory(int categoryId, CategoryDto categoryDto)
        {
            return Ok(_service.UpdateCategory(categoryId, categoryDto));
        }
        [HttpDelete("{categoryId}")]
        public IActionResult DeleteCategory(int categoryId)
        {
            return Ok(_service.DeleteCategory(categoryId));
        }
    }
}
