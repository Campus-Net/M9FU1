using BikeStores.API.Infrastructure.Data.Contexts;

namespace BikeStores.API.Infrastructure.Data.Repositories
{
    public class BikeStoresUnitOfWork : IUnitOfWork<BikeStoresContext>
    {
        public IBrandRepository Brands { get; set; }
        public ICategoryRepository Categories { get; set; }
        public IProductRepository Products { get; set; }

        private BikeStoresContext _context;

        public BikeStoresUnitOfWork(
            BikeStoresContext context,
            IBrandRepository brandRepository,
            ICategoryRepository categoryRepository,
            IProductRepository productRepository
        )
        {
            _context = context;
            Brands = brandRepository;
            Categories = categoryRepository;
            Products = productRepository;
        }
        public void Save()
        {
            _context.SaveChanges();
        }

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
