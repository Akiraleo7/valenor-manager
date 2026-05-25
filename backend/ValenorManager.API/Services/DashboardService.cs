using Microsoft.EntityFrameworkCore;
using ValenorManager.API.Data;
using ValenorManager.API.DTOs.Dashboard;

namespace ValenorManager.API.Services
{
    public class DashboardService
    {
        private readonly AppDbContext _context;

        public DashboardService(AppDbContext context)
        {
            _context = context;
        }

        public DashboardResumoDto ObterResumo()
        {
            var estoqueTotal = _context.Produtos
                .Sum(p => p.Preco * p.QuantidadeEstoque);

            var receitas = _context.Vendas
                .Sum(v => v.ValorTotal);

            // TEMPORÁRIO
            // sem modulo de despensa ainda
            decimal despesas = 0;

            var usuariosAtivos = _context.Usuarios
                .Count(u => u.Ativo);

            var produtosBaixoEstoque = _context.Produtos
                .Count(p => p.QuantidadeEstoque < 5);

            return new DashboardResumoDto
            {
                EstoqueTotal = estoqueTotal,
                Receitas = receitas,
                Despesas = despesas,
                UsuariosAtivos = usuariosAtivos,
                ProdutosBaixoEstoque = produtosBaixoEstoque
            };
        }

        public List<DashboardFinanceiroDto> ObterFinanceiro()
        {
            var financeiro = _context.Vendas
                .GroupBy(v => v.DataVenda.Date)
                .Select(g => new
                {
                    Data = g.Key,
                    Receita = g.Sum(v => v.ValorTotal)
                })
                .ToList();

            return financeiro
                .Select(f => new DashboardFinanceiroDto
                {
                    Data = f.Data.ToString("dd/MM"),
                    Receita = f.Receita
                })
                .OrderBy(f => f.Data)
                .ToList();
        }

        public List<DashboardEstoqueDto> ObterEstoque()
        {
            var estoque = _context.Produtos
                .Select(p => new DashboardEstoqueDto
                {
                    Nome = p.Nome,
                    QuantidadeEstoque = p.QuantidadeEstoque,
                    Preco = p.Preco,
                    Status =
                        p.QuantidadeEstoque == 0
                            ? "Esgotado"
                            : p.QuantidadeEstoque <= 4
                                ? "Baixo"
                                : p.QuantidadeEstoque <= 10
                                    ? "Médio"
                                    : "Normal"
                })
                .OrderBy(p => p.QuantidadeEstoque)
                .ToList();

            return estoque;
        }

        public List<DashboardMovimentacaoDto> ObterMovimentacoes()
        {
            var movimentacoes = _context.AuditLogs
                .OrderByDescending(a => a.DataEvento)
                .Take(10)
                .Select(a => new DashboardMovimentacaoDto
                {
                    Usuario = a.Usuario,
                    Acao = a.Acao,
                    DataEvento = a.DataEvento.ToString("dd/MM/yyyy HH:mm")
                })
                .ToList();

            return movimentacoes;
        }

        public DashboardRelatorioDto ObterRelatorioGeral()
        {
            var relatorio = new DashboardRelatorioDto
            {
                TotalProdutos = _context.Produtos.Count(),

                TotalUsuarios = _context.Usuarios.Count(),

                TotalVendas = _context.Vendas.Count(),

                TotalMovimentacoes = _context.AuditLogs.Count(),

                ReceitaTotal = _context.Vendas
                    .Sum(v => v.ValorTotal),

                ProdutosBaixoEstoque = _context.Produtos
                    .Count(p => p.QuantidadeEstoque <= 4)
            };

            return relatorio;
        }
    }
}