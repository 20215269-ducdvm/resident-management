using ResidentsApi.DAL;
using ResidentsApi.GenericRepository;
using ResidentsApi.UnitOfWork;
using Microsoft.EntityFrameworkCore;
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
        //Add the Specific Methods for the Apartment Repository

        public Apartment GetApartmentWithResident(long id)
        {
            return Context.Apartments.Include(a => a.ResidentApartments).FirstOrDefault(a => a.ApartmentId == id);
        }

        public Apartment GetApartmentByRoomNumber(string roomNumber)
        {
            return Context.Apartments.FirstOrDefault(a => a.RoomNumber.Equals(roomNumber));
        }
    }
}