using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ValenorManager.API.Data;
using ValenorManager.API.DTOs.Auth;
using ValenorManager.Domain.Entities;

namespace ValenorManager.API.Services
{
    public class AuthService
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly AuditService _auditService;

        public AuthService(
            AppDbContext context,
            IConfiguration configuration,
            AuditService auditService
        )
        {
            _context = context;
            _configuration = configuration;
            _auditService = auditService;
        }

        // =========================
        // LOGIN
        // =========================
        public string Login(LoginDto dto)
        {
            var usuario = _context.Usuarios
                .FirstOrDefault(u => u.Email == dto.Email);

            if (usuario == null)
            {
                throw new Exception("Usuário não encontrado.");
            }

            if (!usuario.Ativo)
            {
                throw new Exception("Usuário desativado.");
            }

            // TEMPORÁRIO
            // depois vamos usar hash real
            if (usuario.SenhaHash != dto.Senha)
            {
                throw new Exception("Senha inválida.");
            }

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, usuario.Nome),
                new Claim(ClaimTypes.Email, usuario.Email),
                new Claim(ClaimTypes.Role, usuario.Role)
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!)
            );

            var creds = new SigningCredentials(
                key,
                SecurityAlgorithms.HmacSha256
            );

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(2),
                signingCredentials: creds
            );

            //REGISTRA AUDITORIA
            _auditService.RegistrarEvento(
                usuario.Email,
                "Login realizado no sistema"
             );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // =========================
        // REGISTRAR USUÁRIO
        // =========================
        public Usuario RegistrarUsuario(RegisterUserDto dto)
        {
            var usuarioExistente = _context.Usuarios
                .FirstOrDefault(u => u.Email == dto.Email);

            if (usuarioExistente != null)
            {
                throw new Exception("Já existe um usuário com este email.");
            }

            // TEMPORÁRIO
            // depois vamos implementar hash seguro
            var usuario = new Usuario(
                dto.Nome,
                dto.Email,
                dto.Senha,
                dto.Role
            );

            _context.Usuarios.Add(usuario);

            _context.SaveChanges();

            return usuario;
        }
    }
}