using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HRData.Migrations
{
    public partial class createpositionmodel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Duration",
                table: "Positions");

            migrationBuilder.AlterColumn<int>(
                name: "EmployeeId",
                table: "Positions",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<DateTime>(
                name: "EndDate",
                table: "Positions",
                type: "datetime2",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "Positions");

            migrationBuilder.AlterColumn<int>(
                name: "EmployeeId",
                table: "Positions",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<TimeSpan>(
                name: "Duration",
                table: "Positions",
                type: "time",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));
        }
    }
}
