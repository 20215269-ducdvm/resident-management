namespace ResidentsApi.DAL
{
    public class Resident
    {
        public long ResidentId { get; set; }
        public string? Name { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Address { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        public IList<ResidentApartment>? ResidentApartments { get; set; }
    }
}