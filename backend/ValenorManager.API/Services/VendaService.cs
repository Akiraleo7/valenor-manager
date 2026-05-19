using ValenorManager.API.Data;
using ValenorManager.API.DTOs.Venda;
using ValenorManager.Domain.Entities;

namespace ValenorManager.API.Services
{
    public class VendaService
    {
        private readonly AppDbContext _context;

        public VendaService(AppDbContext context)
        {
            _context = context;
        }

        // =========================
        // REGISTRAR VENDA
        // =========================
        public Venda RegistrarVenda(VendaCreateDto dto)
        {
            decimal valorTotal = 0;

            var itensVenda = new List<ItemVenda>();

            // Percorre itens enviados na venda
            foreach (var itemDto in dto.Itens)
            {
                // Busca produto no banco
                var produto = _context.Produtos.FirstOrDefault(p => p.Id == itemDto.ProdutoId);

                if (produto == null)
                {
                    throw new Exception($"Produto ID {itemDto.ProdutoId} não encontrado.");
                }

                // Valida estoque
                if (produto.QuantidadeEstoque < itemDto.Quantidade)
                {
                    throw new Exception($"Estoque insuficiente para o produto {produto.Nome}.");
                }

                // Calcula subtotal
                var subtotal = produto.Preco * itemDto.Quantidade;

                valorTotal += subtotal;

                // Atualiza estoque
                produto.RemoverEstoque(itemDto.Quantidade);

                // Cria item da venda
                var itemVenda = new ItemVenda(
                    produto.Id,
                    itemDto.Quantidade,
                    produto.Preco
                );

                itensVenda.Add(itemVenda);
            }

            // Cria venda
            var venda = new Venda(valorTotal);

            // Adiciona itens na venda
            foreach (var item in itensVenda)
            {
                venda.Itens.Add(item);
            }

            // Salva venda
            _context.Vendas.Add(venda);

            // Persiste tudo
            _context.SaveChanges();

            return venda;
        }

        // =========================
        // LISTAR VENDAS
        // =========================
        public List<Venda> ListarVendas()
        {
            return _context.Vendas.ToList();
        }
    }
}