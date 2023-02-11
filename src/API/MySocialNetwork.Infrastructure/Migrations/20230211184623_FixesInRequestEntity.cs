using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MySocialNetwork.Infrastructure.Migrations
{
    public partial class FixesInRequestEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Requests_AspNetUsers_RequestUserUserId",
                table: "Requests");

            migrationBuilder.DropIndex(
                name: "IX_Requests_RequestUserUserId",
                table: "Requests");

            migrationBuilder.DropColumn(
                name: "RequestUserUserId",
                table: "Requests");

            migrationBuilder.AlterColumn<string>(
                name: "RequestUserId",
                table: "Requests",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_Requests_RequestUserId",
                table: "Requests",
                column: "RequestUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Requests_AspNetUsers_RequestUserId",
                table: "Requests",
                column: "RequestUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Requests_AspNetUsers_RequestUserId",
                table: "Requests");

            migrationBuilder.DropIndex(
                name: "IX_Requests_RequestUserId",
                table: "Requests");

            migrationBuilder.AlterColumn<string>(
                name: "RequestUserId",
                table: "Requests",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

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
    }
}
