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

        // Endpoint para registrar venda
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

        // Endpoint para listar venda
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
    }
}