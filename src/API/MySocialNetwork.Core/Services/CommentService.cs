namespace MySocialNetwork.Core.Services
{
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

        public async Task AddCommentAsync(AddCommentModel model, string userId)
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
        }
    }
}
