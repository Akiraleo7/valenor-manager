namespace ValenorManager.API.DTOs.Venda
{
    public class VendaResponseDto
    {
        public int Id { get; set; }

        public DateTime DataVenda { get; set; }

        public decimal ValorTotal { get; set; }

        // Lista de itens da venda
        public List<ItemVendaResponseDto> Itens { get; set; }
            = new List<ItemVendaResponseDto>();
    }
}