namespace ValenorManager.Domain.Entities
{
    public class Usuario
    {
        public int Id { get; private set; }

        public string Nome { get; private set; } = string.Empty;

        public string Email { get; private set; } = string.Empty;

        public string SenhaHash { get; private set; } = string.Empty;

        public string Role { get; private set; } = "Operador";

        public bool Ativo { get; private set; } = true;

        protected Usuario() { }

        public Usuario(string nome, string email, string senhaHash, string role)
        {
            Nome = nome;
            Email = email;
            SenhaHash = senhaHash;
            Role = role;
            Ativo = true;
        }

        // =========================
        // ALTERAR STATUS
        // =========================
        public void AlterarStatus(bool ativo)
        {
            Ativo = ativo;
        }

        // =========================
        // ALTERAR ROLE
        // =========================
        public void AlterarRole(string role)
        {
            Role = role;
        }

        // =========================
        // EDITAR USUARIO
        // =========================
        public void EditarUsuario(string nome, string email)
        {
            Nome = nome;
            Email = email;
        }

        // ==========================
        // ALTERAR SENHA
        // ==========================
        public void AlterarSenha(string novaSenhaHash)
        {
            SenhaHash = novaSenhaHash;
        }
    }
}