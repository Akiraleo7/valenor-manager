namespace ValenorManager.API.DTOs.Auth
{
    public class RedefinirSenhaDto
    {
        public string SenhaAtual { get; set; } = string.Empty;

        public string NovaSenha { get; set; } = string.Empty;
    }
}