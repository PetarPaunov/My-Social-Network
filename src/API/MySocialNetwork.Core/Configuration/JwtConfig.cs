﻿namespace MySocialNetwork.Core.Configuration
{
    public class JwtConfig
    {
        public string Secret { get; set; } = null!;
        public TimeSpan ExpiryTimeFrame { get; set; }
    }
}
