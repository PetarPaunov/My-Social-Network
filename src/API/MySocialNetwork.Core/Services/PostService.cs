namespace MySocialNetwork.Core.Services
{
    using Microsoft.EntityFrameworkCore;
    using MySocialNetwork.Core.Contracts;
    using MySocialNetwork.Core.Models.Comment;
    using MySocialNetwork.Core.Models.Post;
    using MySocialNetwork.Infrastructure.Models;
    using SkiShop.Data.Common;
    using System.Collections.Generic;
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

        public async Task<GetPostModel> AddPostAsync(AddPostModel model, string userId)
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

            var postToReturn = await this.repository.AllReadonly<Post>()
                .Where(x => x.CreationDate == post.CreationDate)
                .Select(x => new GetPostModel()
                {
                    Id = x.Id,
                    Title = x.Title,
                    Description = x.Description,
                    Likes = x.Likes.Count(),
                    UserImage = x.ApplicationUser.ImageUrl,
                    UserName = x.ApplicationUser.UserName,
                    ImageUrl = x.ImageUrl,
                    CommentsCount = x.Comments.Count(),
                    Comments = x.Comments
                    .Where(c => c.IsDeleted == false)
                    .Select(c => new GetCommentModel()
                    {
                        Id = c.Id,
                        Description = c.Description,
                        ApplicationUserUsername = c.ApplicationUser.UserName,
                        ApplicationUserImage = c.ApplicationUser.ImageUrl
                    })
                    .ToList()
                })
                .FirstOrDefaultAsync();

            return postToReturn;
        }

        public async Task<bool> DeletePostAsync(Guid postId)
        {
            var post = await this.repository.GetByIdAsync<Post>(postId);

            if (post == null)
            {
                return false;
            }

            post.IsDeleted = true;

            await repository.SaveChangesAsync();

            return true;
        }

        public async Task<IEnumerable<GetPostModel>> GetAllPostsAsync()
        {
            var posts = await repository.AllReadonly<Post>()
                .Where(x => x.IsDeleted == false)
                .OrderByDescending(x => x.CreationDate)
                .Select(x => new GetPostModel()
                {
                    Id = x.Id,
                    Title = x.Title,
                    Description = x.Description,
                    Likes = x.Likes.Count(),
                    UserImage = x.ApplicationUser.ImageUrl,
                    UserName = x.ApplicationUser.UserName,
                    ImageUrl = x.ImageUrl,
                    CommentsCount = x.Comments.Count(),
                    Comments = x.Comments
                    .Where(c => c.IsDeleted == false)
                    .Select(c => new GetCommentModel()
                    {
                        Id = c.Id,
                        Description = c.Description,
                        ApplicationUserUsername = c.ApplicationUser.UserName,
                        ApplicationUserImage = c.ApplicationUser.ImageUrl
                    })
                    .ToList()
                })
                .ToListAsync();

            return posts;
        }

        public async Task<GetPostForUpdateModel> GetForUpdateAsync(Guid postId, string userId)
        {
            var post = await this.repository.AllReadonly<Post>()
                .Where(x => x.Id == postId && x.ApplicationUserId == userId)
                .Select(x => new GetPostForUpdateModel()
                {
                    Id = x.Id,
                    Title = x.Title,
                    Description = x.Description,
                    ImageUrl = x.ImageUrl
                })
                .FirstOrDefaultAsync();

            return post;
        }

        public async Task<IEnumerable<GetPostModel>> GetUserPosts(string userId)
        {
            var posts = await this.repository.All<Post>()
                .Where(x => x.ApplicationUserId == userId && x.IsDeleted == false)
                .OrderByDescending(x => x.CreationDate)
                .Select(x => new GetPostModel()
                {
                    Id = x.Id,
                    Title = x.Title,
                    Description = x.Description,
                    Likes = x.Likes.Count(),
                    UserImage = x.ApplicationUser.ImageUrl,
                    UserName = x.ApplicationUser.UserName,
                    ImageUrl = x.ImageUrl,
                    CommentsCount = x.Comments.Count(),
                    Comments = x.Comments
                    .Where(c => c.IsDeleted == false)
                    .Select(c => new GetCommentModel()
                    {
                        Id = c.Id,
                        Description = c.Description,
                        ApplicationUserUsername = c.ApplicationUser.UserName,
                        ApplicationUserImage = c.ApplicationUser.ImageUrl
                    })
                    .ToList()
                })
                .ToListAsync();

            return posts;
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