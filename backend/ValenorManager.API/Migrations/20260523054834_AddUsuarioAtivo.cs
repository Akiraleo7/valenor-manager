using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ValenorManager.API.Migrations
{
    /// <inheritdoc />
    public partial class AddUsuarioAtivo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "vl_total",
                table: "venda",
                type: "decimal(10,2)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(65,30)");

            migrationBuilder.AddColumn<bool>(
                name: "Ativo",
                table: "usuario",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Ativo",
                table: "usuario");

            migrationBuilder.AlterColumn<decimal>(
                name: "vl_total",
                table: "venda",
                type: "decimal(65,30)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(10,2)");
        }
    }
}
