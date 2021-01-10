using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HRData.Migrations
{
    public partial class updatesalarymodels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MyProperty",
                table: "TimeOffTypes");

            migrationBuilder.DropColumn(
                name: "LastUpdate",
                table: "LeaveEntitlements");

            migrationBuilder.AddColumn<double>(
                name: "InitialValue",
                table: "TimeOffTypes",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "TimeOffTypes",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InitialValue",
                table: "TimeOffTypes");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "TimeOffTypes");

            migrationBuilder.AddColumn<int>(
                name: "MyProperty",
                table: "TimeOffTypes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastUpdate",
                table: "LeaveEntitlements",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
