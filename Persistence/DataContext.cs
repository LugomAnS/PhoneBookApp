﻿using Domain;
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
        public DbSet<ContactCategory> Categories { get; set; }
        public DbSet<UserPhoto> UserPhotos { get; set; }
        public DbSet<ContactPhoto> ContactsPhotos { get; set; }


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

            builder.Entity<Contact>()
                .HasOne(p => p.Photo)
                .WithOne(a => a.Owner)
                .HasForeignKey<ContactPhoto>(p => p.Id);

            builder.Entity<ContactCategory>()
                .HasOne(c => c.CategoryOwner)
                .WithMany(o => o.Categories);

            builder.Entity<ContactCategory>()
                .HasMany(c => c.Contacts)
                .WithOne(o => o.Category)
                .HasForeignKey(c => c.CategoryId);

            builder.Entity<UserPhoto>()
                .HasOne(p => p.Owner)
                .WithOne(u => u.UserPhoto)
                .HasForeignKey<AppUser>(u => u.Id);

            builder.Entity<UserPhoto>()
                .HasOne(p => p.Owner)
                .WithOne(u => u.UserPhoto)
                .HasPrincipalKey<UserPhoto>(p => p.Id);

        }

    }
}
