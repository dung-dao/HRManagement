using Microsoft.EntityFrameworkCore.Migrations;

namespace HRData.Migrations
{
    public partial class renameworktype : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Positions_EmploymentStatuses_EmploymentStatusId",
                table: "Positions");

            migrationBuilder.DropTable(
                name: "EmploymentStatuses");

            migrationBuilder.RenameColumn(
                name: "EmploymentStatusId",
                table: "Positions",
                newName: "WorkTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_Positions_EmploymentStatusId",
                table: "Positions",
                newName: "IX_Positions_WorkTypeId");

            migrationBuilder.CreateTable(
                name: "WorkType",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RecordStatus = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkType", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Positions_WorkType_WorkTypeId",
                table: "Positions",
                column: "WorkTypeId",
                principalTable: "WorkType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Positions_WorkType_WorkTypeId",
                table: "Positions");

            migrationBuilder.DropTable(
                name: "WorkType");

            migrationBuilder.RenameColumn(
                name: "WorkTypeId",
                table: "Positions",
                newName: "EmploymentStatusId");

            migrationBuilder.RenameIndex(
                name: "IX_Positions_WorkTypeId",
                table: "Positions",
                newName: "IX_Positions_EmploymentStatusId");

            migrationBuilder.CreateTable(
                name: "EmploymentStatuses",
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
                    table.PrimaryKey("PK_EmploymentStatuses", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Positions_EmploymentStatuses_EmploymentStatusId",
                table: "Positions",
                column: "EmploymentStatusId",
                principalTable: "EmploymentStatuses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
