namespace MySocialNetwork.Core.Models.Comment
{
    public class GetCommentModel
    {
        public Guid Id { get; set; }
        public string Description { get; set; } = null!;
        public string ApplicationUserUsername { get; set; } = null!;
        public string? ApplicationUserImage { get; set; }
    }
}