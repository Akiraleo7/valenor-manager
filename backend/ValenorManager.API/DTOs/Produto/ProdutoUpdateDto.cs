// DTO responsável pela atualização de um produto existente. 
namespace ValenorManager.API.DTOs.Produto
{
    public class ProdutoUpdateDto
    {
        // Nome do produto.
        public string Nome { get; set; } = string.Empty;

        // Preço atulizado do produto.
        public decimal Preco { get; set; }
    }
}
