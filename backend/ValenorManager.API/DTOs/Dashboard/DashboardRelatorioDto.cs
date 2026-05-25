namespace ValenorManager.API.DTOs.Dashboard
{
    public class DashboardRelatorioDto
    {
        public int TotalProdutos { get; set; }

        public int TotalUsuarios { get; set; }

        public int TotalVendas { get; set; }

        public int TotalMovimentacoes { get; set; }

        public decimal ReceitaTotal { get; set; }

        public int ProdutosBaixoEstoque { get; set; }
    }
}