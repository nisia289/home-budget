using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BudzetDomowy.Migrations
{
    /// <inheritdoc />
    public partial class DataBasev16 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Type",
                table: "Payments");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "Incomes");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "Expenditures");

            migrationBuilder.AlterColumn<byte[]>(
                name: "Image",
                table: "Users",
                type: "varbinary(max)",
                nullable: true,
                oldClrType: typeof(byte[]),
                oldType: "varbinary(max)");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte[]>(
                name: "Image",
                table: "Users",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0],
                oldClrType: typeof(byte[]),
                oldType: "varbinary(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "Payments",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "Incomes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "Expenditures",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
