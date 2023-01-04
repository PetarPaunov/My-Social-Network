namespace MySocialNetwork.Authentication.Outgoing
{
    public class AuthResult
    {
        public string Token { get; set; } = null!;
        public bool Success { get; set; }
        public List<string> Errors { get; set; } = new List<string>();
    }
}
