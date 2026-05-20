namespace ValenorManager.Domain.Entities
{
    public class Usuario
    {
        public int Id { get; private set; }

        public string Nome { get; private set; } = string.Empty;

        public string Email { get; private set; } = string.Empty;

        public string SenhaHash { get; private set; } = string.Empty;

        public string Role { get; private set; } = "Operador";

        protected Usuario() { }

        public Usuario(string nome, string email, string senhaHash, string role)
        {
            Nome = nome;
            Email = email;
            SenhaHash = senhaHash;
            Role = role;
        }
    }
}