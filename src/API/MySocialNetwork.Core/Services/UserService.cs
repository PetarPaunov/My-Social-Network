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
        private readonly ICommonService commonService;

        public UserService(IRepository repository, ICommonService commonService)
        {
            this.repository = repository;
            this.commonService = commonService;
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

        public async Task<IEnumerable<FriendViewModel>> GetAllLoggedInUsers()
        {
            var users = await this.repository.AllReadonly<ApplicationUser>()
                .Select(x => new FriendViewModel()
                {
                    UserId = x.Id,
                    Username = x.UserName,
                    ImageUrl = x.ImageUrl,
                    FirstName = x.FirstName,
                    LastName = x.LastName
                })
                .ToListAsync();

            return users;
        }

        public async Task<GetUserProfileModel> UpdateUserProfileAsync(string userId, UpdateProfileModel model)
        {
            var user = await this.repository.All<ApplicationUser>()
                .Where(x => x.Id == userId)
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return null;
            }

            if (model.Image != null)
            {
                var imageUrl = await this.commonService.UploadImage(model.Image);
                user.ImageUrl = imageUrl;

            }

            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.UserName = model.UserName;
            user.Address = model.Address;

            await this.repository.SaveChangesAsync();

            var updatedUser = new GetUserProfileModel()
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                UserName = user.UserName,
                ImageUrl = user.ImageUrl,
                Address = user.Address
            };

            return updatedUser;
        }
    }
}