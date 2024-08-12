using ResidentsApi.DAL;
namespace ResidentsApi.Data
{
    public static class DbInitializer
    {
        public static void Initialize(ResidentDBContext context)
        {
            context.Database.EnsureCreated();
            if (context.Residents.Any())
            {
                return;
            }
            var residents = new Resident[] {
                new() { Name = "Carson Alexander", DateOfBirth = DateTime.SpecifyKind(new DateTime(1985, 1, 15), DateTimeKind.Utc), Address = "123 Main St", PhoneNumber = "555-555-5555", Email = "", ResidentApartments = null },
                new() { Name = "Meredith Alonso", DateOfBirth = DateTime.SpecifyKind(new DateTime(1990, 2, 20), DateTimeKind.Utc), Address = "123 Main St", PhoneNumber = "555-555-5555", Email = "", ResidentApartments = null },
                new() { Name = "Arturo Anand", DateOfBirth = DateTime.SpecifyKind(new DateTime(1978, 3, 25), DateTimeKind.Utc), Address = "456 Maple St", PhoneNumber = "555-123-4567", Email = "arturo.anand@example.com", ResidentApartments = null },
                new() { Name = "Gytis Barzdukas", DateOfBirth = DateTime.SpecifyKind(new DateTime(1982, 4, 30), DateTimeKind.Utc), Address = "789 Oak St", PhoneNumber = "555-987-6543", Email = "gytis.barzdukas@example.com", ResidentApartments = null },
                new() { Name = "Yan Li", DateOfBirth = DateTime.SpecifyKind(new DateTime(1995, 5, 5), DateTimeKind.Utc), Address = "321 Pine St", PhoneNumber = "555-456-7890", Email = "yan.li@example.com", ResidentApartments = null },
                new() { Name = "Peggy Justice", DateOfBirth = DateTime.SpecifyKind(new DateTime(1988, 6, 10), DateTimeKind.Utc), Address = "654 Elm St", PhoneNumber = "555-321-0987", Email = "peggy.justice@example.com", ResidentApartments = null },
                new() { Name = "Laura Norman", DateOfBirth = DateTime.SpecifyKind(new DateTime(1975, 7, 15), DateTimeKind.Utc), Address = "987 Birch St", PhoneNumber = "555-654-3210", Email = "laura.norman@example.com", ResidentApartments = null },
                new() { Name = "Nino Olivetto", DateOfBirth = DateTime.SpecifyKind(new DateTime(1980, 8, 20), DateTimeKind.Utc), Address = "234 Cedar St", PhoneNumber = "555-789-0123", Email = "nino.olivetto@example.com", ResidentApartments = null },
                new() { Name = "John Doe", DateOfBirth = DateTime.SpecifyKind(new DateTime(1992, 9, 25), DateTimeKind.Utc), Address = "123 Oak St", PhoneNumber = "555-123-4567", Email = "john.doe@example.com", ResidentApartments = null },
                new() { Name = "Jane Smith", DateOfBirth = DateTime.SpecifyKind(new DateTime(1983, 10, 30), DateTimeKind.Utc), Address = "456 Maple St", PhoneNumber = "555-234-5678", Email = "jane.smith@example.com", ResidentApartments = null },
                new() { Name = "Bob Johnson", DateOfBirth = DateTime.SpecifyKind(new DateTime(1979, 11, 5), DateTimeKind.Utc), Address = "789 Willow St", PhoneNumber = "555-345-6789", Email = "bob.johnson@example.com", ResidentApartments = null },
                new() { Name = "Alice Williams", DateOfBirth = DateTime.SpecifyKind(new DateTime(1986, 12, 10), DateTimeKind.Utc), Address = "012 Cherry St", PhoneNumber = "555-456-7890", Email = "alice.williams@example.com", ResidentApartments = null },
                new() { Name = "Charlie Brown", DateOfBirth = DateTime.SpecifyKind(new DateTime(1991, 1, 15), DateTimeKind.Utc), Address = "345 Spruce St", PhoneNumber = "555-567-8901", Email = "charlie.brown@example.com", ResidentApartments = null },
                new() { Name = "Diana Davis", DateOfBirth = DateTime.SpecifyKind(new DateTime(1984, 2, 20), DateTimeKind.Utc), Address = "678 Sycamore St", PhoneNumber = "555-678-9012", Email = "diana.davis@example.com", ResidentApartments = null },
            };

            foreach (Resident r in residents)
            {
                context.Residents.Add(r);
            }

            context.SaveChanges();

            var apartments = new Apartment[] {
                new() { RoomNumber = 101, Address = "123 Main"},
                new() { RoomNumber = 102, Address = "123 Main St" },
                new() { RoomNumber = 103, Address = "456 Maple St" },
                new() { RoomNumber = 201, Address = "789 Oak St" },
                new() { RoomNumber = 202, Address = "321 Pine St" },
                new() { RoomNumber = 203, Address = "654 Elm St" },
                new() { RoomNumber = 301, Address = "987 Birch St" },
                new() { RoomNumber = 302, Address = "234 Cedar St" }
            };

            foreach (Apartment a in apartments)
            {
                context.Apartments.Add(a);
            }

            context.SaveChanges();

            var residentApartments = new ResidentApartment[] {
                new() { ResidentId = 1, ApartmentId = 1 },
                new() { ResidentId = 2, ApartmentId = 1 },
                new() { ResidentId = 3, ApartmentId = 1 },
                new() { ResidentId = 2, ApartmentId = 2 },
                new() { ResidentId = 3, ApartmentId = 2 },
                new() { ResidentId = 4, ApartmentId = 3 },
                new() { ResidentId = 4, ApartmentId = 4 },
                new() { ResidentId = 5, ApartmentId = 5 },
                new() { ResidentId = 6, ApartmentId = 6 },
                new() { ResidentId = 7, ApartmentId = 7 },
                new() { ResidentId = 8, ApartmentId = 8 },
                new() { ResidentId = 9, ApartmentId = 3 },
                new() { ResidentId = 10, ApartmentId = 4 },
                new() { ResidentId = 11, ApartmentId = 5 },
                new() { ResidentId = 11, ApartmentId = 6 },
                new() { ResidentId = 12, ApartmentId = 7 },
                new() { ResidentId = 13, ApartmentId = 8 },
                new() { ResidentId = 14, ApartmentId = 1 },
            };

            foreach (ResidentApartment ra in residentApartments)
            {
                context.ResidentApartments.Add(ra);
            }

            context.SaveChanges();
        }
    }
}
