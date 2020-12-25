using Microsoft.EntityFrameworkCore.Migrations;

namespace HRData.Migrations
{
    public partial class associateuser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LeaveDetails_Employees_ApproverId",
                table: "LeaveDetails");

            migrationBuilder.RenameColumn(
                name: "ApproverId",
                table: "LeaveDetails",
                newName: "ReviewerId");

            migrationBuilder.RenameIndex(
                name: "IX_LeaveDetails_ApproverId",
                table: "LeaveDetails",
                newName: "IX_LeaveDetails_ReviewerId");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Employees",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Employees_UserId",
                table: "Employees",
                column: "UserId",
                unique: true,
                filter: "[UserId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_AspNetUsers_UserId",
                table: "Employees",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_LeaveDetails_Employees_ReviewerId",
                table: "LeaveDetails",
                column: "ReviewerId",
                principalTable: "Employees",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_AspNetUsers_UserId",
                table: "Employees");

            migrationBuilder.DropForeignKey(
                name: "FK_LeaveDetails_Employees_ReviewerId",
                table: "LeaveDetails");

            migrationBuilder.DropIndex(
                name: "IX_Employees_UserId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Employees");

            migrationBuilder.RenameColumn(
                name: "ReviewerId",
                table: "LeaveDetails",
                newName: "ApproverId");

            migrationBuilder.RenameIndex(
                name: "IX_LeaveDetails_ReviewerId",
                table: "LeaveDetails",
                newName: "IX_LeaveDetails_ApproverId");

            migrationBuilder.AddForeignKey(
                name: "FK_LeaveDetails_Employees_ApproverId",
                table: "LeaveDetails",
                column: "ApproverId",
                principalTable: "Employees",
                principalColumn: "Id");
        }
    }
}
