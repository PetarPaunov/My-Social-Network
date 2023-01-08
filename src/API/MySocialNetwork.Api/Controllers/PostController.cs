namespace MySocialNetwork.Api.Controllers
{
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using MySocialNetwork.Core.Contracts;
    using MySocialNetwork.Core.Models.Post;
    using MySocialNetwork.Infrastructure.Models;

    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostService postService;
        private readonly UserManager<ApplicationUser> userManager;


        public PostController(IPostService postService, UserManager<ApplicationUser> userManager)
        {
            this.postService = postService;
            this.userManager = userManager;
        }

        [HttpPost]
        [Route("add-post")]
        public async Task<IActionResult> AddPost([FromForm] AddPostModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var loggedInUser = await this.userManager.GetUserAsync(this.HttpContext.User);

            if (loggedInUser == null)
            {
                return BadRequest("User not found!");
            }

            var success = await this.postService.AddPostAsync(model, loggedInUser.Id);

            if (!success)
            {
                return BadRequest("Something went wrong!");
            }

            return Ok();
        }

    }
}
