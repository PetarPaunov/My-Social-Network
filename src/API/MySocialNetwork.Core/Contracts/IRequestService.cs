﻿namespace MySocialNetwork.Core.Contracts
{
    using MySocialNetwork.Core.Models.Request;
    using MySocialNetwork.Infrastructure.Models;

    public interface IRequestService
    {
        Task<IEnumerable<RequestViewModel>> GetRequests(string userId);
        Task Send(ApplicationUser sender, string resciver);
    }
}
