# Database

Responsável pela estrutura e gerenciamento do banco de dados do sistema.

## Estrutura

O banco foi modelado para atender o fluxo de vendas e controle de produtos, contendo as seguintes tabelas:

- produto
- venda
- item_venda

## Responsabilidades
- Definição das tabelas
- Relacionamentos entre entidades
- Integridade dos dados

## Tecnologias utilizadas
- MySQL

## Observações
- O preço do produto é armazenado no momento da venda (item_venda), garantindo histórico correto
- Relacionamentos utilizam chaves estrangeiras (FOREIGN KEY)
