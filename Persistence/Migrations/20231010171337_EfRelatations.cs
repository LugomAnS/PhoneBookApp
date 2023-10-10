using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class EfRelatations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contacts_Addresses_ContactAddressId",
                table: "Contacts");

            migrationBuilder.DropForeignKey(
                name: "FK_Contacts_AspNetUsers_AppUserId",
                table: "Contacts");

            migrationBuilder.DropForeignKey(
                name: "FK_Phones_Contacts_ContactId",
                table: "Phones");

            migrationBuilder.DropIndex(
                name: "IX_Contacts_AppUserId",
                table: "Contacts");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "Contacts");

            migrationBuilder.RenameColumn(
                name: "ContactId",
                table: "Phones",
                newName: "OwnerId");

            migrationBuilder.RenameIndex(
                name: "IX_Phones_ContactId",
                table: "Phones",
                newName: "IX_Phones_OwnerId");

            migrationBuilder.RenameColumn(
                name: "ContactAddressId",
                table: "Contacts",
                newName: "OwnerId");

            migrationBuilder.RenameIndex(
                name: "IX_Contacts_ContactAddressId",
                table: "Contacts",
                newName: "IX_Contacts_OwnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Addresses_Contacts_Id",
                table: "Addresses",
                column: "Id",
                principalTable: "Contacts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Contacts_AspNetUsers_OwnerId",
                table: "Contacts",
                column: "OwnerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Phones_Contacts_OwnerId",
                table: "Phones",
                column: "OwnerId",
                principalTable: "Contacts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Addresses_Contacts_Id",
                table: "Addresses");

            migrationBuilder.DropForeignKey(
                name: "FK_Contacts_AspNetUsers_OwnerId",
                table: "Contacts");

            migrationBuilder.DropForeignKey(
                name: "FK_Phones_Contacts_OwnerId",
                table: "Phones");

            migrationBuilder.RenameColumn(
                name: "OwnerId",
                table: "Phones",
                newName: "ContactId");

            migrationBuilder.RenameIndex(
                name: "IX_Phones_OwnerId",
                table: "Phones",
                newName: "IX_Phones_ContactId");

            migrationBuilder.RenameColumn(
                name: "OwnerId",
                table: "Contacts",
                newName: "ContactAddressId");

            migrationBuilder.RenameIndex(
                name: "IX_Contacts_OwnerId",
                table: "Contacts",
                newName: "IX_Contacts_ContactAddressId");

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
                name: "FK_Contacts_Addresses_ContactAddressId",
                table: "Contacts",
                column: "ContactAddressId",
                principalTable: "Addresses",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Contacts_AspNetUsers_AppUserId",
                table: "Contacts",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Phones_Contacts_ContactId",
                table: "Phones",
                column: "ContactId",
                principalTable: "Contacts",
                principalColumn: "Id");
        }
    }
}
