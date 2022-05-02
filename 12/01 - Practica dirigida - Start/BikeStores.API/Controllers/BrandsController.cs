using BikeStores.API.Application;
using BikeStores.API.Infrastructure.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BikeStores.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandsController : ControllerBase
    {
        private readonly IBikeStoresService _service;
        public BrandsController(
            IBikeStoresService service
        )
        {
            _service = service;
        }
        [HttpGet]
        public IActionResult ListBrands()
        {
            return Ok(_service.ListBrands());
        }
        [HttpGet("{brandId}")]
        public IActionResult GetBrandById(int brandId, [FromQuery] string op)
        {
            if (op == "BrandExists")
            {
                return Ok(_service.BrandExists(brandId));
            }
            else
            {
                return Ok(_service.GetBrandById(brandId));
            }
        }
        [HttpPost]
        public IActionResult InsertBrand(BrandDto brandDto)
        {
            return Ok(_service.InsertBrand(brandDto));
        }

        [HttpPut("{brandId}")]
        public IActionResult UpdateBrand(int brandId, BrandDto brandDto)
        {
            return Ok(_service.UpdateBrand(brandId, brandDto));
        }
        [HttpDelete("{brandId}")]
        public IActionResult DeleteBrand(int brandId)
        {
            return Ok(_service.DeleteBrand(brandId));
        }
    }
}
