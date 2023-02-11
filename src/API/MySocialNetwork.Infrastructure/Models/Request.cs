namespace MySocialNetwork.Infrastructure.Models
{
    using System.ComponentModel.DataAnnotations;

    public class Request
    {
        [Required]
        public Guid Id { get; set; }

        public string ApplicationUserId { get; set; } = null!;
        public ApplicationUser ApplicationUser { get; set; } = null!;
    }
}