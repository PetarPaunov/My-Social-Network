namespace MySocialNetwork.Infrastructure
{
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore;
    using MySocialNetwork.Infrastructure.Models;

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Like> Likes { get; set; }

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

            builder.Entity<Like>()
                .HasKey(x => new { x.PostId, x.ApplicationUserId });

            builder.Entity<Like>()
                .HasOne(x => x.Post)
                .WithMany(x => x.Likes)
                .HasForeignKey(x => x.PostId)
                .OnDelete(DeleteBehavior.Restrict);

            base.OnModelCreating(builder);
        }
    }
}