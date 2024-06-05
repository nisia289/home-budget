using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BudzetDomowy.Migrations
{
    /// <inheritdoc />
    public partial class migrationv25 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Supplier",
                table: "Expenditures",
                type: "nvarchar(max)",
                nullable: true,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Supplier",
                table: "Expenditures");
        }
    }
}
