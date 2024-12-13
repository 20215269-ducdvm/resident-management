using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace ResidentsApi.Migrations
{
    /// <inheritdoc />
    public partial class AddUniqueIDtoResidentApartment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_ResidentApartments",
                table: "ResidentApartments");

            migrationBuilder.AddColumn<long>(
                name: "ResidentApartmentId",
                table: "ResidentApartments",
                type: "bigint",
                nullable: false,
                defaultValue: 0L)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ResidentApartments",
                table: "ResidentApartments",
                column: "ResidentApartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_ResidentApartments_ResidentId",
                table: "ResidentApartments",
                column: "ResidentId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_ResidentApartments",
                table: "ResidentApartments");

            migrationBuilder.DropIndex(
                name: "IX_ResidentApartments_ResidentId",
                table: "ResidentApartments");

            migrationBuilder.DropColumn(
                name: "ResidentApartmentId",
                table: "ResidentApartments");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ResidentApartments",
                table: "ResidentApartments",
                columns: new[] { "ResidentId", "ApartmentId" });
        }
    }
}
