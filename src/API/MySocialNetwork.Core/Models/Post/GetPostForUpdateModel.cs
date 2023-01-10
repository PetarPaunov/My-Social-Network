namespace MySocialNetwork.Core.Models.Post
{
    public class GetPostForUpdateModel
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string? ImageUrl { get; set; } = null!;
    }
}