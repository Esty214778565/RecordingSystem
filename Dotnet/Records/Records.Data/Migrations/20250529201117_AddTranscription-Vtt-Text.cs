using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Records.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddTranscriptionVttText : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TranscriptionS3Key",
                table: "Records",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "TranscriptionTextS3Key",
                table: "Records",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TranscriptionS3Key",
                table: "Records");

            migrationBuilder.DropColumn(
                name: "TranscriptionTextS3Key",
                table: "Records");
        }
    }
}
