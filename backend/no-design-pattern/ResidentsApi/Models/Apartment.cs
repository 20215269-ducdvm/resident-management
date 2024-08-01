namespace ResidentsApi.Models
{
    public class Apartment
    {
        public long ApartmentId { get; set; }
        public int RoomNumber { get; set; }
        public string? Address { get; set; }
        public IList<ResidentApartment>? ResidentApartments { get; set; }
    }
}