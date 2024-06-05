using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BudzetDomowy.Migrations
{
    /// <inheritdoc />
    public partial class migrationv24 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PermissionId",
                table: "UserBudgets");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PermissionId",
                table: "UserBudgets",
                type: "int",
                nullable: true);
        }
    }
}
