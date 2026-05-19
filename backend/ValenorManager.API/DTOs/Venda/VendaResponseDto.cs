namespace ValenorManager.API.DTOs.Venda
{
    public class VendaResponseDto
    {
        public int Id { get; set; }

        public DateTime DataVenda { get; set; }

        public decimal ValorTotal { get; set; }
    }
}