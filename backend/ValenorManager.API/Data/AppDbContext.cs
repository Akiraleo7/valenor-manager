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

        // =========================
        // DBSets
        // =========================
        public DbSet<Produto> Produtos { get; set; }

        public DbSet<Venda> Vendas { get; set; }

        public DbSet<ItemVenda> ItensVenda { get; set; }

        public DbSet<Usuario> Usuarios { get; set; }

        public DbSet<AuditLog> AuditLogs { get; set; }

        // =========================
        // Mapeamento das entidades
        // =========================
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
                      .HasColumnType("decimal(10,2)")
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
                      .HasColumnType("decimal(10,2)")
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

            // =========================
            // USUARIO
            // =========================
            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.ToTable("usuario");

                entity.HasKey(u => u.Id);

                entity.Property(u => u.Nome)
                      .HasColumnName("nome")
                      .IsRequired();

                entity.Property(u => u.Email)
                      .HasColumnName("email")
                      .IsRequired();

                entity.Property(u => u.SenhaHash)
                      .HasColumnName("senha_hash")
                      .IsRequired();

                entity.Property(u => u.Role)
                      .HasColumnName("role")
                      .IsRequired();
                    
                entity.Property(u => u.Ativo)
                      .HasColumnName("ativo")
                      .IsRequired();
            });

            // =========================
            // AUDIT LOG
            // =========================
            modelBuilder.Entity<AuditLog>(entity =>
            {
                entity.ToTable("audit_log");

                entity.HasKey(a => a.Id);

                entity.Property(a => a.Usuario)
                      .HasColumnName("usuario")
                      .IsRequired();

                entity.Property(a => a.Acao)
                      .HasColumnName("acao")
                      .IsRequired();

                entity.Property(a => a.DataEvento)
                      .HasColumnName("dt_evento")
                      .IsRequired();
            });
        }
    }
}