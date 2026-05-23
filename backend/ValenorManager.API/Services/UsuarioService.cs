using Microsoft.EntityFrameworkCore;
using ValenorManager.API.Data;
using ValenorManager.API.DTOs.Usuario;
using ValenorManager.Domain.Entities;

namespace ValenorManager.API.Services
{
    public class UsuarioService
    {
        private readonly AppDbContext _context;
        private readonly AuditService _auditService;

        public UsuarioService(
            AppDbContext context,
            AuditService auditService
        )
        {
            _context = context;
            _auditService = auditService;
        }

        // =========================
        // LISTAR USUÁRIOS
        // =========================
        public List<Usuario> ListarUsuarios()
        {
            return _context.Usuarios.ToList();
        }

        // =========================
        // BUSCAR USUÁRIO POR ID
        // =========================
        public Usuario? BuscarPorId(int id)
        {
            return _context.Usuarios
                .FirstOrDefault(u => u.Id == id);
        }

        // =========================
        // EDITAR USUÁRIO
        // =========================
        public void EditarUsuario(
            int id,
            UsuarioUpdateDto dto,
            string adminResponsavel
        )
        {
            var usuario = BuscarPorId(id);

            if (usuario == null)
            {
                throw new Exception("Usuário não encontrado.");
            }

            usuario.EditarUsuario(dto.Nome, dto.Email);

            _context.SaveChanges();

            _auditService.RegistrarEvento(
                adminResponsavel,
                $"Usuário ID {usuario.Id} editado."
            );
        }

        // =========================
        // ALTERAR STATUS
        // =========================
        public void AlterarStatus(
            int id,
            UsuarioStatusUpdateDto dto,
            string adminResponsavel
        )
        {
            var usuario = BuscarPorId(id);

            if (usuario == null)
            {
                throw new Exception("Usuário não encontrado.");
            }

            usuario.AlterarStatus(dto.Ativo);

            _context.SaveChanges();

            var status = dto.Ativo ? "ativado" : "desativado";

            _auditService.RegistrarEvento(
                adminResponsavel,
                $"Usuário ID {usuario.Id} foi {status}."
            );
        }

        // =========================
        // ALTERAR ROLE
        // =========================
        public void AlterarRole(
            int id,
            UsuarioRoleUpdateDto dto,
            string adminResponsavel
        )
        {
            var usuario = BuscarPorId(id);

            if (usuario == null)
            {
                throw new Exception("Usuário não encontrado.");
            }

            usuario.AlterarRole(dto.Role);

            _context.SaveChanges();

            _auditService.RegistrarEvento(
                adminResponsavel,
                $"Permissão do usuário ID {usuario.Id} alterada para {dto.Role}."
            );
        }
    }
}