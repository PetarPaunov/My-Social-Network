namespace MySocialNetwork.Core.Models.Account
{
    public class TokenRequestModel
    {
        public string Token { get; set; } = null!;
        public string RefreshToken { get; set; } = null!;
    }
}
