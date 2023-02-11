using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MySocialNetwork.Infrastructure.Migrations
{
    public partial class FixesInRequestEntitySecond : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                table: "Requests",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "Requests");
        }
    }
}
