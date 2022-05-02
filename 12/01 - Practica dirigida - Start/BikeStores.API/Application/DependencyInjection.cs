namespace BikeStores.API.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplications(this IServiceCollection services)
        {
            services.AddScoped<IBikeStoresService, BikeStoresService>();
            return services;
        }
    }
}
