using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Records.Data.Migrations
{
    /// <inheritdoc />
    public partial class definenullables3keytranscribe : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "TranscriptionTextS3Key",
                table: "Records",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "TranscriptionS3Key",
                table: "Records",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Records",
                keyColumn: "TranscriptionTextS3Key",
                keyValue: null,
                column: "TranscriptionTextS3Key",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "TranscriptionTextS3Key",
                table: "Records",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "Records",
                keyColumn: "TranscriptionS3Key",
                keyValue: null,
                column: "TranscriptionS3Key",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "TranscriptionS3Key",
                table: "Records",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");
        }
    }
}
