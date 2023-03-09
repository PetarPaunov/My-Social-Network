namespace MySocialNetwork.Core.Models.Account
{
    using Microsoft.AspNetCore.Http;
    using System.ComponentModel.DataAnnotations;

    public class UpdateProfileModel
    {
        [Required]
        [StringLength(50, MinimumLength = 3)]
        public string FirstName { get; set; } = null!;

        [Required]
        [StringLength(50, MinimumLength = 3)]
        public string LastName { get; set; } = null!;

        [Required]
        [StringLength(50, MinimumLength = 3)]
        public string UserName { get; set; } = null!;
        public IFormFile? Image { get; set; }
        public string? Address { get; set; }
    }
}