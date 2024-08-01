using ResidentsApi.DAL;
using ResidentsApi.GenericRepository;
namespace ResidentsApi.Repository
{
    public interface IResidentApartmentRepository : IGenericRepository<ResidentApartment>
    {
        // We can add some specific methods for the Resident Repository
    }
}