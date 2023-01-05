namespace MySocialNetwork.Core.Models.Account
{
    public class TokenRequestModel
    {
        public string JwtToken { get; set; } = null!;
        public string RefreshToken { get; set; } = null!;
    }
}
