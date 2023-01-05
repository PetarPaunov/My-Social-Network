namespace MySocialNetwork.Core.Contracts
{
    using MySocialNetwork.Core.Models.Account;
    using MySocialNetwork.Infrastructure.Models;

    public interface IJwtTokenService
    {
        Task<RefreshToken> CreateToken(string userId, string tokenId);
        Task<AuthResult> VerifyToken(TokenRequestModel model);
        string RandomStringGenerator(int length);
        Task<TokenRequestModel> GenerateJwtToken(ApplicationUser user);
    }
}
