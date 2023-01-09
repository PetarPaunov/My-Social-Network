﻿namespace MySocialNetwork.Core.Contracts
{
    using MySocialNetwork.Core.Models.Post;

    public interface IPostService
    {
        Task<bool> AddPostAsync(AddPostModel model, string userId);
        Task<GetPostModel> GetForUpdateAsync(Guid postId, string userId);
        Task<bool> UpdatePostAsync(UpdatePostModel model, string userId);
        Task<bool> DeletePostAsync(Guid postId);
    }
}
