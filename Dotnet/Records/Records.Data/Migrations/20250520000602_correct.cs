using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Records.Data.Migrations
{
    /// <inheritdoc />
    public partial class correct : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Questions_Records_RecordEntityId",
                table: "Questions");

            migrationBuilder.DropForeignKey(
                name: "FK_Records_Folders_FolderId1",
                table: "Records");

            migrationBuilder.DropIndex(
                name: "IX_Records_FolderId1",
                table: "Records");

            migrationBuilder.DropColumn(
                name: "FolderId1",
                table: "Records");

            migrationBuilder.AlterColumn<int>(
                name: "RecordEntityId",
                table: "Questions",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_Records_RecordEntityId",
                table: "Questions",
                column: "RecordEntityId",
                principalTable: "Records",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Questions_Records_RecordEntityId",
                table: "Questions");

            migrationBuilder.AddColumn<int>(
                name: "FolderId1",
                table: "Records",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "RecordEntityId",
                table: "Questions",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_Records_FolderId1",
                table: "Records",
                column: "FolderId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_Records_RecordEntityId",
                table: "Questions",
                column: "RecordEntityId",
                principalTable: "Records",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Records_Folders_FolderId1",
                table: "Records",
                column: "FolderId1",
                principalTable: "Folders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
