using Microsoft.AspNetCore.Mvc;
using ValenorManager.API.DTOs.Produto;
using ValenorManager.API.Services;
using ValenorManager.Domain.Entities;
using System.Linq;

namespace ValenorManager.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProdutoController : ControllerBase
    {
        private readonly ProdutoService _produtoService;

        // Injeção de dependência
        public ProdutoController(ProdutoService produtoService)
        {
            _produtoService = produtoService;
        }

        // Endpoint para criar produto (ASSÍNCRONO)
        [HttpPost]
        public async Task<IActionResult> CriarProduto([FromBody] ProdutoCreateDto dto)
        {
            // Aguarda o retorno do service (Task -> Produto)
            var produto = await _produtoService.CriarProduto(
                dto.Nome,
                dto.Preco,
                dto.QuantidadeEstoque
            );

            // Mapeia para DTO de resposta
            var response = new ProdutoResponseDto
            {
                Id = produto.Id,
                Nome = produto.Nome,
                Preco = produto.Preco,
                QuantidadeEstoque = produto.QuantidadeEstoque
            };

            return Ok(response);
        }

        // Endpoint para listar produtos (ASSÍNCRONO)
        [HttpGet]
        public async Task<IActionResult> ListarProdutos()
        {
            // Aguarda lista vinda do banco
            var produtos = await _produtoService.ListarProdutos();

            // Converte para DTO
            var response = produtos.Select(p => new ProdutoResponseDto
            {
                Id = p.Id,
                Nome = p.Nome,
                Preco = p.Preco,
                QuantidadeEstoque = p.QuantidadeEstoque
            });

            return Ok(response);
        }
    }
}