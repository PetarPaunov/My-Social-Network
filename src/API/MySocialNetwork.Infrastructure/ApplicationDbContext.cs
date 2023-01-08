namespace MySocialNetwork.Infrastructure
{
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
    using Microsoft.Data.SqlClient;
    using Microsoft.EntityFrameworkCore;
    using MySocialNetwork.Infrastructure.Models;
    using System.Security.Cryptography.X509Certificates;

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Post> Posts { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Comment>()
                .HasOne(x => x.Post)
                .WithMany(x => x.Comments)
                .HasForeignKey(x => x.PostId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Post>()
                .Property(x => x.IsDeleted)
                .HasDefaultValue(false);

            builder.Entity<Comment>()
                .Property(x => x.IsDeleted)
                .HasDefaultValue(false);

            base.OnModelCreating(builder);
        }
    }
}
