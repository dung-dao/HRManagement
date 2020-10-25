using Microsoft.EntityFrameworkCore.Migrations;

namespace HRData.Migrations
{
    public partial class updateorg : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Units_Units_OrganizationUnitId",
                table: "Units");

            migrationBuilder.RenameColumn(
                name: "OrganizationUnitId",
                table: "Units",
                newName: "ParentId");

            migrationBuilder.RenameIndex(
                name: "IX_Units_OrganizationUnitId",
                table: "Units",
                newName: "IX_Units_ParentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Units_Units_ParentId",
                table: "Units",
                column: "ParentId",
                principalTable: "Units",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Units_Units_ParentId",
                table: "Units");

            migrationBuilder.RenameColumn(
                name: "ParentId",
                table: "Units",
                newName: "OrganizationUnitId");

            migrationBuilder.RenameIndex(
                name: "IX_Units_ParentId",
                table: "Units",
                newName: "IX_Units_OrganizationUnitId");

            migrationBuilder.AddForeignKey(
                name: "FK_Units_Units_OrganizationUnitId",
                table: "Units",
                column: "OrganizationUnitId",
                principalTable: "Units",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
