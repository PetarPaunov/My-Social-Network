namespace MySocialNetwork.Api.Controllers
{
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using MySocialNetwork.Core.Contracts;
    using MySocialNetwork.Infrastructure.Models;

    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    public class RequestController : ControllerBase
    {
        private readonly IRequestService requestService;
        private readonly UserManager<ApplicationUser> userManager;


        public RequestController(IRequestService requestService,
                                 UserManager<ApplicationUser> userManager)
        {
            this.requestService = requestService;
            this.userManager = userManager;
        }

        [HttpGet]
        [Route("all-requests")]
        public async Task<IActionResult> GetAllRequests()
        {
            var loggedInUser = await this.userManager.GetUserAsync(this.HttpContext.User);

            var requests = await this.requestService.GetRequests(loggedInUser.Id);

            return Ok(requests);
        }

        [HttpPost]
        [Route("send")]
        public async Task<IActionResult> SendRequest([FromQuery] string userId)
        {
            var loggedInUser = await this.userManager.GetUserAsync(this.HttpContext.User);

            await this.requestService.Send(loggedInUser, userId);

            return Ok("Success");
        }

        [HttpPost]
        [Route("accept")]
        public async Task<IActionResult> AcceptRequest([FromQuery] string requestId)
        {
            var loggedInUser = await this.userManager.GetUserAsync(this.HttpContext.User);

            await this.requestService.Accept(loggedInUser.Id, requestId);

            return Ok("Success");
        }

        [HttpPost]
        [Route("decline")]
        public async Task<IActionResult> DeclineRequest([FromQuery] string requestId)
        {
            var loggedInUser = await this.userManager.GetUserAsync(this.HttpContext.User);

            await this.requestService.Decline(loggedInUser.Id, requestId);

            return Ok("Success");
        }
    }
}