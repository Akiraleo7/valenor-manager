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

        [HttpPost]
        public IActionResult CriarProduto([FromBody] ProdutoCreateDto dto)
        {
            var produto = _produtoService.CriarProduto(dto.Nome, dto.Preco, dto.QuantidadeEstoque);

            var response = new ProdutoResponseDto
            {
                Id = produto.Id,
                Nome = produto.Nome,
                Preco = produto.Preco,
                QuantidadeEstoque = produto.QuantidadeEstoque
            };

            return Ok(response);
        }

        [HttpGet]
        public IActionResult ListarProdutos()
        {
            var produtos = _produtoService.ListarProdutos();

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