namespace MySocialNetwork.Infrastructure.Models
{
    using System.ComponentModel.DataAnnotations;

    public class Request
    {
        [Required]
        public Guid Id { get; set; }

        public string RequestUserId { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string? ImageUrl { get; set; }
        public string Username { get; set; } = null!;
    }
}