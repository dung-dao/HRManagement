using Microsoft.EntityFrameworkCore.Migrations;

namespace HRData.Migrations
{
    public partial class updateemployeeunitrelationship : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrganizationUnits_Employees_SectionManagerId",
                table: "OrganizationUnits");

            migrationBuilder.DropIndex(
                name: "IX_OrganizationUnits_SectionManagerId",
                table: "OrganizationUnits");

            migrationBuilder.DropColumn(
                name: "SectionManagerId",
                table: "OrganizationUnits");

            migrationBuilder.AddColumn<bool>(
                name: "IsManager",
                table: "Employees",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "UnitId",
                table: "Employees",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Employees_UnitId",
                table: "Employees",
                column: "UnitId");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_OrganizationUnits_UnitId",
                table: "Employees",
                column: "UnitId",
                principalTable: "OrganizationUnits",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_OrganizationUnits_UnitId",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Employees_UnitId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "IsManager",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "UnitId",
                table: "Employees");

            migrationBuilder.AddColumn<int>(
                name: "SectionManagerId",
                table: "OrganizationUnits",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationUnits_SectionManagerId",
                table: "OrganizationUnits",
                column: "SectionManagerId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrganizationUnits_Employees_SectionManagerId",
                table: "OrganizationUnits",
                column: "SectionManagerId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
