using Microsoft.EntityFrameworkCore.Migrations;

namespace HRData.Migrations
{
    public partial class updatedepartmentmodel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Departments_Departments_ParentId",
                table: "Departments");

            migrationBuilder.RenameColumn(
                name: "ParentId",
                table: "Departments",
                newName: "DepartmentId");

            migrationBuilder.RenameIndex(
                name: "IX_Departments_ParentId",
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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Departments_Departments_DepartmentId",
                table: "Departments");

            migrationBuilder.RenameColumn(
                name: "DepartmentId",
                table: "Departments",
                newName: "ParentId");

            migrationBuilder.RenameIndex(
                name: "IX_Departments_DepartmentId",
                table: "Departments",
                newName: "IX_Departments_ParentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Departments_Departments_ParentId",
                table: "Departments",
                column: "ParentId",
                principalTable: "Departments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
