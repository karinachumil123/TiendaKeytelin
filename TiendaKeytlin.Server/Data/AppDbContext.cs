using Microsoft.EntityFrameworkCore;
using TiendaKeytlin.Server.Models;

namespace TiendaKeytlin.Server.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configuración específica para el modelo User
            modelBuilder.Entity<User>()
                .ToTable("Users")
                .HasKey(u => u.Id);

            modelBuilder.Entity<User>()
                .Property(u => u.Id)
                .HasColumnName("Id")
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<User>()
                .Property(u => u.Username)
                .HasColumnName("Username")
                .IsRequired();

            modelBuilder.Entity<User>()
                .Property(u => u.Password)
                .HasColumnName("Password")
                .IsRequired();

            modelBuilder.Entity<User>()
                .Property(u => u.Name)
                .HasColumnName("Name")
                .IsRequired();
        }
    }
}