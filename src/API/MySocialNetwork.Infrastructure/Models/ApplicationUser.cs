﻿namespace MySocialNetwork.Infrastructure.Models
{
    using Microsoft.AspNetCore.Identity;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser()
        {
            this.Friends = new HashSet<ApplicationUser>();
            this.Posts = new HashSet<Post>();
            this.Comments = new HashSet<Comment>();
            this.Requests = new HashSet<Request>();
        }

        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; } = null!;

        [Required]
        [MaxLength(50)]
        public string LastName { get; set; } = null!;

        public string? ImageUrl { get; set; }
        public string? Address { get; set; }

        public ICollection<ApplicationUser> Friends { get; set; }

        public ICollection<Request> Requests { get; set; }

        public ICollection<Post> Posts { get; set; }

        public ICollection<Comment> Comments { get; set; }
    }
}