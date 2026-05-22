namespace ValenorManager.Domain.Entities
{
    public class AuditLog
    {
        public int Id { get; private set; }

        public string Usuario { get; private set; } = string.Empty;

        public string Acao { get; private set; } = string.Empty;

        public DateTime DataEvento { get; private set; }

        protected AuditLog() { }

        public AuditLog(string usuario, string acao)
        {
            Usuario = usuario;
            Acao = acao;
            DataEvento = DateTime.Now;
        }
    }
}