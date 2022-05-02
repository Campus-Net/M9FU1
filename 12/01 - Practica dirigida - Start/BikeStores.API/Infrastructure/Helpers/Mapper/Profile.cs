using BikeStores.API.Infrastructure.Data.Entities;
using BikeStores.API.Infrastructure.Dtos;

namespace BikeStores.API.Infrastructure.Helpers.Mapper
{
    public class Profile : AutoMapper.Profile
    {
        public Profile()
        {
            CreateMap<Brand, BrandDto>();
            CreateMap<Category, CategoryDto>();
            CreateMap<Product, ProductDto>();

            CreateMap<BrandDto, Brand>();
            CreateMap<CategoryDto, Category>();
            CreateMap<ProductDto, Product>();
        }
    }
}
