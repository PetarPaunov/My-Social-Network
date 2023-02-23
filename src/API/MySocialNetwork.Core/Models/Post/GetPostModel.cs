using MySocialNetwork.Core.Models.Comment;

namespace MySocialNetwork.Core.Models.Post
{
    public class GetPostModel
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string? ImageUrl { get; set; } = null!;
        public int? Likes { get; set; }
        public int? CommentsCount { get; set; }
        public string? UserImage { get; set; }
        public string UserName { get; set; } = null!;
        public IEnumerable<GetCommentModel> Comments { get; set; }
    }
}