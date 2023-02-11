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

        public async Task<IEnumerable<RequestViewModel>> GetRequests(string userId)
        {
            var user = await this.repository.All<ApplicationUser>()
                .Include(x => x.Requests)
                .FirstOrDefaultAsync(x => x.Id == userId);

            return user.Requests.Select(x => new RequestViewModel()
            {
                UserId = x.ApplicationUser.Id,
                FirstName = x.ApplicationUser.FirstName,
                LastName = x.ApplicationUser.LastName,
                Username = x.ApplicationUser.UserName
            })
            .ToList();
        }

        public async Task Send(ApplicationUser sender, string resciverId)
        {
            var resciver = await this.repository.GetByIdAsync<ApplicationUser>(resciverId);

            var request = new Request()
            {
                ApplicationUserId = sender.Id,
                ApplicationUser = sender
            };

            resciver.Requests.Add(request);

            await this.repository.SaveChangesAsync();
        }
    }
}