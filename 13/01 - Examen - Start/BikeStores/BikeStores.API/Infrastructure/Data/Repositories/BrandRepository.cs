using BikeStores.API.Infrastructure.Data.Contexts;
using BikeStores.API.Infrastructure.Data.Entities;

namespace BikeStores.API.Infrastructure.Data.Repositories
{
    public class BrandRepository: GenericRepository<Brand>, IBrandRepository
    {
        public BrandRepository(BikeStoresContext context) : base(context)
        {

        }
    }
}
