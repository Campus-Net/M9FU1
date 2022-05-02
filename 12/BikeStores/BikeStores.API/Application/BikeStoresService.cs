using AutoMapper;
using BikeStores.API.Infrastructure.Data.Entities;
using BikeStores.API.Infrastructure.Data.Repositories;
using BikeStores.API.Infrastructure.Dtos;

namespace BikeStores.API.Application
{
    public class BikeStoresService : IBikeStoresService
    {
        private readonly BikeStoresUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public BikeStoresService(
            BikeStoresUnitOfWork unitOfWork,
            IMapper mapper
        )
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public List<BrandDto> ListBrands()
        {
            return _mapper.Map<List<BrandDto>>(_unitOfWork.Brands.GetAll());
        }
        public BrandDto GetBrandById(int brandId)
        {
            return _mapper.Map<BrandDto>(_unitOfWork.Brands.GetById(brandId));
        }
        public BrandDto UpdateBrand(int brandId, BrandDto brandDto)
        {
            Brand brandUpdated = _unitOfWork.Brands.GetById(brandId);
            _mapper.Map(brandDto, brandUpdated);
            _unitOfWork.Brands.Update(brandUpdated);
            _unitOfWork.Save();

            return _mapper.Map<BrandDto>(brandUpdated);
        }
        public BrandDto InsertBrand(BrandDto brandDto)
        {
            Brand brandInserted = _mapper.Map<Brand>(brandDto);
            _unitOfWork.Brands.Insert(brandInserted);
            _unitOfWork.Save();

            return _mapper.Map<BrandDto>(brandInserted);
        }
        public BrandDto DeleteBrand(int brandId)
        {
            Brand brandDeleted = _unitOfWork.Brands.GetById(brandId);
            _unitOfWork.Brands.Delete(brandDeleted);
            _unitOfWork.Save();

            return _mapper.Map<BrandDto>(brandDeleted);
        }
        public bool BrandExists(int brandId)
        {
            Brand brand = _unitOfWork.Brands.GetById(brandId);
            return (brand != null);
        }

        public List<CategoryDto> ListCategories()
        {
            return _mapper.Map<List<CategoryDto>>(_unitOfWork.Categories.GetAll());
        }
        public CategoryDto GetCategoryById(int categoryId)
        {
            return _mapper.Map<CategoryDto>(_unitOfWork.Categories.GetById(categoryId));
        }
        public CategoryDto UpdateCategory(int categoryId, CategoryDto categoryDto)
        {
            Category categoryUpdated = _unitOfWork.Categories.GetById(categoryId);
            _mapper.Map(categoryDto, categoryUpdated);
            _unitOfWork.Categories.Update(categoryUpdated);
            _unitOfWork.Save();

            return _mapper.Map<CategoryDto>(categoryUpdated);
        }
        public CategoryDto InsertCategory(CategoryDto categoryDto)
        {
            Category categoryInserted = _mapper.Map<Category>(categoryDto);
            _unitOfWork.Categories.Insert(categoryInserted);
            _unitOfWork.Save();

            return _mapper.Map<CategoryDto>(categoryInserted);
        }
        public CategoryDto DeleteCategory(int categoryId)
        {
            Category categoryDeleted = _unitOfWork.Categories.GetById(categoryId);
            _unitOfWork.Categories.Delete(categoryDeleted);
            _unitOfWork.Save();

            return _mapper.Map<CategoryDto>(categoryDeleted);
        }
        public bool CategoryExists(int categoryId)
        {
            Category category = _unitOfWork.Categories.GetById(categoryId);
            return (category != null);
        }

        public List<ProductDto> ListProducts()
        {
            return _mapper.Map<List<ProductDto>>(_unitOfWork.Products.GetAll());
        }
        public ProductDto GetProductById(int productId)
        {
            return _mapper.Map<ProductDto>(_unitOfWork.Products.GetById(productId));
        }
        public ProductDto UpdateProduct(int productId, ProductDto productDto)
        {
            Product productUpdated = _unitOfWork.Products.GetById(productId);
            _mapper.Map(productDto, productUpdated);
            _unitOfWork.Products.Update(productUpdated);
            _unitOfWork.Save();

            return _mapper.Map<ProductDto>(productUpdated);
        }
        public ProductDto InsertProduct(ProductDto productDto)
        {
            Product productInserted = _mapper.Map<Product>(productDto);
            _unitOfWork.Products.Insert(productInserted);
            _unitOfWork.Save();

            return _mapper.Map<ProductDto>(productInserted);
        }
        public ProductDto DeleteProduct(int productId)
        {
            Product productDeleted = _unitOfWork.Products.GetById(productId);
            _unitOfWork.Products.Delete(productDeleted);
            _unitOfWork.Save();

            return _mapper.Map<ProductDto>(productDeleted);
        }
        public bool ProductExists(int productId)
        {
            Product product = _unitOfWork.Products.GetById(productId);
            return (product != null);
        }
    }
}
