using Microsoft.AspNetCore.Mvc;
using ValenorManager.API.DTOs.Produto;
using ValenorManager.Domain.Entities;
using System.Linq;

namespace ValenorManager.API.Controllers
{
    // Define que esse controller é uma API REST
    [ApiController]

    // Define a rota base: /api/produto
    [Route("api/[controller]")]
    public class ProdutoController : ControllerBase
    {
        // Simulação de banco em memória (TEMPORÁRIO)
        private static List<Produto> _produtos = new List<Produto>();

        // Endpoint para criar um novo produto
        [HttpPost]
        public IActionResult CriarProduto([FromBody] ProdutoCreateDto dto)
        {
            // Cria entidade de domínio a partir do DTO
            var produto = new Produto(dto.Nome, dto.Preco, dto.QuantidadeEstoque);

            // Simula ID automático (hack temporário)
            typeof(Produto)
                .GetProperty("Id")
                ?.SetValue(produto, _produtos.Count + 1);

            // Adiciona na lista
            _produtos.Add(produto);

            // Converte para DTO de resposta
            var response = new ProdutoResponseDto
            {
                Id = produto.Id,
                Nome = produto.Nome,
                Preco = produto.Preco,
                QuantidadeEstoque = produto.QuantidadeEstoque
            };

            return Ok(response);
        }

        // Endpoint para listar todos os produtos
        [HttpGet]
        public IActionResult ListarProdutos()
        {
            // Converte lista de entidades para DTOs
            var response = _produtos.Select(p => new ProdutoResponseDto
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