using Microsoft.EntityFrameworkCore;
namespace ResidentsApi.Models;
public class ResidentContext : DbContext
{
    public ResidentContext(DbContextOptions<ResidentContext> options)
        : base(options)
    { 
    }

    public DbSet<Resident> Residents { get; set; }
    public DbSet<Apartment> Apartments { get; set; }
    public DbSet<ResidentApartment> ResidentApartments { get; set; }

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