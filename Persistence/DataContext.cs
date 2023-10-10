using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Phone> Phones { get; set; }
        public DbSet<Address> Addresses { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Contact>()
                .HasOne(u => u.Owner)
                .WithMany(c => c.Contacts)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Contact>()
                .HasMany(p => p.Phones)
                .WithOne(c => c.Owner)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Contact>()
                .HasOne(a => a.ContactAddress)
                .WithOne(o => o.Owner)
                .HasForeignKey<Address>(a => a.Id)
                .OnDelete(DeleteBehavior.Cascade);

        }

    }
}
