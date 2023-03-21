namespace MySocialNetwork.Core.Services
{
    using Microsoft.EntityFrameworkCore;
    using MySocialNetwork.Core.Contracts;
    using MySocialNetwork.Core.Models.Request;
    using MySocialNetwork.Infrastructure.Models;
    using SkiShop.Data.Common;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public class RequestService : IRequestService
    {
        private readonly IRepository repository;

        public RequestService(IRepository repository)
        {
            this.repository = repository;
        }

        public async Task Accept(string userId, string requestId)
        {
            var user = await this.repository.All<ApplicationUser>()
                .Include(x => x.Requests)
                .FirstOrDefaultAsync(x => x.Id == userId);

            var guidRequestId = new Guid(requestId);

            var request = user.Requests
                .Where(x => x.Id == guidRequestId)
                .FirstOrDefault();

            var friend = await this.repository.All<ApplicationUser>()
                .FirstOrDefaultAsync(x => x.Id == request.RequestUserId);

            user.Friends.Add(friend);
            friend.Friends.Add(user);

            user.Requests.Remove(request);

            await this.repository.DeleteAsync<Request>(guidRequestId);

            await this.repository.SaveChangesAsync();
        }

        public async Task Decline(string userId, string requestId)
        {
            var user = await this.repository.All<ApplicationUser>()
                .Include(x => x.Requests)
                .FirstOrDefaultAsync(x => x.Id == userId);

            var guidRequestId = new Guid(requestId);

            var request = user.Requests
                .Where(x => x.Id == guidRequestId)
                .FirstOrDefault();

            var friend = await this.repository.All<ApplicationUser>()
                .FirstOrDefaultAsync(x => x.Id == request.RequestUserId);

            user.Requests.Remove(request);

            await this.repository.DeleteAsync<Request>(guidRequestId);

            await this.repository.SaveChangesAsync();
        }

        public async Task<IEnumerable<RequestViewModel>> GetRequests(string userId)
        {
            var user = await this.repository.All<ApplicationUser>()
                .Include(x => x.Requests)
                .FirstOrDefaultAsync(x => x.Id == userId);

            return user.Requests.Select(x => new RequestViewModel()
            {
                RequestId = x.Id,
                UserId = x.RequestUserId,
                FirstName = x.FirstName,
                LastName = x.LastName,
                Username = x.Username,
                ImageUrl = x.ImageUrl,
            })
            .ToList();
        }

        public async Task Send(ApplicationUser sender, string resciverId)
        {
            var resciver = await this.repository.GetByIdAsync<ApplicationUser>(resciverId);

            var request = new Request()
            {
                RequestUserId = sender.Id,
                FirstName = sender.FirstName,
                LastName = sender.LastName,
                Username = sender.UserName,
                ImageUrl = sender.ImageUrl
            };

            resciver.Requests.Add(request);

            await this.repository.SaveChangesAsync();
        }
    }
}