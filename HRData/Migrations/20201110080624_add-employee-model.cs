using Microsoft.EntityFrameworkCore.Migrations;

namespace HRData.Migrations
{
    public partial class addemployeemodel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_OrganizationUnits_UnitId",
                table: "Employees");

            migrationBuilder.DropForeignKey(
                name: "FK_Positions_Employees_EmployeeId",
                table: "Positions");

            migrationBuilder.RenameColumn(
                name: "UnitId",
                table: "Employees",
                newName: "OrganizationUnitId");

            migrationBuilder.RenameIndex(
                name: "IX_Employees_UnitId",
                table: "Employees",
                newName: "IX_Employees_OrganizationUnitId");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_OrganizationUnits_OrganizationUnitId",
                table: "Employees",
                column: "OrganizationUnitId",
                principalTable: "OrganizationUnits",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Positions_Employees_EmployeeId",
                table: "Positions",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_OrganizationUnits_OrganizationUnitId",
                table: "Employees");

            migrationBuilder.DropForeignKey(
                name: "FK_Positions_Employees_EmployeeId",
                table: "Positions");

            migrationBuilder.RenameColumn(
                name: "OrganizationUnitId",
                table: "Employees",
                newName: "UnitId");

            migrationBuilder.RenameIndex(
                name: "IX_Employees_OrganizationUnitId",
                table: "Employees",
                newName: "IX_Employees_UnitId");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_OrganizationUnits_UnitId",
                table: "Employees",
                column: "UnitId",
                principalTable: "OrganizationUnits",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Positions_Employees_EmployeeId",
                table: "Positions",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
