using BikeStores.API.Infrastructure.Dtos;

namespace BikeStores.API.Application
{
    public interface IBikeStoresService
    {
        bool BrandExists(int brandId);
        bool CategoryExists(int categoryId);
        BrandDto DeleteBrand(int brandId);
        CategoryDto DeleteCategory(int categoryId);
        ProductDto DeleteProduct(int productId);
        BrandDto GetBrandById(int brandId);
        CategoryDto GetCategoryById(int categoryId);
        ProductDto GetProductById(int productId);
        BrandDto InsertBrand(BrandDto brandDto);
        CategoryDto InsertCategory(CategoryDto categoryDto);
        ProductDto InsertProduct(ProductDto productDto);
        List<BrandDto> ListBrands();
        List<CategoryDto> ListCategories();
        List<ProductDto> ListProducts();
        bool ProductExists(int productId);
        BrandDto UpdateBrand(int brandId, BrandDto brandDto);
        CategoryDto UpdateCategory(int categoryId, CategoryDto categoryDto);
        ProductDto UpdateProduct(int productId, ProductDto productDto);
    }
}