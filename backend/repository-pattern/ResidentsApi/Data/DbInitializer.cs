using Microsoft.EntityFrameworkCore;
using ResidentsApi.DAL;
namespace ResidentsApi.Data
{
    public static class DbInitializer {
        public static void Initialize(ResidentDBContext context) {
            context.Database.EnsureCreated();
            if (context.Residents.Any()) {
                return;
            }
            var residents = new Resident[] {
                new Resident { Name = "Carson Alexander", Address = "123 Main St", PhoneNumber = "555-555-5555", Email = ""},
                new Resident { Name = "Meredith Alonso", Address = "123 Main St", PhoneNumber = "555-555-5555", Email = ""},
                new Resident { Name = "Arturo Anand", Address = "456 Maple St", PhoneNumber = "555-123-4567", Email = "arturo.anand@example.com"},
                new Resident { Name = "Gytis Barzdukas", Address = "789 Oak St", PhoneNumber = "555-987-6543", Email = "gytis.barzdukas@example.com"},
                new Resident { Name = "Yan Li", Address = "321 Pine St", PhoneNumber = "555-456-7890", Email = "yan.li@example.com"},
                new Resident { Name = "Peggy Justice", Address = "654 Elm St", PhoneNumber = "555-321-0987", Email = "peggy.justice@example.com"},
                new Resident { Name = "Laura Norman", Address = "987 Birch St", PhoneNumber = "555-654-3210", Email = "laura.norman@example.com"},
                new Resident { Name = "Nino Olivetto", Address = "234 Cedar St", PhoneNumber = "555-789-0123", Email = "nino.olivetto@example.com"},
                new Resident { Name = "John Doe", Address = "123 Oak St", PhoneNumber = "555-123-4567", Email = "john.doe@example.com"},
                new Resident { Name = "Jane Smith", Address = "456 Maple St", PhoneNumber = "555-234-5678", Email = "jane.smith@example.com"},
                new Resident { Name = "Bob Johnson", Address = "789 Willow St", PhoneNumber = "555-345-6789", Email = "bob.johnson@example.com"},
                new Resident { Name = "Alice Williams", Address = "012 Cherry St", PhoneNumber = "555-456-7890", Email = "alice.williams@example.com"},
                new Resident { Name = "Charlie Brown", Address = "345 Spruce St", PhoneNumber = "555-567-8901", Email = "charlie.brown@example.com"},
                new Resident { Name = "Diana Davis", Address = "678 Sycamore St", PhoneNumber = "555-678-9012", Email = "diana.davis@example.com"}
            };

            foreach (Resident r in residents) {
                context.Residents.Add(r);      
            }

            context.SaveChanges();

            var apartments = new Apartment[] {
                new Apartment { RoomNumber = 101, Address = "123 Main"},
                new Apartment { RoomNumber = 102, Address = "123 Main St" },
                new Apartment { RoomNumber = 103, Address = "456 Maple St" },
                new Apartment { RoomNumber = 201, Address = "789 Oak St" },
                new Apartment { RoomNumber = 202, Address = "321 Pine St" },
                new Apartment { RoomNumber = 203, Address = "654 Elm St" },
                new Apartment { RoomNumber = 301, Address = "987 Birch St" },
                new Apartment { RoomNumber = 302, Address = "234 Cedar St" }            
            };

            foreach (Apartment a in apartments) {
                context.Apartments.Add(a);
            }

            context.SaveChanges();

            var residentApartments = new ResidentApartment[] {
                new ResidentApartment { ResidentId = 1, ApartmentId = 1 },
                new ResidentApartment { ResidentId = 2, ApartmentId = 1 },
                new ResidentApartment { ResidentId = 3, ApartmentId = 1 },
                new ResidentApartment { ResidentId = 2, ApartmentId = 2 },
                new ResidentApartment { ResidentId = 3, ApartmentId = 2 },
                new ResidentApartment { ResidentId = 4, ApartmentId = 3 },
                new ResidentApartment { ResidentId = 4, ApartmentId = 4 },
                new ResidentApartment { ResidentId = 5, ApartmentId = 5 },
                new ResidentApartment { ResidentId = 6, ApartmentId = 6 },
                new ResidentApartment { ResidentId = 7, ApartmentId = 7 },
                new ResidentApartment { ResidentId = 8, ApartmentId = 8 },
                new ResidentApartment { ResidentId = 9, ApartmentId = 3 },
                new ResidentApartment { ResidentId = 10, ApartmentId = 4 },
                new ResidentApartment { ResidentId = 11, ApartmentId = 5 },
                new ResidentApartment { ResidentId = 11, ApartmentId = 6 }, 
                new ResidentApartment { ResidentId = 12, ApartmentId = 7 },
                new ResidentApartment { ResidentId = 13, ApartmentId = 8 },
                new ResidentApartment { ResidentId = 14, ApartmentId = 1 },
            };

            foreach (ResidentApartment ra in residentApartments) {
                context.ResidentApartments.Add(ra);
            }

            context.SaveChanges();
        }
    }
}

