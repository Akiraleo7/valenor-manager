// DTO responsável pela resposta da API ao cliente.
namespace ValenorManager.API.DTOs.Produto
{
    public class ProdutoResponseDto
    {
        // Identificador do protuto.
        public int Id { get; set; }

        // Nome do produto.
        public string Nome { get; set; } = string.Empty;

        // Preço do produto.
        public decimal Preco { get; set; }

        // Quantidade disponível em estoque.
        public int QuantidadeEstoque { get; set; }
    }
}
