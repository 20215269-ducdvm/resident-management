using Microsoft.EntityFrameworkCore;
namespace ResidentsApi.DAL
{
    public class ResidentDBContext : DbContext
    {
        // Constructor that will be used in the DI container
        // [ActivatorUtilitiesConstructor]
        
        // public ResidentDBContext(DbContextOptions<ResidentDBContext> options) 
        //     : base(options)
        // {
        // }

        // Constructor that will be used in Unit of Work
        public ResidentDBContext() 
            : base()
        {
        }
        public virtual DbSet<Resident> Residents { get; set; }
        public virtual DbSet<Apartment> Apartments { get; set; }
        public virtual DbSet<ResidentApartment> ResidentApartments { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=residentv2;Username=postgres;Password=anhbopcolen;SslMode=prefer;Timeout=10");
            }
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ResidentApartment>()
                .HasKey(ra => new { ra.ResidentId, ra.ApartmentId });

            modelBuilder.Entity<ResidentApartment>()
                .HasOne(ra => ra.Resident)
                .WithMany(r => r.ResidentApartments)
                .HasForeignKey(ra => ra.ResidentId);

            modelBuilder.Entity<ResidentApartment>()
                .HasOne(ra => ra.Apartment)
                .WithMany(a => a.ResidentApartments)
                .HasForeignKey(ra => ra.ApartmentId);
        }
    }
}