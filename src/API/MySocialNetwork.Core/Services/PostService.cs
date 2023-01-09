namespace MySocialNetwork.Core.Services
{
    using Microsoft.AspNetCore.Http;
    using Microsoft.EntityFrameworkCore;
    using MySocialNetwork.Core.Contracts;
    using MySocialNetwork.Core.Models.Post;
    using MySocialNetwork.Infrastructure.Models;
    using SkiShop.Data.Common;
    using System.Threading.Tasks;

    public class PostService : IPostService
    {
        private readonly IRepository repository;
        private readonly ICommonService commonService;

        public PostService(IRepository repository, ICommonService commonService)
        {
            this.repository = repository;
            this.commonService = commonService;
        }

        public async Task<bool> AddPostAsync(AddPostModel model, string userId)
        {
            var imageUrl = await this.commonService.UploadImage(model.Image);

            var post = new Post()
            {
                Title = model.Title,
                Description = model.Description,
                ApplicationUserId = userId,
                ImageUrl = imageUrl,
                CreationDate = DateTime.UtcNow,
            };

            await repository.AddAsync<Post>(post);
            await repository.SaveChangesAsync();

            return true;
        }

        public async Task<GetPostModel> GetForUpdateAsync(Guid postId, string userId)
        {
            var post = await this.repository.AllReadonly<Post>()
                .Where(x => x.Id == postId && x.ApplicationUserId == userId)
                .Select(x => new GetPostModel()
                {
                    Id = x.Id,
                    Title = x.Title,
                    Description = x.Description,
                    ImageUrl = x.ImageUrl
                })
                .FirstOrDefaultAsync();

            return post;
        }

        public async Task<bool> UpdatePostAsync(UpdatePostModel model, string userId)
        {
            var post = await this.repository.All<Post>()
                .Where(x => x.Id == model.Id && x.ApplicationUserId == userId)
                .FirstOrDefaultAsync();

            if (post == null)
            {
                return false;
            }

            var imageUrl = await this.commonService.UploadImage(model.Image);

            if (imageUrl != null)
            {
                post.ImageUrl = imageUrl;
            }

            post.Title = model.Title;
            post.Description = model.Description;

            await this.repository.SaveChangesAsync();

            return true;
        }
    }
}