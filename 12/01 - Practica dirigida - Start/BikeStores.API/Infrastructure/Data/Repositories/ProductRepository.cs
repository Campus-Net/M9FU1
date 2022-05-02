using BikeStores.API.Infrastructure.Data.Contexts;
using BikeStores.API.Infrastructure.Data.Entities;

namespace BikeStores.API.Infrastructure.Data.Repositories
{
    public class ProductRepository: GenericRepository<Product>, IProductRepository
    {
        public ProductRepository(BikeStoresContext context) : base(context)
        {

        }
    }
}
