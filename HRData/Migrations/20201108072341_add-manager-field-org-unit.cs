using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HRData.Migrations
{
    public partial class addmanagerfieldorgunit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Date",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "Issused",
                table: "Employees");

            migrationBuilder.RenameColumn(
                name: "IdCardNo",
                table: "Employees",
                newName: "WorkEmail");

            migrationBuilder.AddColumn<int>(
                name: "EmploymentStatusId",
                table: "Positions",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Salery",
                table: "Positions",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "SectionManagerId",
                table: "OrganizationUnits",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CurrentAddress",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NationalId",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Positions_EmploymentStatusId",
                table: "Positions",
                column: "EmploymentStatusId");

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationUnits_SectionManagerId",
                table: "OrganizationUnits",
                column: "SectionManagerId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrganizationUnits_Employees_SectionManagerId",
                table: "OrganizationUnits",
                column: "SectionManagerId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Positions_EmploymentStatuses_EmploymentStatusId",
                table: "Positions",
                column: "EmploymentStatusId",
                principalTable: "EmploymentStatuses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrganizationUnits_Employees_SectionManagerId",
                table: "OrganizationUnits");

            migrationBuilder.DropForeignKey(
                name: "FK_Positions_EmploymentStatuses_EmploymentStatusId",
                table: "Positions");

            migrationBuilder.DropIndex(
                name: "IX_Positions_EmploymentStatusId",
                table: "Positions");

            migrationBuilder.DropIndex(
                name: "IX_OrganizationUnits_SectionManagerId",
                table: "OrganizationUnits");

            migrationBuilder.DropColumn(
                name: "EmploymentStatusId",
                table: "Positions");

            migrationBuilder.DropColumn(
                name: "Salery",
                table: "Positions");

            migrationBuilder.DropColumn(
                name: "SectionManagerId",
                table: "OrganizationUnits");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "CurrentAddress",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "NationalId",
                table: "Employees");

            migrationBuilder.RenameColumn(
                name: "WorkEmail",
                table: "Employees",
                newName: "IdCardNo");

            migrationBuilder.AddColumn<DateTime>(
                name: "Date",
                table: "Employees",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "Issused",
                table: "Employees",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
