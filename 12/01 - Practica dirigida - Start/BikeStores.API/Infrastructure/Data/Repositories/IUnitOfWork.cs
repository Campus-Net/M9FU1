namespace BikeStores.API.Infrastructure.Data.Repositories
{
    public interface IUnitOfWork<DBContext> : IDisposable
    {
        void Save();
    }
}