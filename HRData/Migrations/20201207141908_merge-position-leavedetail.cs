using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HRData.Migrations
{
    public partial class mergepositionleavedetail : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Positions_LeaveDetails_LeaveDetailId",
                table: "Positions");

            migrationBuilder.DropTable(
                name: "LeaveDetails");

            migrationBuilder.DropTable(
                name: "TestModels");

            migrationBuilder.DropIndex(
                name: "IX_Positions_LeaveDetailId",
                table: "Positions");

            migrationBuilder.RenameColumn(
                name: "LeaveDetailId",
                table: "Positions",
                newName: "LeaveTypeId");

            migrationBuilder.AddColumn<DateTime>(
                name: "LeaveDate",
                table: "Positions",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LeaveReason",
                table: "Positions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Positions_LeaveTypeId",
                table: "Positions",
                column: "LeaveTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Positions_LeaveTypes_LeaveTypeId",
                table: "Positions",
                column: "LeaveTypeId",
                principalTable: "LeaveTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Positions_LeaveTypes_LeaveTypeId",
                table: "Positions");

            migrationBuilder.DropIndex(
                name: "IX_Positions_LeaveTypeId",
                table: "Positions");

            migrationBuilder.DropColumn(
                name: "LeaveDate",
                table: "Positions");

            migrationBuilder.DropColumn(
                name: "LeaveReason",
                table: "Positions");

            migrationBuilder.RenameColumn(
                name: "LeaveTypeId",
                table: "Positions",
                newName: "LeaveDetailId");

            migrationBuilder.CreateTable(
                name: "LeaveDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Reason = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RecordStatus = table.Column<int>(type: "int", nullable: false),
                    TypeId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LeaveDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LeaveDetails_LeaveTypes_TypeId",
                        column: x => x.TypeId,
                        principalTable: "LeaveTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TestModels",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RecordStatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestModels", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Positions_LeaveDetailId",
                table: "Positions",
                column: "LeaveDetailId",
                unique: true,
                filter: "[LeaveDetailId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_LeaveDetails_TypeId",
                table: "LeaveDetails",
                column: "TypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Positions_LeaveDetails_LeaveDetailId",
                table: "Positions",
                column: "LeaveDetailId",
                principalTable: "LeaveDetails",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
