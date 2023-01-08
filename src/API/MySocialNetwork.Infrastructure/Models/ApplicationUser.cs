namespace MySocialNetwork.Infrastructure.Models
{
    using Microsoft.AspNetCore.Identity;
    using System.ComponentModel.DataAnnotations;

    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser()
        {
            this.Posts = new HashSet<Post>();
            this.Comments = new HashSet<Comment>();
        }

        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; } = null!;

        [Required]
        [MaxLength(50)]
        public string LastName { get; set; } = null!;

        public string? ImageUrl { get; set; }
        public string? Address { get; set; }

        public ICollection<Post> Posts { get; set; }

        public ICollection<Comment> Comments { get; set; }
    }
}