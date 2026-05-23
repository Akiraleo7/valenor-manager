using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ValenorManager.API.DTOs.Usuario;
using ValenorManager.API.Services;

namespace ValenorManager.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly UsuarioService _usuarioService;

        public UsuarioController(UsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        // =========================
        // LISTAR USUÁRIOS
        // =========================
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public IActionResult ListarUsuarios()
        {
            var usuarios = _usuarioService.ListarUsuarios();

            var response = usuarios.Select(u => new UsuarioResponseDto
            {
                Id = u.Id,
                Nome = u.Nome,
                Email = u.Email,
                Role = u.Role,
                Ativo = u.Ativo
            });

            return Ok(response);
        }

        // =========================
        // EDITAR USUÁRIO
        // =========================
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public IActionResult EditarUsuario(
            int id,
            [FromBody] UsuarioUpdateDto dto
        )
        {
            try
            {
                var admin = User.Identity?.Name ?? "Sistema";

                _usuarioService.EditarUsuario(id, dto, admin);

                return Ok(new
                {
                    mensagem = "Usuário atualizado com sucesso."
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    erro = ex.Message
                });
            }
        }

        // =========================
        // ALTERAR STATUS
        // =========================
        [Authorize(Roles = "Admin")]
        [HttpPatch("{id}/status")]
        public IActionResult AlterarStatus(
            int id,
            [FromBody] UsuarioStatusUpdateDto dto
        )
        {
            try
            {
                var admin = User.Identity?.Name ?? "Sistema";

                _usuarioService.AlterarStatus(id, dto, admin);

                return Ok(new
                {
                    mensagem = "Status do usuário atualizado."
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    erro = ex.Message
                });
            }
        }

        // =========================
        // ALTERAR ROLE
        // =========================
        [Authorize(Roles = "Admin")]
        [HttpPatch("{id}/role")]
        public IActionResult AlterarRole(
            int id,
            [FromBody] UsuarioRoleUpdateDto dto
        )
        {
            try
            {
                var admin = User.Identity?.Name ?? "Sistema";

                _usuarioService.AlterarRole(id, dto, admin);

                return Ok(new
                {
                    mensagem = "Permissão atualizada com sucesso."
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    erro = ex.Message
                });
            }
        }
    }
}