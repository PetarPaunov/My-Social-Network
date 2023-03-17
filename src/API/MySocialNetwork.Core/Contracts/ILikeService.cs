namespace MySocialNetwork.Core.Contracts
{
    public interface ILikeService
    {
        Task AddLike(string userId, Guid postId);
        Task RemoveLike(string userId, Guid postId);
        Task<bool> IsLiked(string userId, Guid postId);
        Task<int> GetAllPostLikes(Guid postId);
    }
}