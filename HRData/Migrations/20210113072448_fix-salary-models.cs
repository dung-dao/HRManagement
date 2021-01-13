using Microsoft.EntityFrameworkCore.Migrations;

namespace HRData.Migrations
{
    public partial class fixsalarymodels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Frequency",
                table: "TimeOffTypes");

            migrationBuilder.DropColumn(
                name: "InitialValue",
                table: "TimeOffTypes");

            migrationBuilder.DropColumn(
                name: "MaximumCarryOver",
                table: "TimeOffTypes");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Holidays",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Holidays");

            migrationBuilder.AddColumn<int>(
                name: "Frequency",
                table: "TimeOffTypes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<double>(
                name: "InitialValue",
                table: "TimeOffTypes",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "MaximumCarryOver",
                table: "TimeOffTypes",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
