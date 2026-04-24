# Backend API - Valenor Manager

## Descrição
A API do sistema Valenor Manager foi desenvolvida utilizando ASP.NET Core, com o objetivo de fornecer uma base sólida para o gerenciamento de estoque, vendas e usuários.

## Tecnologias Utilizadas
- ASP.NET Core Web API
- C#
- Swagger (Swashbuckle)

## Como Executar o Projeto

1. Abrir o projeto no Visual Studio
2. Executar a aplicação (F5)
3. A API estará disponível nas seguintes URLs:
   - https://localhost:7035
   - http://localhost:5231

## Documentação da API

A documentação interativa pode ser acessada via Swagger:

https://localhost:7035/swagger

## Endpoint de Teste

GET /api/teste

Resposta esperada:
"API funcionando 🚀"

## Observações

- O projeto foi inicializado sem os endpoints padrão (WeatherForecast)
- Foi criado um endpoint de teste para validação da API
- Estrutura preparada para evolução futura com camadas (Domain, Application, Infrastructure)
