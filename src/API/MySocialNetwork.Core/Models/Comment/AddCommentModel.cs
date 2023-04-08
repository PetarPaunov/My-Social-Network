namespace MySocialNetwork.Core.Models.Comment
{
    using System.ComponentModel.DataAnnotations;

    public class AddCommentModel
    {
        [Required]
        public string PostId { get; set; } = null!;

        [Required]
        [StringLength(5000, MinimumLength = 3)]
        public string Description { get; set; } = null!;
    }
}
