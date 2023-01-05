namespace MySocialNetwork.Core.Services
{
    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Options;
    using Microsoft.IdentityModel.Tokens;
    using MySocialNetwork.Core.Configuration;
    using MySocialNetwork.Core.Contracts;
    using MySocialNetwork.Core.Models.Account;
    using MySocialNetwork.Infrastructure.Models;
    using SkiShop.Data.Common;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;

    public class JwtTokenService : IJwtTokenService
    {
        private readonly IRepository repository;
        private readonly TokenValidationParameters validationParameters;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly JwtConfig jwtConfig;

        public JwtTokenService
            (IRepository repository, 
             TokenValidationParameters validationParameters,
             UserManager<ApplicationUser> userManager,
             IOptionsMonitor<JwtConfig> optionsMonitor)
        {
            this.repository = repository;
            this.validationParameters = validationParameters;
            this.userManager = userManager;
            this.jwtConfig = optionsMonitor.CurrentValue;
        }

        public async Task<RefreshToken> CreateToken(string userId, string tokenId)
        {
            var refreshToken = new RefreshToken()
            {
                AddedDate = DateTime.UtcNow,
                Token = $"{RandomStringGenerator(25)}_{Guid.NewGuid()}",
                ApplicationUserId = userId,
                IsRevoked = false,
                IsUsed = false,
                JwtId = tokenId,
                ExpiryDate = DateTime.UtcNow.AddMonths(6),
            };

            await repository.AddAsync<RefreshToken>(refreshToken);
            await repository.SaveChangesAsync();

            return refreshToken;
        }

        public string RandomStringGenerator(int length)
        {
            var random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

            return new string(Enumerable.Repeat(chars, length)
                .Select(x => x[random.Next(x.Length)]).ToArray());
        }

        public async Task<AuthResult> VerifyToken(TokenRequestModel model)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            try
            {
                var principal = tokenHandler.ValidateToken
                    (model.JwtToken, this.validationParameters, out var validatedToke);

                if (validatedToke is JwtSecurityToken jwtSecurityToken)
                {
                    var result = jwtSecurityToken.Header.Alg.Equals
                        (SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase);

                    if (result == false)
                    {
                        return null;
                    }
                }

                var utcExpiryDate = long.Parse(principal.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Exp).Value);

                var expDate = UnixTimeStampToDateTime(utcExpiryDate);

                // Checking if the jwt token has not expired
                if (expDate > DateTime.UtcNow)
                {
                    return new AuthResult()
                    {
                        Success = false,
                        Errors = new List<string>()
                        {
                            "Jwt token has not expired"
                        },
                    };
                }

                // Check if the refresh token exists

                var refreshToken = await GetRefreshTokenAsync(model.RefreshToken);

                if (refreshToken == null)
                {
                    return new AuthResult()
                    {
                        Success = false,
                        Errors = new List<string>()
                        {
                            "Invalid refresh token"
                        },
                    };
                }

                // Check the expiry date of refresh token
                if (refreshToken.ExpiryDate < DateTime.UtcNow)
                {
                    return new AuthResult()
                    {
                        Success = false,
                        Errors = new List<string>()
                        {
                            "Refresh token has expired pls log-in again"
                        },
                    };
                }

                // Check if refresh token has been used or not
                if (refreshToken.IsUsed)
                {
                    return new AuthResult()
                    {
                        Success = false,
                        Errors = new List<string>()
                        {
                            "Refresh token has used it cannot be reused"
                        },
                    };
                }

                // Check if token is revoked
                if (refreshToken.IsRevoked)
                {
                    return new AuthResult()
                    {
                        Success = false,
                        Errors = new List<string>()
                        {
                            "Refresh token has beedn revoked, it cannot be used"
                        },
                    };
                }

                var jti = principal.Claims.SingleOrDefault(x => x.Type == JwtRegisteredClaimNames.Jti).Value;

                if (refreshToken.JwtId != jti)
                {
                    return new AuthResult()
                    {
                        Success = false,
                        Errors = new List<string>()
                        {
                            "Refresh token reference does not mach the Jwt token"
                        },
                    };
                }

                refreshToken.IsUsed = true;

                var updateResult = await MarkRefreshTokenAsUsed(refreshToken);

                if (!updateResult)
                {
                    return new AuthResult()
                    {
                        Success = false,
                        Errors = new List<string>()
                        {
                            "Error processing request"
                        },
                    };
                }

                var user = await userManager.FindByIdAsync(refreshToken.ApplicationUserId);

                if (user == null)
                {
                    return new AuthResult()
                    {
                        Success = false,
                        Errors = new List<string>()
                        {
                            "Error processing request"
                        },
                    };
                }

                var token = await GenerateJwtToken(user);

                return new AuthResult()
                {
                    Token = token.JwtToken,
                    Success = true,
                    RefreshToken = token.RefreshToken,
                };

            }
            catch (Exception e)
            {
                return null;
            }
        }

        public async Task<TokenRequestModel> GenerateJwtToken(ApplicationUser user)
        {
            var jwtHandler = new JwtSecurityTokenHandler();

            var key = Encoding.ASCII.GetBytes(this.jwtConfig.Secret);

            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("Id", user.Id),
                    new Claim(JwtRegisteredClaimNames.Sub, user.Email), // unique Id
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()), // used by the refresh token
                }),
                Expires = DateTime.UtcNow.Add(this.jwtConfig.ExpiryTimeFrame), // TODO: update that expiration time to minutes
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            };

            // generate the security token 
            var token = jwtHandler.CreateToken(tokenDescriptor);

            var jwtToken = jwtHandler.WriteToken(token);

            var refreshToken = await CreateToken(user.Id, token.Id);

            var tokenData = new TokenRequestModel()
            {
                RefreshToken = refreshToken.Token,
                JwtToken = jwtToken,
            };

            return tokenData;
        }

        private async Task<bool> MarkRefreshTokenAsUsed(RefreshToken refreshToken)
        {
            var token = await this.repository.All<RefreshToken>()
                .Where(x => x.Token.ToLower() == refreshToken.Token.ToLower())
                .FirstOrDefaultAsync();

            if (token == null)
            {
                return false;
            }

            token.IsUsed = refreshToken.IsUsed;
            await this.repository.SaveChangesAsync();

            return true;
        }

        public async Task<RefreshToken> GetRefreshTokenAsync(string refreshToken)
        {
            var token = await this.repository.All<RefreshToken>()
                .Where(x => x.Token.ToLower() == refreshToken.ToLower())
                .FirstOrDefaultAsync();

            return token;
        }

        private DateTime UnixTimeStampToDateTime(long utcExpiryDate)
        {
            // Sets the time to 1, Jan, 1970
            var dateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);

            // Add the number of seconds from 1 Jan 1970
            dateTime = dateTime.AddSeconds(utcExpiryDate).ToUniversalTime();

            return dateTime;
        }
    }
}
