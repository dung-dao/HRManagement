using Microsoft.EntityFrameworkCore.Migrations;

namespace HRData.Migrations
{
    public partial class orgrecordstatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RecordStatus",
                table: "OrganizationUnits",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RecordStatus",
                table: "OrganizationUnits");
        }
    }
}
