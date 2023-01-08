namespace MySocialNetwork.Core.Services
{
    using Microsoft.AspNetCore.Http;
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
                ImageUrl = imageUrl
            };

            await repository.AddAsync<Post>(post);
            await repository.SaveChangesAsync();

            return true;
        }
    }
}
