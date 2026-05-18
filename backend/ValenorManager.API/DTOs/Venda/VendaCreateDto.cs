namespace ValenorManager.API.DTOs.Venda
{
    public class VendaCreateDto
    {
        public List<VendaItemCreateDto> Itens { get; set; } = new();
    }
}
