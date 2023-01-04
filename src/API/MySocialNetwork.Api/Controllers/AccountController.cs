namespace MySocialNetwork.Api.Controllers
{
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using MySocialNetwork.Core.Configuration;
    using MySocialNetwork.Core.Models.Account;
    using MySocialNetwork.Infrastructure.Models;

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

            return null;
        }
    }
}
