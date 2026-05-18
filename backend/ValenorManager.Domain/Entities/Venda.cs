namespace ValenorManager.Domain.Entities
{
    public class Venda
    {
        public int Id { get; private set; }

        public DateTime DataVenda { get; private set; }

        public decimal ValorTotal { get; private set; }

        //Relacionamento com itens da venda
        public List<ItemVenda> Itens { get; private set; } = new();

        //Construtor vazio para EF core
        protected Venda() { }

        public Venda(decimal valorTotal)
        {
            DataVenda = DateTime.Now;
            ValorTotal = valorTotal;
        }
    }
}