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

        public DbSet<Venda> Vendas { get; set; }

        public DbSet<ItemVenda> ItensVenda { get; set; }

        // Mapeamento da entidade para o banco
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // =========================
            // PRODUTO
            // =========================
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
                      .HasColumnName("qtd_estoque")
                      .IsRequired();
            });

            // =========================
            // VENDA
            // =========================
            modelBuilder.Entity<Venda>(entity =>
            {
                entity.ToTable("venda");

                entity.HasKey(v => v.Id);

                entity.Property(v => v.DataVenda)
                      .HasColumnName("dt_venda")
                      .IsRequired();

                entity.Property(v => v.ValorTotal)
                      .HasColumnName("vl_total")
                      .IsRequired();
            });

            // =========================
            // ITEM VENDA
            // =========================
            modelBuilder.Entity<ItemVenda>(entity =>
            {
                entity.ToTable("item_venda");

                entity.HasKey(iv => iv.Id);

                entity.Property(iv => iv.VendaId)
                      .HasColumnName("venda_id")
                      .IsRequired();

                entity.Property(iv => iv.ProdutoId)
                      .HasColumnName("produto_id")
                      .IsRequired();

                entity.Property(iv => iv.Quantidade)
                      .HasColumnName("qtd_itens")
                      .IsRequired();

                entity.Property(iv => iv.PrecoUnitario)
                      .HasColumnName("preco_unitario")
                      .IsRequired();

                // Relacionamento com Venda
                entity.HasOne(iv => iv.Venda)
                      .WithMany(v => v.Itens)
                      .HasForeignKey(iv => iv.VendaId);

                // Relacionamento com Produto
                entity.HasOne(iv => iv.Produto)
                      .WithMany()
                      .HasForeignKey(iv => iv.ProdutoId);
            });
        }
    }
}