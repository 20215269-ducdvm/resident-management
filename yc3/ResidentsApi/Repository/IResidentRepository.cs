using ResidentsApi.DAL;
using ResidentsApi.GenericRepository;
namespace ResidentsApi.Repository
{
    public interface IResidentRepository : IGenericRepository<Resident>
    {
        // We can add some specific methods for the Resident Repository
        IEnumerable<Resident> GetResidentsByName(string name);
        IEnumerable<Resident> GetResidentByPhoneNumber(string phoneNumber);

    }
}