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
        private readonly ILikeService likeService;

        public PostController(IPostService postService, 
                              UserManager<ApplicationUser> userManager,
                              ILikeService likeService)
        {
            this.postService = postService;
            this.userManager = userManager;
            this.likeService = likeService;
        }

        [HttpGet]
        [Route("all")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllPosts()
        {
            var posts = await this.postService.GetAllPostsAsync();

            return Ok(posts);
        }

        [HttpGet]
        [Route("get-user-posts")]
        public async Task<IActionResult> GetUserPosts()
        {
            var loggedInUser = await this.userManager.GetUserAsync(this.HttpContext.User);

            var posts = await this.postService.GetUserPosts(loggedInUser.Id);

            return Ok(posts);
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

        [HttpGet]
        [Route("get-for-update")]
        public async Task<IActionResult> GetForUpdate([FromQuery] string postId)
        {
            var guidId = new Guid(postId);
            var loggedInUser = await this.userManager.GetUserAsync(this.HttpContext.User);

            var post = await this.postService.GetForUpdateAsync(guidId, loggedInUser.Id);

            if (post == null)
            {
                return BadRequest("Somethig went wrong!");
            }

            return Ok(post);
        }

        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> UpdatePost([FromForm] UpdatePostModel model)
        {
            var loggedInUser = await this.userManager.GetUserAsync(this.HttpContext.User);

            bool isUpdated = await this.postService.UpdatePostAsync(model, loggedInUser.Id);

            if (!isUpdated)
            {
                return BadRequest("Somethig went wrong!");
            }

            return Ok("Success");
        }

        [HttpDelete]
        [Route("delete")]
        public async Task<IActionResult> DeletePost([FromQuery] string postId)
        {
            var postGuid = new Guid(postId);

            var isDeleted = await this.postService.DeletePostAsync(postGuid);

            if (!isDeleted)
            {
                return BadRequest("Somethig went wrong!");
            }

            return Ok("Success");
        }

        [HttpPost]
        [Route("toggle-like")]
        public async Task<IActionResult> LikePost([FromQuery] string postId)
        {
            var loggedInUser = await this.userManager.GetUserAsync(this.HttpContext.User);

            var postGuid = new Guid(postId);

            var isLiked = await this.likeService.IsLiked(loggedInUser.Id, postGuid);

            if (!isLiked)
            {
                await this.likeService.AddLike(loggedInUser.Id, postGuid);
            }
            else
            {
                await this.likeService.RemoveLike(loggedInUser.Id, postGuid);
            }

            return Ok("Success");
        }
    }
}