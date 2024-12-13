using ResidentsApi.DAL;
using ResidentsApi.GenericRepository;
using ResidentsApi.UnitOfWork;
using Microsoft.EntityFrameworkCore;
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
        public ResidentApartment GetResidentApartmentById(long residentApartmentId)
        {
            return Context.ResidentApartments            
            .Include(x => x.Resident)            
            .Include(x => x.Apartment)
            .FirstOrDefault(x => x.ResidentApartmentId == residentApartmentId);            
        }
        public IEnumerable<ResidentApartment> GetResidentApartmentByResidentId(long residentId)
        {
            return Context.ResidentApartments.Where(x => x.ResidentId == residentId).ToList();
        }
        public IEnumerable<ResidentApartment> GetResidentApartmentByApartmentId(long apartmentId)
        {
            return Context.ResidentApartments.Where(x => x.ApartmentId == apartmentId).ToList();
        }
    }
}