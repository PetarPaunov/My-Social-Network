namespace MySocialNetwork.Infrastructure.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Comment
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        [MaxLength(5000)]
        public string Description { get; set; } = null!;

        public Guid PostId { get; set; }

        [ForeignKey(nameof(PostId))]
        public Post Post { get; set; }

        public string ApplicationUserId { get; set; }

        [ForeignKey(nameof(ApplicationUserId))]
        public ApplicationUser ApplicationUser { get; set; }

        public DateTime CreationDate { get; set; }

        public bool IsDeleted { get; set; } = false;
    }
}