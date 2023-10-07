using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddContactstoAppUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "Contacts",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Contacts_AppUserId",
                table: "Contacts",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Contacts_AspNetUsers_AppUserId",
                table: "Contacts",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contacts_AspNetUsers_AppUserId",
                table: "Contacts");

            migrationBuilder.DropIndex(
                name: "IX_Contacts_AppUserId",
                table: "Contacts");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "Contacts");
        }
    }
}
