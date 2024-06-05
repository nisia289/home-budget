using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BudzetDomowy.Migrations
{
    /// <inheritdoc />
    public partial class migrationv22 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserBudgets_Roles_RoleId",
                table: "UserBudgets");

            migrationBuilder.DropIndex(
                name: "IX_UserBudgets_RoleId",
                table: "UserBudgets");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_UserBudgets_RoleId",
                table: "UserBudgets",
                column: "RoleId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserBudgets_Roles_RoleId",
                table: "UserBudgets",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "RoleId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
