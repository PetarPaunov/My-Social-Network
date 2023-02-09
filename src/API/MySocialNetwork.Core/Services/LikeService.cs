namespace MySocialNetwork.Core.Services
{
    using Microsoft.EntityFrameworkCore;
    using MySocialNetwork.Core.Contracts;
    using MySocialNetwork.Infrastructure.Models;
    using SkiShop.Data.Common;

    public class LikeService : ILikeService
    {
        private readonly IRepository repository;

        public LikeService(IRepository repository)
        {
            this.repository = repository;
        }

        public async Task AddLike(string userId, Guid postId)
        {
            var like = new Like()
            {
                ApplicationUserId = userId,
                PostId = postId
            };

            await this.repository.AddAsync<Like>(like);
            await this.repository.SaveChangesAsync();

        }

        public async Task<bool> IsLiked(string userId, Guid postId)
        {
            var like = await this.repository.All<Like>()
                .Where(x => x.ApplicationUserId == userId && x.PostId == postId)
                .FirstOrDefaultAsync();

            if (like == null)
            {
                return false;
            }

            return true;
        }

        public async Task RemoveLike(string userId, Guid postId)
        {
            var like = await this.repository.All<Like>()
                .Where(x => x.ApplicationUserId == userId && x.PostId == postId)
                .FirstOrDefaultAsync();

            this.repository.Delete<Like>(like);
            this.repository.SaveChangesAsync();
        }
    }
}
