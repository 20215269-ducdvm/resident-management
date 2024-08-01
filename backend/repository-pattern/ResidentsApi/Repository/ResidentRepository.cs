using ResidentsApi.DAL;
using ResidentsApi.GenericRepository;
using ResidentsApi.UnitOfWork;
namespace ResidentsApi.Repository
{
    public class ResidentRepository : GenericRepository<Resident>, IResidentRepository
    {
        //Use the UnitOfWork object to pass the Context Object
        [ActivatorUtilitiesConstructor]
        public ResidentRepository(IUnitOfWork<ResidentDBContext> unitOfWork) : base(unitOfWork)
        {
        }
        //If you don't want to use Unit of Work, then use the following Constructor
        // public ResidentRepository(ResidentDBContext context) : base(context)
        // {
        // }
        //Add the Specific Methods for the Resident Repository
        public IEnumerable<Resident> GetResidentsByName(string name)
        {
            return Context.Residents.Where(r => r.Name == name).ToList();
        }
        public IEnumerable<Resident> GetResidentByPhoneNumber(string phoneNumber)
        {
            return Context.Residents.Where(r => r.PhoneNumber == phoneNumber).ToList();
        }
    }
}