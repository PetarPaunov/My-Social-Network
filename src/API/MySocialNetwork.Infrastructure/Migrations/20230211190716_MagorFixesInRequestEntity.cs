using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MySocialNetwork.Infrastructure.Migrations
{
    public partial class MagorFixesInRequestEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AlterColumn<string>(
                name: "ApplicationUserId",
                table: "Requests",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "Requests",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Requests",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "Requests",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Username",
                table: "Requests",
                type: "nvarchar(max)",
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
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Requests_AspNetUsers_ApplicationUserId",
                table: "Requests");

            migrationBuilder.DropIndex(
                name: "IX_Requests_ApplicationUserId",
                table: "Requests");

            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "Requests");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Requests");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "Requests");

            migrationBuilder.DropColumn(
                name: "Username",
                table: "Requests");

            migrationBuilder.AlterColumn<string>(
                name: "RequestUserId",
                table: "Requests",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "ApplicationUserId",
                table: "Requests",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

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
    }
}
