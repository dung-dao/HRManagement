using Microsoft.EntityFrameworkCore.Migrations;

namespace HRData.Migrations
{
    public partial class updateorgmodels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrganizationUnits_OrganizationUnits_OrganizationUnitId",
                table: "OrganizationUnits");

            migrationBuilder.RenameColumn(
                name: "OrganizationUnitId",
                table: "OrganizationUnits",
                newName: "ParentId");

            migrationBuilder.RenameIndex(
                name: "IX_OrganizationUnits_OrganizationUnitId",
                table: "OrganizationUnits",
                newName: "IX_OrganizationUnits_ParentId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrganizationUnits_OrganizationUnits_ParentId",
                table: "OrganizationUnits",
                column: "ParentId",
                principalTable: "OrganizationUnits",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrganizationUnits_OrganizationUnits_ParentId",
                table: "OrganizationUnits");

            migrationBuilder.RenameColumn(
                name: "ParentId",
                table: "OrganizationUnits",
                newName: "OrganizationUnitId");

            migrationBuilder.RenameIndex(
                name: "IX_OrganizationUnits_ParentId",
                table: "OrganizationUnits",
                newName: "IX_OrganizationUnits_OrganizationUnitId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrganizationUnits_OrganizationUnits_OrganizationUnitId",
                table: "OrganizationUnits",
                column: "OrganizationUnitId",
                principalTable: "OrganizationUnits",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
