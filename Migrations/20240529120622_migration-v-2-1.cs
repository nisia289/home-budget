using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BudzetDomowy.Migrations
{
    /// <inheritdoc />
    public partial class migrationv21 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserBudgets_Roles_RoleId",
                table: "UserBudgets");

            migrationBuilder.AlterColumn<int>(
                name: "RoleId",
                table: "UserBudgets",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_UserBudgets_Roles_RoleId",
                table: "UserBudgets",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "RoleId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserBudgets_Roles_RoleId",
                table: "UserBudgets");

            migrationBuilder.AlterColumn<int>(
                name: "RoleId",
                table: "UserBudgets",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_UserBudgets_Roles_RoleId",
                table: "UserBudgets",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "RoleId");
        }
    }
}
