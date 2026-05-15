using Microsoft.EntityFrameworkCore;
using ValenorManager.Domain.Entities;

namespace ValenorManager.API.Data
{
    // Classe responsável pela comunicação com o banco de dados
    public class AppDbContext : DbContext
    {
        // Construtor necessário para injeção de dependência
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        // Representa a tabela Produto no banco
        public DbSet<Produto> Produtos { get; set; }

        // Mapeamento da entidade para o banco
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Produto>(entity =>
            {
                entity.ToTable("produto");

                entity.HasKey(p => p.Id);

                entity.Property(p => p.Nome)
                      .HasColumnName("nome")
                      .IsRequired();

                entity.Property(p => p.Preco)
                      .HasColumnName("preco")
                      .IsRequired();

                entity.Property(p => p.QuantidadeEstoque)
                      .HasColumnName("qtd_estoque") //  mapeamento importante
                      .IsRequired();
            });
        }
    }
}