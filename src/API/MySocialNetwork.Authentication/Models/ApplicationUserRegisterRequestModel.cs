namespace MySocialNetwork.Authentication.Models
{
    using System.ComponentModel.DataAnnotations;

    public class ApplicationUserRegisterRequestModel
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

        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;

        [Required]
        public string Password { get; set; } = null!;

        [Compare(nameof(Password))]
        public string PasswordConfirm { get; set; } = null!;
    }
}
