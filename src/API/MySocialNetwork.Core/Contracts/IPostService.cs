namespace MySocialNetwork.Core.Contracts
{
    using MySocialNetwork.Core.Models.Post;

    public interface IPostService
    {
        Task<bool> AddPostAsync(AddPostModel model, string userId);
    }
}
