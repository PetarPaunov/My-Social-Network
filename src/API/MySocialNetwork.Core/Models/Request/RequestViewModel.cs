﻿namespace MySocialNetwork.Core.Models.Request
{
    public class RequestViewModel
    {
        public Guid RequestId { get; set; }
        public string UserId { get; set; } = null!;
        public string Username { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string? ImageUrl { get; set; }
    }
}