using Microsoft.EntityFrameworkCore.Migrations;

namespace HRData.Migrations
{
    public partial class updatecommonorgmodel_v11 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkPlace_BODs_BODId",
                table: "WorkPlace");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkPlace_Branches_BranchId",
                table: "WorkPlace");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WorkPlace",
                table: "WorkPlace");

            migrationBuilder.RenameTable(
                name: "WorkPlace",
                newName: "WorkPlaces");

            migrationBuilder.RenameIndex(
                name: "IX_WorkPlace_BranchId",
                table: "WorkPlaces",
                newName: "IX_WorkPlaces_BranchId");

            migrationBuilder.RenameIndex(
                name: "IX_WorkPlace_BODId",
                table: "WorkPlaces",
                newName: "IX_WorkPlaces_BODId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WorkPlaces",
                table: "WorkPlaces",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkPlaces_BODs_BODId",
                table: "WorkPlaces",
                column: "BODId",
                principalTable: "BODs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkPlaces_Branches_BranchId",
                table: "WorkPlaces",
                column: "BranchId",
                principalTable: "Branches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkPlaces_BODs_BODId",
                table: "WorkPlaces");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkPlaces_Branches_BranchId",
                table: "WorkPlaces");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WorkPlaces",
                table: "WorkPlaces");

            migrationBuilder.RenameTable(
                name: "WorkPlaces",
                newName: "WorkPlace");

            migrationBuilder.RenameIndex(
                name: "IX_WorkPlaces_BranchId",
                table: "WorkPlace",
                newName: "IX_WorkPlace_BranchId");

            migrationBuilder.RenameIndex(
                name: "IX_WorkPlaces_BODId",
                table: "WorkPlace",
                newName: "IX_WorkPlace_BODId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WorkPlace",
                table: "WorkPlace",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkPlace_BODs_BODId",
                table: "WorkPlace",
                column: "BODId",
                principalTable: "BODs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkPlace_Branches_BranchId",
                table: "WorkPlace",
                column: "BranchId",
                principalTable: "Branches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
