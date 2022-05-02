using BikeStores.API.Application;
using BikeStores.API.Infrastructure.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BikeStores.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IBikeStoresService _service;
        public ProductsController(
            IBikeStoresService service
        )
        {
            _service = service;
        }
        [HttpGet]
        public IActionResult ListProducts()
        {
            return Ok(_service.ListProducts());
        }
        [HttpGet("{productId}")]
        public IActionResult GetProductById(int productId, [FromQuery] string op)
        {
            if (op == "ProductExists")
            {
                return Ok(_service.ProductExists(productId));
            }
            else
            {
                return Ok(_service.GetProductById(productId));
            }
        }
        [HttpPost]
        public IActionResult InsertProduct(ProductDto productDto)
        {
            return Ok(_service.InsertProduct(productDto));
        }

        [HttpPut("{productId}")]
        public IActionResult UpdateProduct(int productId, ProductDto productDto)
        {
            return Ok(_service.UpdateProduct(productId, productDto));
        }
        [HttpDelete("{productId}")]
        public IActionResult DeleteProduct(int productId)
        {
            return Ok(_service.DeleteProduct(productId));
        }
    }
}
