namespace MySocialNetwork.Core.Services
{
    using Microsoft.EntityFrameworkCore;
    using MySocialNetwork.Core.Contracts;
    using MySocialNetwork.Core.Models.Account;
    using MySocialNetwork.Infrastructure.Models;
    using SkiShop.Data.Common;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public class UserService : IUserService
    {
        private readonly IRepository repository;

        public UserService(IRepository repository)
        {
            this.repository = repository;
        }

        public async Task<IEnumerable<FriendViewModel>> GetAllFriends(string userId)
        {
            var user = await this.repository.All<ApplicationUser>()
                .Include(x => x.Friends)
                .Where(x => x.Id == userId)
                .FirstOrDefaultAsync();

            var friends = user.Friends.Select(x => new FriendViewModel()
            {
                UserId = x.Id,
                FirstName = x.FirstName,
                LastName = x.LastName,
                Username = x.UserName,
                ImageUrl = x.ImageUrl
            });

            return friends;
        }

        public async Task<bool> UpdateUserProfileAsync(string userId, UpdateProfileModel model)
        {
            var user = await this.repository.All<ApplicationUser>()
                .Where(x => x.Id == userId)
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return false;
            }

            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.UserName = model.UserName;
            user.ImageUrl = model.ImageUrl;
            user.Address = model.Address;

            await this.repository.SaveChangesAsync();

            return true;
        }
    }
}
