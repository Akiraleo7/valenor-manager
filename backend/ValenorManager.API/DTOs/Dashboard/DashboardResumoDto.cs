namespace ValenorManager.API.DTOs.Dashboard
{
    public class DashboardResumoDto
    {
        public decimal EstoqueTotal { get; set; }

        public decimal Receitas { get; set; }

        public decimal Despesas { get; set; }

        public int UsuariosAtivos { get; set; }

        public int ProdutosBaixoEstoque { get; set; }
    }
}