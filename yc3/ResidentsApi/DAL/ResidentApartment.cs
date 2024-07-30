namespace ResidentsApi.DAL
{
    public class ResidentApartment
    {
        public long ResidentId { get; set; }
        public Resident? Resident { get; set; }
        
        public long ApartmentId { get; set; }
        public Apartment? Apartment { get; set; }
    }
}