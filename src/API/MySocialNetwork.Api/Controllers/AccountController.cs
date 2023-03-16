namespace MySocialNetwork.Api.Controllers
{
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using Microsoft.IdentityModel.Tokens;
    using MySocialNetwork.Core.Configuration;
    using MySocialNetwork.Core.Contracts;
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
        private readonly TokenValidationParameters validationParameters;
        private readonly IJwtTokenService jwtTokenService;
        private readonly JwtConfig jwtConfig;

        public AccountController(
            UserManager<ApplicationUser> userManager, 
            IOptionsMonitor<JwtConfig> optionsMonitor,
            TokenValidationParameters validationParameters,
            IJwtTokenService jwtTokenService)
        {
            this.userManager = userManager;
            this.jwtConfig = optionsMonitor.CurrentValue;
            this.validationParameters = validationParameters;
            this.jwtTokenService = jwtTokenService;
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

            var tokenResult = await this.jwtTokenService.GenerateJwtToken(user);

            return Ok(new AuthResult()
            {
                Token = tokenResult.JwtToken,
                RefreshToken = tokenResult.RefreshToken,
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

            var result = await this.jwtTokenService.GenerateJwtToken(user);

            return Ok(new AuthResult()
            {
                Token = result.JwtToken,
                RefreshToken = result.RefreshToken,
                ImageUrl = user.ImageUrl,
                Email = user.Email,
                Success = true
            });
        }

        [HttpPost]
        [Route("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] TokenRequestModel requestModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new AuthResult()
                {
                    Success = false,
                    Errors = new List<string>()
                    {
                        "Invalid payload"
                    }
                });
            }

            var result = await jwtTokenService.VerifyToken(requestModel);

            if (result == null)
            {
                return BadRequest(new AuthResult()
                {
                    Success = false,
                    Errors = new List<string>()
                    {
                        "Token validation faild"
                    }
                });
            }

            return Ok(result);
        }
    }
}