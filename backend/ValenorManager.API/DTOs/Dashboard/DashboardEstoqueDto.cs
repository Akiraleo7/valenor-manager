namespace ValenorManager.API.DTOs.Dashboard
{
    public class DashboardEstoqueDto
    {
        public string Nome { get; set; } = string.Empty;

        public int QuantidadeEstoque { get; set; }

        public decimal Preco { get; set; }

        public string Status { get; set; } = string.Empty;
    }
}