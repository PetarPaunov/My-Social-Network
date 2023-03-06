namespace MySocialNetwork.Core.Contracts
{
    using MySocialNetwork.Core.Models.Comment;

    public interface ICommentService
    {
        Task<GetCommentModel> AddCommentAsync(AddCommentModel model, string userId);
    }
}
