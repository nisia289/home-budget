using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BudzetDomowy.Migrations
{
    /// <inheritdoc />
    public partial class DataBasev14 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserBudgets_Permissions_PermissionId",
                table: "UserBudgets");

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

            migrationBuilder.AlterColumn<int>(
                name: "PermissionId",
                table: "UserBudgets",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_UserBudgets_Permissions_PermissionId",
                table: "UserBudgets",
                column: "PermissionId",
                principalTable: "Permissions",
                principalColumn: "PermissionId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserBudgets_Roles_RoleId",
                table: "UserBudgets",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "RoleId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserBudgets_Permissions_PermissionId",
                table: "UserBudgets");

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

            migrationBuilder.AlterColumn<int>(
                name: "PermissionId",
                table: "UserBudgets",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_UserBudgets_Permissions_PermissionId",
                table: "UserBudgets",
                column: "PermissionId",
                principalTable: "Permissions",
                principalColumn: "PermissionId",
                onDelete: ReferentialAction.Cascade);

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
