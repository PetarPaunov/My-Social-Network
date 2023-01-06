namespace MySocialNetwork.Core.Models.Account
{
    public class GetUserProfileModel
    {
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string UserName { get; set; } = null!;
        public string? ImageUrl { get; set; }
        public string? Address { get; set; }
    }
}