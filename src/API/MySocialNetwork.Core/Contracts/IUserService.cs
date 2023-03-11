namespace MySocialNetwork.Core.Contracts
{
    using MySocialNetwork.Core.Models.Account;

    public interface IUserService
    {
        Task<GetUserProfileModel> UpdateUserProfileAsync(string userId, UpdateProfileModel model);
        Task<IEnumerable<FriendViewModel>> GetAllFriends(string userId);
        Task<IEnumerable<FriendViewModel>> GetAllLoggedInUsers(string userId);
    }
}