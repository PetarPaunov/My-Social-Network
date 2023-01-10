namespace MySocialNetwork.Core.Contracts
{
    using MySocialNetwork.Core.Models.Comment;

    public interface ICommentService
    {
        Task AddCommentAsync(AddCommentModel model, string userId);
    }
}
