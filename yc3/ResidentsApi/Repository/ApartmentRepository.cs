using ResidentsApi.DAL;
using ResidentsApi.GenericRepository;
using ResidentsApi.UnitOfWork;
namespace ResidentsApi.Repository
{
    public class ApartmentRepository : GenericRepository<Apartment>, IApartmentRepository
    {
        //Use the UnitOfWork object to pass the Context Object
        [ActivatorUtilitiesConstructor]
        public ApartmentRepository(IUnitOfWork<ResidentDBContext> unitOfWork) : base(unitOfWork)
        {
        }
        //If you don't want to use Unit of Work, then use the following Constructor
        // public ApartmentRepository(ResidentDBContext context) : base(context)
        // {
        // }
    }
}