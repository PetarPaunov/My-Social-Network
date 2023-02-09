namespace MySocialNetwork.Infrastructure.Models
{
    public class Like
    {
        public Guid PostId { get; set; }
        public Post Post { get; set; } = null!;

        public string ApplicationUserId { get; set; } = null!;
        public ApplicationUser ApplicationUser { get; set; } = null!;
    }
}