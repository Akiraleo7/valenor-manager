using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using ValenorManager.API.DTOs.Auth;
using ValenorManager.API.Services;

namespace ValenorManager.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        // =========================
        // LOGIN
        // =========================
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto dto)
        {
            try
            {
                var token = _authService.Login(dto);

                return Ok(new
                {
                    mensagem = "Login realizado com sucesso",
                    token
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
        // REGISTRAR USUÁRIO
        // =========================
        [Authorize(Roles = "Admin")]
        [HttpPost("register")]
        public IActionResult RegistrarUsuario([FromBody] RegisterUserDto dto)
        {
            try
            {
                var usuario = _authService.RegistrarUsuario(dto);

                return Ok(new
                {
                    mensagem = "Usuário registrado com sucesso",
                    usuario.Id,
                    usuario.Nome,
                    usuario.Email,
                    usuario.Role
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
        // REDEFINIR SENHA
        // =========================
        [Authorize]
        [HttpPatch("redefinir-senha")]
        public IActionResult RedefinirSenha(
            [FromBody] RedefinirSenhaDto dto
        )
        {
            try
            {
                var email = User.FindFirst(
                    ClaimTypes.Email
                )?.Value;

                if (email == null)
                {
                    return Unauthorized(new
                    {
                        erro = "Usuário não autenticado."
                    });
                }

                _authService.RedefinirSenha(email, dto);

                return Ok(new
                {
                    mensagem = "Senha redefinida com sucesso."
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