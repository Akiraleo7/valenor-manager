// DTO responsável pela criação de um novo produto.
namespace ValenorManager.API.DTOs.Produto
{
    public class ProdutoCreateDto
    {
        // Nome do produto.
        public string Nome { get; set; } = string.Empty;

        // Preço do produto.
        public decimal Preco { get; set; }

        // Quantidade inicial em estoque.
        public int QuantidadeEstoque { get; set; }
    }
}
