using BikeStores.API.Infrastructure.Data.Contexts;
using BikeStores.API.Infrastructure.Data.Entities;

namespace BikeStores.API.Infrastructure.Data.Repositories
{
    public class CategoryRepository: GenericRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(BikeStoresContext context) : base(context)
        {

        }
    }
}
