namespace MySocialNetwork.Infrastructure.Models
{
    using System.ComponentModel.DataAnnotations.Schema;

    public class RefreshToken
    {
        public Guid Id { get; set; }
        public DateTime AddedDate { get; set; } = DateTime.UtcNow;
        public DateTime UpdateDate { get; set; }

        public string ApplicationUserId { get; set; } = null!; // User Id when logged in

        [ForeignKey(nameof(ApplicationUserId))]
        public ApplicationUser ApplicationUser { get; set; }

        public string Token { get; set; } = null!; // The id generated when a jwt id has beed requested
        public string JwtId { get; set; } = null!;
        public bool IsUsed { get; set; } // To be sure that the token is only used ones
        public bool IsRevoked { get; set; } // Make sure they are valid
        public DateTime ExpiryDate { get; set; }
    }
}