using ValenorManager.Domain.Entities;
using ValenorManager.API.Data;
using Microsoft.EntityFrameworkCore;

namespace ValenorManager.API.Services
{
    // Serviço responsável pela lógica de negócio do Produto
    public class ProdutoService
    {
        private readonly AppDbContext _context;

        // Injeção do DbContext
        public ProdutoService(AppDbContext context)
        {
            _context = context;
        }

        // Criar produto no banco
        public async Task<Produto> CriarProduto(string nome, decimal preco, int quantidadeEstoque)
        {
            var produto = new Produto(nome, preco, quantidadeEstoque);

            // Adiciona no contexto
            _context.Produtos.Add(produto);

            // Salva no banco
            await _context.SaveChangesAsync();

            return produto;
        }

        // Listar produtos do banco
        public async Task<List<Produto>> ListarProdutos()
        {
            return await _context.Produtos.ToListAsync();
        }
    }
}