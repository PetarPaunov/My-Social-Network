namespace MySocialNetwork.Core.Contracts
{
    using MySocialNetwork.Core.Models.Account;

    public interface IUserService
    {
        Task<bool> UpdateUserProfileAsync(string userId, UpdateProfileModel model);
    }
}
