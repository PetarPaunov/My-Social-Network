namespace MySocialNetwork.Core.Services
{
    using Microsoft.EntityFrameworkCore;
    using MySocialNetwork.Core.Contracts;
    using MySocialNetwork.Core.Models.Comment;
    using MySocialNetwork.Infrastructure.Models;
    using SkiShop.Data.Common;

    public class CommentService : ICommentService
    {
        private readonly IRepository repository;

        public CommentService(IRepository repository)
        {
            this.repository = repository;
        }

        public async Task<GetCommentModel> AddCommentAsync(AddCommentModel model, string userId)
        {
            var postGuid = new Guid(model.PostId);

            var comment = new Comment()
            {
                Description = model.Description,
                PostId = postGuid,
                ApplicationUserId = userId,
                CreationDate = DateTime.UtcNow
            };

            await this.repository.AddAsync<Comment>(comment);
            await this.repository.SaveChangesAsync();

            var commentToReturn = await this.repository.AllReadonly<Comment>()
                .Where(x => x.CreationDate == comment.CreationDate)
                .Select(x => new GetCommentModel()
                {
                    Id = x.Id,
                    Description = x.Description,
                    ApplicationUserUsername = x.ApplicationUser.UserName,
                    ApplicationUserImage = x.ApplicationUser.ImageUrl
                })
                .FirstOrDefaultAsync();

            return commentToReturn;
        }
    }
}
