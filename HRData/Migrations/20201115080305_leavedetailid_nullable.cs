using Microsoft.EntityFrameworkCore.Migrations;

namespace HRData.Migrations
{
    public partial class leavedetailid_nullable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Positions_LeaveDetails_LeaveDetailId",
                table: "Positions");

            migrationBuilder.DropIndex(
                name: "IX_Positions_LeaveDetailId",
                table: "Positions");

            migrationBuilder.AlterColumn<int>(
                name: "LeaveDetailId",
                table: "Positions",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_Positions_LeaveDetailId",
                table: "Positions",
                column: "LeaveDetailId",
                unique: true,
                filter: "[LeaveDetailId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Positions_LeaveDetails_LeaveDetailId",
                table: "Positions",
                column: "LeaveDetailId",
                principalTable: "LeaveDetails",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Positions_LeaveDetails_LeaveDetailId",
                table: "Positions");

            migrationBuilder.DropIndex(
                name: "IX_Positions_LeaveDetailId",
                table: "Positions");

            migrationBuilder.AlterColumn<int>(
                name: "LeaveDetailId",
                table: "Positions",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Positions_LeaveDetailId",
                table: "Positions",
                column: "LeaveDetailId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Positions_LeaveDetails_LeaveDetailId",
                table: "Positions",
                column: "LeaveDetailId",
                principalTable: "LeaveDetails",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
