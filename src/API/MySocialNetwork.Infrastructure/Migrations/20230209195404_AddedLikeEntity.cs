using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MySocialNetwork.Infrastructure.Migrations
{
    public partial class AddedLikeEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Like",
                table: "Posts");

            migrationBuilder.CreateTable(
                name: "Likes",
                columns: table => new
                {
                    PostId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ApplicationUserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Likes", x => new { x.PostId, x.ApplicationUserId });
                    table.ForeignKey(
                        name: "FK_Likes_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Likes_Posts_PostId",
                        column: x => x.PostId,
                        principalTable: "Posts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Likes_ApplicationUserId",
                table: "Likes",
                column: "ApplicationUserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Likes");

            migrationBuilder.AddColumn<int>(
                name: "Like",
                table: "Posts",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
