using BikeStores.API.Infrastructure.Data.Contexts;
using BikeStores.API.Infrastructure.Data.Repositories;
using Microsoft.EntityFrameworkCore;

namespace BikeStores.API.Infrastructure.Data
{
    public static class DependencyInjection
    {
        public class BlikeStoresRepositoriesOptions
        {
            public string ConnectionString { get; set; }
        }
        public static IServiceCollection AddBlogRepositories(this IServiceCollection services, Action<BlikeStoresRepositoriesOptions> configureOptions)
        {
            var options = new BlikeStoresRepositoriesOptions();
            configureOptions(options);

            services.AddScoped<IBrandRepository, BrandRepository>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<BikeStoresUnitOfWork>();

            services.AddDbContext<BikeStoresContext>(opt =>
            {
                opt.UseSqlServer(options.ConnectionString);
            });
            return services;
        }
    }
}
