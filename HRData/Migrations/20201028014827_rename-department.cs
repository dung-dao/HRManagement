using Microsoft.EntityFrameworkCore.Migrations;

namespace HRData.Migrations
{
    public partial class renamedepartment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Departments_Departments_DepartmentId",
                table: "Departments");

            migrationBuilder.RenameColumn(
                name: "DepartmentId",
                table: "Departments",
                newName: "OrganizationUnitId");

            migrationBuilder.RenameIndex(
                name: "IX_Departments_DepartmentId",
                table: "Departments",
                newName: "IX_Departments_OrganizationUnitId");

            migrationBuilder.AddForeignKey(
                name: "FK_Departments_Departments_OrganizationUnitId",
                table: "Departments",
                column: "OrganizationUnitId",
                principalTable: "Departments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Departments_Departments_OrganizationUnitId",
                table: "Departments");

            migrationBuilder.RenameColumn(
                name: "OrganizationUnitId",
                table: "Departments",
                newName: "DepartmentId");

            migrationBuilder.RenameIndex(
                name: "IX_Departments_OrganizationUnitId",
                table: "Departments",
                newName: "IX_Departments_DepartmentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Departments_Departments_DepartmentId",
                table: "Departments",
                column: "DepartmentId",
                principalTable: "Departments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
