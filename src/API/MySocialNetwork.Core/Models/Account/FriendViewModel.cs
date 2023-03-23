namespace MySocialNetwork.Core.Models.Account
{
    public class FriendViewModel
    {
        public string UserId { get; set; } = null!;
        public string Username { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string? ImageUrl { get; set; }
        public string? Address { get; set; }
    }
}
