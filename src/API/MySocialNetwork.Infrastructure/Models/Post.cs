namespace MySocialNetwork.Infrastructure.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Post
    {
        public Post()
        {
            this.Likes = new HashSet<Like>();
            this.Comments = new HashSet<Comment>();
        }

        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Title { get; set; } = null!;

        [Required]
        [MaxLength(5000)]
        public string Description { get; set; } = null!;

        public string? ImageUrl { get; set; }

        public string ApplicationUserId { get; set; }

        [ForeignKey(nameof(ApplicationUserId))]
        public ApplicationUser ApplicationUser { get; set; }

        public DateTime CreationDate { get; set; }

        public bool IsDeleted { get; set; } = false;

        public ICollection<Like> Likes { get; set; }

        public ICollection<Comment> Comments { get; set; }
    }
}