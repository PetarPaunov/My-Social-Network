namespace MySocialNetwork.Core.Models.Account
{
    using System.ComponentModel.DataAnnotations;

    public class ApplicationUserLoginModel
    {
        [Required]
        public string Email { get; set; } = null!;

        [Required]
        public string Password { get; set; } = null!;
    }
}