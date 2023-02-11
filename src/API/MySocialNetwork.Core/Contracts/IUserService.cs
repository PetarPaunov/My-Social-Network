namespace MySocialNetwork.Core.Contracts
{
    using MySocialNetwork.Core.Models.Account;

    public interface IUserService
    {
        Task<bool> UpdateUserProfileAsync(string userId, UpdateProfileModel model);
        Task<IEnumerable<FriendViewModel>> GetAllFriends(string userId);
    }
}
