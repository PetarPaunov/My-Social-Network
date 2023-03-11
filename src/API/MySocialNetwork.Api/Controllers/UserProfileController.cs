namespace MySocialNetwork.Api.Controllers
{
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore.Metadata.Internal;
    using MySocialNetwork.Core.Contracts;
    using MySocialNetwork.Core.Models.Account;
    using MySocialNetwork.Infrastructure.Models;

    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserService userService;
        private readonly UserManager<ApplicationUser> userManager;

        public UserProfileController(IUserService userService, UserManager<ApplicationUser> userManager)
        {
            this.userService = userService;
            this.userManager = userManager;
        }

        [HttpGet]
        [Route("user-profile")]
        public async Task<IActionResult> UserProfile()
        {
            var loggedInUser = await this.userManager.GetUserAsync(this.HttpContext.User);

            if (loggedInUser == null)
            {
                return BadRequest("User not found!");
            }

            var userProfile = new GetUserProfileModel()
            {
                FirstName = loggedInUser.FirstName,
                LastName = loggedInUser.LastName,
                UserName = loggedInUser.UserName,
                Address = loggedInUser.Address,
                ImageUrl = loggedInUser.ImageUrl
            };

            return Ok(userProfile);
        }

        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> Update([FromForm]UpdateProfileModel request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid Payload");
            }

            var loggedInUser = await this.userManager.GetUserAsync(this.HttpContext.User);

            if (loggedInUser == null)
            {
                return BadRequest("User not found!");
            }

            var user = await this.userService.UpdateUserProfileAsync(loggedInUser.Id, request);

            return Ok(user);
        }

        [HttpGet]
        [Route("friends")]
        public async Task<IActionResult> GetAllFriends()
        {
            var loggedInUser = await this.userManager.GetUserAsync(this.HttpContext.User);

            var friends = await this.userService.GetAllFriends(loggedInUser.Id);

            return Ok(friends);
        }

        [HttpGet]
        [Route("all-users")]
        public async Task<IActionResult> GetAllLoggedInUsers()
        {
            var users = await this.userService.GetAllLoggedInUsers();

            return Ok(users);
        }
    }
}