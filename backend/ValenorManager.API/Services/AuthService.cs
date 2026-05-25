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
            // depois usar hash real
            var senhaValida = BCrypt.Net.BCrypt.Verify(
                dto.Senha,
                usuario.SenhaHash
            );

            if (!senhaValida)
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
            if (dto.Senha.Length < 6)
            {
                throw new Exception(
                    "A senha deve possuir no mínimo 6 caracteres."
                );
            }

            var usuarioExistente = _context.Usuarios
                .FirstOrDefault(u => u.Email == dto.Email);

            if (usuarioExistente != null)
            {
                throw new Exception("Já existe um usuário com este email.");
            }

            // SENHA HASH

            var senhaHash = BCrypt.Net.BCrypt.HashPassword(dto.Senha);

            var usuario = new Usuario(
                dto.Nome,
                dto.Email,
                senhaHash,
                dto.Role
            );

            _context.Usuarios.Add(usuario);

            _context.SaveChanges();

            return usuario;
        }

        public void RedefinirSenha(
            string email,
            RedefinirSenhaDto dto
        )
        {
            var usuario = _context.Usuarios
                .FirstOrDefault(u =>u.Email == email);

            if (usuario == null)
            {
                throw new Exception("Usuário não encontrado.");
            }

            // VALIDA SENHA ATUAL
            var senhaAtualValida = BCrypt.Net.BCrypt.Verify(
                dto.SenhaAtual,
                usuario.SenhaHash
            );

            if (!senhaAtualValida)
            {
                throw new Exception("Senha atual inválida.");
            }

            // VALIDA NOVA SENHA
            if (dto.NovaSenha.Length < 6)
            {
                throw new Exception("A nova senha deve possuir no mínimo 6 caracteres.");
            }

            // GERA NOVO HASH
            var novaSenhaHash = BCrypt.Net.BCrypt.HashPassword(
                dto.NovaSenha
            );

            // ALTERA SENHA
            usuario.AlterarSenha(novaSenhaHash);

            _context.SaveChanges();

            // AUDITORIA
            _auditService.RegistrarEvento(
                usuario.Email,
                "Senha redefinida no sistema."
            );
        }
    }
}