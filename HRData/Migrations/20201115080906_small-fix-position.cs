using Microsoft.EntityFrameworkCore.Migrations;

namespace HRData.Migrations
{
    public partial class smallfixposition : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Salery",
                table: "Positions",
                newName: "Salary");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Salary",
                table: "Positions",
                newName: "Salery");
        }
    }
}
