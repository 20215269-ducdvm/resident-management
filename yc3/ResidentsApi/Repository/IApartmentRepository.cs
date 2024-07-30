using ResidentsApi.DAL;
using ResidentsApi.GenericRepository;
namespace ResidentsApi.Repository
{
    public interface IApartmentRepository : IGenericRepository<Apartment>
    {
        // We can add some specific methods for the Apartment Repository
    }
}