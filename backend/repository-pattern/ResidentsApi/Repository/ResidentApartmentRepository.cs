using ResidentsApi.DAL;
using ResidentsApi.GenericRepository;
using ResidentsApi.UnitOfWork;
namespace ResidentsApi.Repository
{
    public class ResidentApartmentRepository : GenericRepository<ResidentApartment>, IResidentApartmentRepository
    {
        [ActivatorUtilitiesConstructor]
        public ResidentApartmentRepository(IUnitOfWork<ResidentDBContext> unitOfWork) : base(unitOfWork)
        {
        }
        // public ResidentApartmentRepository(ResidentDBContext context) : base(context)
        // {
        // }
    }
}