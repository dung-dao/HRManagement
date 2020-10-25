using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HRData.Migrations
{
    public partial class updateorge : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Units_Units_ParentUnitId",
                table: "Units");

            migrationBuilder.RenameColumn(
                name: "ParentUnitId",
                table: "Units",
                newName: "OrganizationUnitId");

            migrationBuilder.RenameIndex(
                name: "IX_Units_ParentUnitId",
                table: "Units",
                newName: "IX_Units_OrganizationUnitId");

            migrationBuilder.CreateTable(
                name: "WeatherForecasts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TemperatureC = table.Column<int>(type: "int", nullable: false),
                    Summary = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WeatherForecasts", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Units_Units_OrganizationUnitId",
                table: "Units",
                column: "OrganizationUnitId",
                principalTable: "Units",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Units_Units_OrganizationUnitId",
                table: "Units");

            migrationBuilder.DropTable(
                name: "WeatherForecasts");

            migrationBuilder.RenameColumn(
                name: "OrganizationUnitId",
                table: "Units",
                newName: "ParentUnitId");

            migrationBuilder.RenameIndex(
                name: "IX_Units_OrganizationUnitId",
                table: "Units",
                newName: "IX_Units_ParentUnitId");

            migrationBuilder.AddForeignKey(
                name: "FK_Units_Units_ParentUnitId",
                table: "Units",
                column: "ParentUnitId",
                principalTable: "Units",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
