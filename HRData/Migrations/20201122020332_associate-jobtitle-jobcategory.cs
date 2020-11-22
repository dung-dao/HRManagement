using Microsoft.EntityFrameworkCore.Migrations;

namespace HRData.Migrations
{
    public partial class associatejobtitlejobcategory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_OrganizationUnits_OrganizationUnitId",
                table: "Employees");

            migrationBuilder.DropForeignKey(
                name: "FK_Positions_JobCategories_JobCategoryId",
                table: "Positions");

            migrationBuilder.DropIndex(
                name: "IX_Positions_JobCategoryId",
                table: "Positions");

            migrationBuilder.DropIndex(
                name: "IX_Employees_OrganizationUnitId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "JobCategoryId",
                table: "Positions");

            migrationBuilder.DropColumn(
                name: "OrganizationUnitId",
                table: "Employees");

            migrationBuilder.AddColumn<int>(
                name: "JobCategoryId",
                table: "JobTitles",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_JobTitles_JobCategoryId",
                table: "JobTitles",
                column: "JobCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_JobTitles_JobCategories_JobCategoryId",
                table: "JobTitles",
                column: "JobCategoryId",
                principalTable: "JobCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JobTitles_JobCategories_JobCategoryId",
                table: "JobTitles");

            migrationBuilder.DropIndex(
                name: "IX_JobTitles_JobCategoryId",
                table: "JobTitles");

            migrationBuilder.DropColumn(
                name: "JobCategoryId",
                table: "JobTitles");

            migrationBuilder.AddColumn<int>(
                name: "JobCategoryId",
                table: "Positions",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "OrganizationUnitId",
                table: "Employees",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Positions_JobCategoryId",
                table: "Positions",
                column: "JobCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_OrganizationUnitId",
                table: "Employees",
                column: "OrganizationUnitId");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_OrganizationUnits_OrganizationUnitId",
                table: "Employees",
                column: "OrganizationUnitId",
                principalTable: "OrganizationUnits",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Positions_JobCategories_JobCategoryId",
                table: "Positions",
                column: "JobCategoryId",
                principalTable: "JobCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
