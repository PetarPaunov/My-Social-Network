using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MySocialNetwork.Infrastructure.Migrations
{
    public partial class ChangedNameInRequestEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Requests_AspNetUsers_ApplicationUserId",
                table: "Requests");

            migrationBuilder.DropIndex(
                name: "IX_Requests_ApplicationUserId",
                table: "Requests");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "Requests");

            migrationBuilder.AddColumn<string>(
                name: "RequestUserId",
                table: "Requests",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "RequestUserUserId",
                table: "Requests",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Requests_RequestUserUserId",
                table: "Requests",
                column: "RequestUserUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Requests_AspNetUsers_RequestUserUserId",
                table: "Requests",
                column: "RequestUserUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Requests_AspNetUsers_RequestUserUserId",
                table: "Requests");

            migrationBuilder.DropIndex(
                name: "IX_Requests_RequestUserUserId",
                table: "Requests");

            migrationBuilder.DropColumn(
                name: "RequestUserId",
                table: "Requests");

            migrationBuilder.DropColumn(
                name: "RequestUserUserId",
                table: "Requests");

            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                table: "Requests",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Requests_ApplicationUserId",
                table: "Requests",
                column: "ApplicationUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Requests_AspNetUsers_ApplicationUserId",
                table: "Requests",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
