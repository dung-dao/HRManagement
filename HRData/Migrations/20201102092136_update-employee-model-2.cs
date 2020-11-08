using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace HRData.Migrations
{
    public partial class updateemployeemodel2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrganizationUnits_Branch_BranchId",
                table: "OrganizationUnits");

            migrationBuilder.DropTable(
                name: "Branch");

            migrationBuilder.DropIndex(
                name: "IX_OrganizationUnits_BranchId",
                table: "OrganizationUnits");

            migrationBuilder.DropColumn(
                name: "BranchId",
                table: "OrganizationUnits");

            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PersonalEmail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Sex = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IdCardNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Issused = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    AcademicLevel = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    University = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Major = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Employees");

            migrationBuilder.AddColumn<int>(
                name: "BranchId",
                table: "OrganizationUnits",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Branch",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Address = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Status = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Branch", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationUnits_BranchId",
                table: "OrganizationUnits",
                column: "BranchId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrganizationUnits_Branch_BranchId",
                table: "OrganizationUnits",
                column: "BranchId",
                principalTable: "Branch",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
