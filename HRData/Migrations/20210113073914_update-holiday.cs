using Microsoft.EntityFrameworkCore.Migrations;

namespace HRData.Migrations
{
    public partial class updateholiday : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "TimeOffTypes",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "TimeOffTypes");
        }
    }
}
