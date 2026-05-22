using ValenorManager.API.Data;
using ValenorManager.Domain.Entities;

namespace ValenorManager.API.Services
{
    public class AuditService
    {
        private readonly AppDbContext _context;

        public AuditService(AppDbContext context)
        {
            _context = context;
        }

        public void RegistrarEvento(string usuario, string acao)
        {
            var log = new AuditLog(usuario, acao);

            _context.AuditLogs.Add(log);

            _context.SaveChanges();
        }
    }
}