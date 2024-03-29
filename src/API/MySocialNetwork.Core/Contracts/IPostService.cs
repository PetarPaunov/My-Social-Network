﻿namespace MySocialNetwork.Core.Contracts
{
    using MySocialNetwork.Core.Models.Post;

    public interface IPostService
    {
        Task<GetPostModel> AddPostAsync(AddPostModel model, string userId);
        Task<GetPostForUpdateModel> GetForUpdateAsync(Guid postId, string userId);
        Task<GetPostModel> UpdatePostAsync(UpdatePostModel model, string userId);
        Task<bool> DeletePostAsync(Guid postId);
        Task<IEnumerable<GetPostModel>> GetAllPostsAsync();
        Task<IEnumerable<GetPostModel>> GetUserPosts(string userId);
        Task<IEnumerable<GetPostModel>> GetFriendUserPosts(string userId);
    }
}