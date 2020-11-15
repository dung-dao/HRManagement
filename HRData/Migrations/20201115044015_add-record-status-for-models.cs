using Microsoft.EntityFrameworkCore.Migrations;

namespace HRData.Migrations
{
    public partial class addrecordstatusformodels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RecordStatus",
                table: "TestModels",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RecordStatus",
                table: "Positions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RecordStatus",
                table: "LeaveTypes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RecordStatus",
                table: "LeaveDetails",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RecordStatus",
                table: "JobTitles",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RecordStatus",
                table: "JobCategories",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RecordStatus",
                table: "EmploymentStatuses",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RecordStatus",
                table: "Employees",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RecordStatus",
                table: "TestModels");

            migrationBuilder.DropColumn(
                name: "RecordStatus",
                table: "Positions");

            migrationBuilder.DropColumn(
                name: "RecordStatus",
                table: "LeaveTypes");

            migrationBuilder.DropColumn(
                name: "RecordStatus",
                table: "LeaveDetails");

            migrationBuilder.DropColumn(
                name: "RecordStatus",
                table: "JobTitles");

            migrationBuilder.DropColumn(
                name: "RecordStatus",
                table: "JobCategories");

            migrationBuilder.DropColumn(
                name: "RecordStatus",
                table: "EmploymentStatuses");

            migrationBuilder.DropColumn(
                name: "RecordStatus",
                table: "Employees");
        }
    }
}
