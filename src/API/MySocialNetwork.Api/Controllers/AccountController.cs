namespace MySocialNetwork.Api.Controllers
{
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using Microsoft.IdentityModel.Tokens;
    using MySocialNetwork.Core.Configuration;
    using MySocialNetwork.Core.Models.Account;
    using MySocialNetwork.Infrastructure.Models;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;

    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly JwtConfig jwtConfig;

        public AccountController(
            UserManager<ApplicationUser> userManager, 
            IOptionsMonitor<JwtConfig> optionsMonitor)
        {
            this.userManager = userManager;
            this.jwtConfig = optionsMonitor.CurrentValue;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] ApplicationUserRegisterModel request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var emailExists = await this.userManager.FindByEmailAsync(request.Email);

            if (emailExists != null)
            {
                return BadRequest(new AuthResult()
                {
                    Success = false,
                    Errors = new List<string>()
                    {
                        "Email already in use"
                    }
                });
            }

            var user = new ApplicationUser()
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                UserName = request.UserName,
                Email = request.Email
            };

            var result = await this.userManager.CreateAsync(user, request.Password);

            if (!result.Succeeded)
            {
                return BadRequest(new AuthResult()
                {
                    Success = result.Succeeded,
                    Errors = result.Errors
                        .Select(x => x.Description)
                        .ToList()
                });
            }

            var token = GenerateJwtToken(user);

            return Ok(new AuthResult()
            {
                Token = token,
                Success = true,
            });
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] ApplicationUserLoginModel request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new AuthResult()
                {
                    Success = false,
                    Errors = new List<string>()
                    {
                        "Something went wrong!"
                    }
                });
            }

            var user = await this.userManager.FindByEmailAsync(request.Email);

            if (user == null)
            {
                return BadRequest(new AuthResult()
                {
                    Success = false,
                    Errors = new List<string>()
                    {
                        "Invalid authentication request"
                    }
                });
            }

            var isCorrect = await this.userManager.CheckPasswordAsync(user, request.Password);

            if (!isCorrect)
            {
                return BadRequest(new AuthResult()
                {
                    Success = false,
                    Errors = new List<string>()
                    {
                        "Invalid authentication request"
                    }
                });
            }

            var jwtToken = GenerateJwtToken(user);

            return Ok(new AuthResult()
            {
                Token = jwtToken,
                Success = true
            });
        }

        private string GenerateJwtToken(ApplicationUser user)
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

            return jwtToken;
        }
    }
}