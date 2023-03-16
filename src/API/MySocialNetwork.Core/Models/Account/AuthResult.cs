namespace MySocialNetwork.Core.Models.Account
{
    public class AuthResult
    {
        public string Token { get; set; } = null!;
        public string RefreshToken { get; set; } = null!;
        public string? ImageUrl { get; set; }
        public string? Email { get; set; }
        public bool Success { get; set; }
        public List<string> Errors { get; set; } = new List<string>();
    }
}
