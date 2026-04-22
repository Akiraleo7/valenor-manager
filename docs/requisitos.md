# Requisitos do Sistema — Valenor Manager

## 1. Visão Geral

O sistema Valenor Manager tem como objetivo realizar o controle de estoque e gestão de vendas, permitindo o cadastro de produtos, registro de vendas e acompanhamento de dados operacionais.

---

## 2. Stakeholders

### Primários
- Administrador
- Operador/Caixa

### Secundários
- Equipe de desenvolvimento
- Avaliadores do projeto

---

## 3. Requisitos Funcionais

### Produtos
- RF01: Cadastrar produto
- RF02: Editar produto
- RF03: Excluir produto
- RF04: Listar produtos
- RF05: Controlar estoque

### Vendas
- RF06: Registrar venda
- RF07: Adicionar itens à venda
- RF08: Calcular valor total
- RF09: Armazenar histórico
- RF10: Registrar data da venda

---

## 4. Requisitos Não Funcionais

- RNF01: Tempo de resposta até 2 segundos
- RNF02: Uso de arquitetura em camadas
- RNF03: Utilização de banco relacional (MySQL)
- RNF04: Versionamento com Git
- RNF05: Código organizado e documentado

---

## 5. Regras de Negócio

- RN01: Não permitir venda sem produto
- RN02: Estoque deve ser atualizado após venda
- RN03: Preço da venda deve ser fixo no momento da compra
- RN04: Produto deve possuir nome e preço obrigatórios
