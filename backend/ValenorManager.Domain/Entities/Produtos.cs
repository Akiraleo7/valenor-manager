using System;
using ValenorManager.Domain.Exceptions;

namespace ValenorManager.Domain.Entities
{
    public class Produto
    {
        // Constantes de mensagens 
        private const string NomeObrigatorio = "Nome é obrigatório";
        private const string PrecoInvalido = "Preço deve ser maior que zero";
        private const string EstoqueInicialInvalido = "Estoque inicial não pode ser negativo";
        private const string QuantidadeEntradaInvalida = "A quantidade de entrada deve ser maior que zero";
        private const string QuantidadeSaidaInvalida = "A quantidade de saída deve ser maior que zero";
        private const string EstoqueInsuficiente = "Saldo em estoque insuficiente para esta operação";

        // Propriedades
        public int Id { get; private set; }
        public string Nome { get; private set; } = string.Empty;
        public decimal Preco { get; private set; }
        public int QuantidadeEstoque { get; private set; }

        // Construtor protegido para ORM
        protected Produto() { }

        // Construtor principal
        public Produto(string nome, decimal preco, int quantidadeEstoque)
        {
            ValidarDominio(nome, preco);

            if (quantidadeEstoque < 0)
                throw new DomainException(EstoqueInicialInvalido);

            Nome = nome;
            Preco = preco;
            QuantidadeEstoque = quantidadeEstoque;
        }

        // Atualização de dados básicos
        public void AtualizarDados(string nome, decimal preco)
        {
            ValidarDominio(nome, preco);

            Nome = nome;
            Preco = preco;
        }

        // Entrada de estoque
        public void AdicionarEstoque(int quantidade)
        {
            if (quantidade <= 0)
                throw new DomainException(QuantidadeEntradaInvalida);

            QuantidadeEstoque += quantidade;
        }

        // Saída de estoque
        public void RemoverEstoque(int quantidade)
        {
            if (quantidade <= 0)
                throw new DomainException(QuantidadeSaidaInvalida);

            if (QuantidadeEstoque < quantidade)
                throw new DomainException(EstoqueInsuficiente);

            QuantidadeEstoque -= quantidade;
        }

        // Validação centralizada
        private void ValidarDominio(string nome, decimal preco)
        {
            if (string.IsNullOrWhiteSpace(nome))
                throw new DomainException(NomeObrigatorio);

            if (preco <= 0)
                throw new DomainException(PrecoInvalido);
        }
    }
}