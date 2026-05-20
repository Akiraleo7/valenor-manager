using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ValenorManager.API.DTOs.Venda;
using ValenorManager.API.Services;
using System.Linq;

namespace ValenorManager.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VendaController : ControllerBase
    {
        private readonly VendaService _vendaService;

        // Injeção de dependência
        public VendaController(VendaService vendaService)
        {
            _vendaService = vendaService;
        }

        // =========================
        // REGISTRAR VENDA
        // =========================
        [HttpPost]
        public IActionResult RegistrarVenda([FromBody] VendaCreateDto dto)
        {
            try
            {
                var venda = _vendaService.RegistrarVenda(dto);

                return Ok(new
                {
                    mensagem = "Venda registrada com sucesso",
                    venda.Id,
                    venda.DataVenda,
                    venda.ValorTotal
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    erro = ex.Message,
                    detalhe = ex.InnerException?.Message
                });
            }
        }

        // =========================
        // LISTAR TODAS AS VENDAS
        // =========================
        [Authorize]
        [HttpGet]
        public IActionResult ListarVendas()
        {
            var vendas = _vendaService.ListarVendas();

            var response = vendas.Select(v => new VendaResponseDto
            {
                Id = v.Id,
                DataVenda = v.DataVenda,
                ValorTotal = v.ValorTotal
            });

            return Ok(response);
        }

        // =========================
        // BUSCAR VENDA POR ID
        // =========================
        [HttpGet("{id}")]
        public IActionResult BuscarVendaPorId(int id)
        {
            var venda = _vendaService.BuscarVendaPorId(id);

            if (venda == null)
            {
                return NotFound(new
                {
                    erro = "Venda não encontrada"
                });
            }

            var response = new VendaResponseDto
            {
                Id = venda.Id,
                DataVenda = venda.DataVenda,
                ValorTotal = venda.ValorTotal,

                Itens = venda.Itens.Select(item => new ItemVendaResponseDto
                {
                    ProdutoId = item.ProdutoId,
                    Quantidade = item.Quantidade,
                    PrecoUnitario = item.PrecoUnitario
                }).ToList()
            };

            return Ok(response);
        }
    }
}