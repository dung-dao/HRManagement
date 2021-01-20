using Microsoft.EntityFrameworkCore.Migrations;

namespace HRData.Migrations
{
    public partial class addpayslipdetail : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Attendance",
                table: "PaySlips",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "HolidayTimeOff",
                table: "PaySlips",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "PaidTimeOff",
                table: "PaySlips",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "UnpaidTimeOff",
                table: "PaySlips",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Attendance",
                table: "PaySlips");

            migrationBuilder.DropColumn(
                name: "HolidayTimeOff",
                table: "PaySlips");

            migrationBuilder.DropColumn(
                name: "PaidTimeOff",
                table: "PaySlips");

            migrationBuilder.DropColumn(
                name: "UnpaidTimeOff",
                table: "PaySlips");
        }
    }
}
