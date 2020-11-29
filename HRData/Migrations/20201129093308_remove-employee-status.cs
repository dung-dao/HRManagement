using Microsoft.EntityFrameworkCore.Migrations;

namespace HRData.Migrations
{
    public partial class removeemployeestatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JobTitles_JobCategories_JobCategoryId",
                table: "JobTitles");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Employees");

            migrationBuilder.AlterColumn<int>(
                name: "JobCategoryId",
                table: "JobTitles",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_JobTitles_JobCategories_JobCategoryId",
                table: "JobTitles",
                column: "JobCategoryId",
                principalTable: "JobCategories",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JobTitles_JobCategories_JobCategoryId",
                table: "JobTitles");

            migrationBuilder.AlterColumn<int>(
                name: "JobCategoryId",
                table: "JobTitles",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_JobTitles_JobCategories_JobCategoryId",
                table: "JobTitles",
                column: "JobCategoryId",
                principalTable: "JobCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
