namespace ValenorManager.Domain.Entities
{
    public class ItemVenda
    {
        public int Id { get; private set; }

        //FK venda
        public int VendaId { get; private set; }

        public Venda? Venda { get; private set; }

        //FK produto
        public int ProdutoId { get; private set; }

        public Produto? Produto { get; private set; }

        public int Quantidade { get; private set; }

        public decimal PrecoUnitario { get; private set; }

        //Construtor vazio para EF core
        protected ItemVenda() { }

        public ItemVenda(int produtoId, int quantidade, decimal precoUnitario)
        { 
            ProdutoId = produtoId;
            Quantidade = quantidade;
            PrecoUnitario = precoUnitario;
        }
    }
}