using ValenorManager.Domain.Entities;

namespace ValenorManager.API.Services
{
    // Serviço responsável pela lógica de negócio do Produto
    public class ProdutoService
    {
        // Simulação de banco em memória (TEMPORÁRIO)
        private static List<Produto> _produtos = new List<Produto>();

        // Método para criar produto
        public Produto CriarProduto(string nome, decimal preco, int quantidadeEstoque)
        {
            var produto = new Produto(nome, preco, quantidadeEstoque);

            // Simula ID automático
            typeof(Produto)
                .GetProperty("Id")
                ?.SetValue(produto, _produtos.Count + 1);

            _produtos.Add(produto);

            return produto;
        }

        // Método para listar produtos
        public List<Produto> ListarProdutos()
        {
            return _produtos;
        }
    }
}