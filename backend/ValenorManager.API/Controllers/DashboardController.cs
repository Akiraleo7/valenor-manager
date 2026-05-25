using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ValenorManager.API.Services;

namespace ValenorManager.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    //[Authorize]
    public class DashboardController : ControllerBase
    {
        private readonly DashboardService _dashboardService;

        public DashboardController(
            DashboardService dashboardService
        )
        {
            _dashboardService = dashboardService;
        }

        [HttpGet("resumo")]
        public IActionResult ObterResumo()
        {
            var resumo = _dashboardService.ObterResumo();

            return Ok(resumo);
        }

        [HttpGet("financeiro")]
        public IActionResult ObterFinanceiro()
        {
            var financeiro = _dashboardService.ObterFinanceiro();

            return Ok(financeiro);
        }

        [HttpGet("estoque")]
        public IActionResult ObterEstoque()
        {
            var estoque = _dashboardService.ObterEstoque();

            return Ok(estoque);
        }

        [HttpGet("movimentacoes")]
        public IActionResult ObterMovimentacoes()
        {
            var movimentacoes = _dashboardService.ObterMovimentacoes();

            return Ok(movimentacoes);
        }
    }
}