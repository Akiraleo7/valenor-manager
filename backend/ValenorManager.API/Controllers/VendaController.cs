using Microsoft.AspNetCore.Mvc;
using ValenorManager.API.DTOs.Venda;
using ValenorManager.API.Services;

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
    }
}